import React, { ChangeEvent, MouseEventHandler, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  changeMail,
  changePassword,
  login,
  logout,
} from '../../store/reducer/users';
import Input from './LoginInput/Input';
import { fetchGenres } from '../../store/reducer/genres';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { username, password } = useAppSelector(
    (state) => state.users.credentials
  );
  const isLogged = useAppSelector((state) => state.users.logged);
  const mailValUe = useAppSelector((state) => state.users.credentials.username);
  const passwordValue = useAppSelector(
    (state) => state.users.credentials.password
  );
  const isActive = useAppSelector((state) => state.users.currentUser.is_active);
  const isVerified = useAppSelector((state) => state.users.currentUser.isVerified);

  const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeMail(e.target.value));
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changePassword(e.target.value));
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault(),
    dispatch(login());
    navigate('/profil');
      };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    {e.key==="Enter" &&  dispatch(login());  navigate('/profil');}
  }

  return (
    <div className="flex justify-center">
      {!isLogged && (
        <>
          <form
            action=""
            className="flex flex-col gap-y-4 w-72 justify-center "
            onKeyDown={handleKeyDown}
          >
            <Input
              value={mailValUe}
              placeholder="mail"
              type="text"
              name="username"
              onChange={handleChangeUserName}
            />
            <Input
              value={passwordValue}
              type="password"
              placeholder="mot de passe"
              name="password"
              onChange={handleChangePassword}
            />
          </form>
          <button className="ml-5 mt-2 btn btn-success" onClick={handleClick}>
            Connexion
          </button>
        </>
      )}
      
      <div>
      {!isActive && isLogged  && <p className='mb-10'>Votre compte est inactif, Merci d'utiliser le formulaire de contact</p>}
      {!isVerified && isLogged  && <p className='mb-10'>Votre compte demande une vérification, merci de vérifier vos E-mail</p>}

      {isLogged && (
        <button
          className="btn btn-success"
          onClick={(e) => {
            e.preventDefault();
            dispatch(logout());
          }}
        >
          Deconnexion
        </button>
        
      )}
      </div>

    </div>
  );
}
