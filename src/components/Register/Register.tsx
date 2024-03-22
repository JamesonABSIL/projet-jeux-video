import React, { ChangeEvent, MouseEventHandler, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeMailRegister, changePasswordCheckRegister, changePasswordRegister, changePseudoRegister, register } from '../../store/reducer/users';
import { Navigate, redirect, useNavigate } from 'react-router-dom';

export default function Register() {
  const dispatch = useAppDispatch();
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const [errorList, setErrorList] = useState<string[]>([])

const navigate = useNavigate();
const isLogged = useAppSelector((state) => state.users.logged);


  const { email, password, pseudo, passwordCheck } = useAppSelector(
    (state) => state.users.register
  );
  const handleEmailChange = ( e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeMailRegister(e.target.value))
  }
  
  const handlePseudoChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changePseudoRegister(e.target.value))
  }
  
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changePasswordRegister(e.target.value))
  }

  const handlePasswordCheckChange = (e:ChangeEvent<HTMLInputElement>) => {
    dispatch(changePasswordCheckRegister(e.target.value))
  }
  
  const handleRegister = (e : React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const error : string[] = [] ;

    if (pseudo.length===0) {
      error.push('Veuillez entrer un pseudo')
    }

    if (!password.match(/[0-9]/g)) {
      error.push('Votre mot de passe doit contenir minimum un chiffre')
    }

    if (!password.match(/[A-Z]/g)) {
      error.push('Votre mot de passe doit contenir une majuscule')
    }

    if (!password.match(/[a-z]/g)) {
      error.push('Votre mot de passe doit contenir une minuscule')
    }

    if (!password.match(/[^a-zA-Z\d]/g)) {
      error.push('Votre mot de passe doit contenir un caractère spécial')
    }

    if (password!=passwordCheck) {
      error.push('Les mots de passe ne correspondent pas')
    }  
    
    if(password.length<8) {
      error.push('Votre mot de passe doit faire 8 caractères minimum')
    }
    
    if (!emailRegex.test(email)) {
        error.push('Veuillez rentrer un email valide')
    } 

    setErrorList(error);

    console.log(errorList)

    if (error.length===0) {
      dispatch(register());
      window.alert("Un mail vous a été envoyé pour valider votre inscription")
      navigate('/')
    }
        
  }
 
  
  return (
    <>
    <h1 className='mb-2 text-4xl lg:text-8xl'>Inscription</h1>    
    <div className='flex justify-center'>
      <form action="" onSubmit={handleRegister} className='flex flex-col gap-y-4 w-72 justify-center'>
        <input type="text" placeholder='Mail' name="email" onChange={handleEmailChange}></input>
        <input type="text" placeholder='Pseudo' name="pseudo" onChange={handlePseudoChange}></input>
        <input type="password" placeholder='mot de passe' name='password' onChange={handlePasswordChange}></input>
        <input type="password" placeholder='Retapez votre mot de passe' onChange={handlePasswordCheckChange}></input>
        <button className="btn btn-success" >S'inscrire</button>
        {errorList.length>0 && <ul>{errorList.map((err) => <li className='text-red-600 text-sm' key={err}>{err}</li>)}</ul>}
      </form>    
    </div>
    </>
  );
}
