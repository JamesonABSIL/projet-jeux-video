import React, { ChangeEvent, MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeMailRegister, changePasswordCheckRegister, changePasswordRegister, changePseudoRegister, register } from '../../store/reducer/users';
import { Navigate, redirect, useNavigate } from 'react-router-dom';

export default function Register() {
  const dispatch = useAppDispatch();
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const error = [] ;
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
  
  const handleRegister = (e : MouseEventHandler<HTMLButtonElement>) => {
    e.preventDefault();
    if (password!=passwordCheck) {
      error.push('Les mots de passe ne correspondent pas')
    }  
    
    if (!emailRegex.test(email)) {
        error.push('Veuillez rentrer un email valide')
    } 

    if (error.length>0) {
      window.alert(error.map((c) => c))
    }
    
    if (error.length===0) {
      dispatch(register());
      window.alert("Un mail vous a été envoyé pour valider votre inscription")
      navigate('/')
    }
    

    // (password===passwordCheck ? dispatch(register()) : window.alert("Les mots de passe ne correspondent pas"))
    
  }
 
  
  return (
    <>
    <h1 className='mb-2 text-4xl lg:text-8xl'>Inscription</h1>    
    <div className='flex justify-center'>
      <form action="" className='flex flex-col gap-y-4 w-72 justify-center'>
        <input type="text" placeholder='Mail' name="email" onChange={handleEmailChange}></input>
        <input type="text" placeholder='Pseudo' name="pseudo" onChange={handlePseudoChange}></input>
        <input type="password" placeholder='mot de passe' name='password' onChange={handlePasswordChange}></input>
        <input type="password" placeholder='Retapez votre mot de passe' onChange={handlePasswordCheckChange}></input>
        <button className="btn btn-success" onClick={handleRegister}>S'inscrire</button>
      </form>    
    </div>
    </>
  );
}
