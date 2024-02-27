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
import UpdateProfil from '../Profil/UpdateProfil';

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
  /** Avec useAppSelector on s'abonne à un state, on s'abonne au state logged de l'utilisateur, pour voir l'état de connection**/
  const isLogged = useAppSelector((state: RootState) => state.users.logged);
    /** on s'abonne au state loading des jeux, pour voir l'état de l'appel de l'API, le loading passe en false quand la requête à l'API est terminé**/
  const loading = useAppSelector((state) => state.videoGames.loading);
      /** on s'abonne au state de l'état du compte utilisateur, vérifier qu'il soit actif**/
  const isActive = useAppSelector((state) => state.users.currentUser.is_active);
        /** on s'abonne au state de l'état du compte utilisateur, vérifier que le compte a été vérifié**/
  const isVerified = useAppSelector((state) => state.users.currentUser.isVerified);

  /*Au chargement de la page on vérifie si un utilisateur est connecté, si il l'est on récupère les différentes données dont on a besoin
  sinon rien n'est appelé. Les d'une modification sur isLogged, le useEffect est relancé et vérifie de nouveau l'état de isLogged*/
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

    /* On appelle les jeux vidéos à changer sur la page d'accueil au chargement de la page*/
  useEffect(() => {
    dispatch(fetchVideoGamesHome());
  }, []);
  
  /*On affiche un état de chargement si Loading est sur true*/ 
  if(loading) {
    return <Loading />
  }
 /*Les différentes routes du site, si il n'y a pas d'utilisateur connecté, on renvoit vers la page de Login*/
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
          {/* Routes des différentes pages de contenu  en fonction du statut de connexion de l'utilisateur*/}
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
              <Route path='parties/:id' element={<Login />} />
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
              <Route path="update" element={<UpdateProfil />} />           
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
