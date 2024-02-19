import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from '../Layout';
import Accueil from '../Accueil/Accueil';
import Error from '../Error/Error';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Genres from '../Genres/Genres';
import Plateformes from '../Plateformes/Plateformes';
import Jeux from '../JeuxVideos/Jeux';
import Jeu from '../JeuxVideos/Jeu';
import Parties from '../Parties/Parties';
import CGU from '../CGU/CGU';
import Contact from '../Contact/Contact';
import Profil from '../Profil/Profil';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useEffect } from 'react';
import { fetchGenres } from '../../store/reducer/genres';
import { fetchPlatforms } from '../../store/reducer/platforms';
import { loginAuth} from '../../store/reducer/users';
import {
  fetchVideoGames,
  fetchVideoGamesHome,
} from '../../store/reducer/videoGames';
import { RootState } from '../../store';
import './App.scss'
import Genre from '../Genres/Genre';
import Plateforme from '../Plateformes/Plateforme';
import Partie from '../Parties/Partie';
import { fetchGames } from '../../store/reducer/games';
import Loading from './Loading/Loading';

function App() {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector((state: RootState) => state.users.logged);
  const loading = useAppSelector((state) => state.videoGames.loading);
  const isActive = useAppSelector((state) => state.users.currentUser.is_active);
  const isVerified = useAppSelector((state) => state.users.currentUser.isVerified);


  console.log(isVerified)

  useEffect(() => {
    (isLogged && (
      dispatch(fetchGenres()), 
      dispatch(fetchGames()), 
      dispatch(fetchPlatforms()),
      dispatch(fetchVideoGames()),
      dispatch(loginAuth()))
    )},
    [isLogged]
    )

  useEffect(() => {
    dispatch(fetchVideoGamesHome());
  }, []);
  
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App h-full">
      <Routes>
        {/* Passage du header et du footer dans le composant Layout */}
        <Route path="/" element={<Layout />}>
          {/* Route de la page d'accueil */}
          <Route index element={<Accueil />} />
          {/* Route de la page d'erreur */}
          <Route path="*" element={<Error />} />
          {/* Routes de connexion et création de l'utilisateur */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          {/* Routes des différentes pages de contenu */}
          {!isLogged 
          || !isActive 
          || !isVerified
          ? (
            <>
              <Route path="genres" element={<Login />} />
              <Route path="genres/:slug" element={<Login />} />
              <Route path="plateformes" element={<Login />} />
              <Route path="plateformes/:slug" element={<Login />}/>
              <Route path="jeux" element={<Login />} />
              <Route path="jeux/:slug" element={<Login />} />
              <Route path="parties" element={<Login />} />
              <Route path="CGU" element={<CGU />} />
              <Route path="contact" element={<Contact />} />
              <Route path="profil" element={<Login />} />
            </>
          ) : (
            <>
              
              <Route path="genres" element={<Genres />} />
              <Route path="genres/:slug" element={<Genre />} />
              <Route path="plateformes" element={<Plateformes />} />
              <Route path="plateformes/:slug" element={< Plateforme />}/>
              <Route path="jeux" element={<Jeux />} />
              <Route path="jeux/:slug" element={<Jeu />} />
              <Route path="parties" element={<Parties />} />
              <Route path='parties/:id' element={<Partie />} />
              <Route path="CGU" element={<CGU />} />
              <Route path="contact" element={<Contact />} />
              <Route path="profil" element={<Profil />} />
              <Route path="login" element={<Profil />} />
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
