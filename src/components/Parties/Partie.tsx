import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Link, useParams } from 'react-router-dom';
import { findById, findByName } from '../../hooks/findData';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { changeDateinput, changeGameInput, changeParticipantNumberinput, changePlatformInput, deleteGame, joinAGame, sendGame, } from '../../store/reducer/games';
import { Iplatform } from '../../@types/types';

export default function Partie() {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });

  const { id } = useParams();
  const [open, setOpen] = useState(true);

const partie = useAppSelector((state) => findById(state.games.list, id));
const dispatch = useAppDispatch();

  const formatedDate = (time: string) =>
    new Date(time).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

  
  const [Platform, setPlatform] = useState()
  const [videoGame, setVideoGame] = useState()

  const currentUser = useAppSelector((state) => state.users.currentUser);
  const informations = useAppSelector((state) => state.games.gameCredential) 
  const videoGames = useAppSelector((state)=>state.videoGames.list)
  const platformsData = useAppSelector((state)=>state.platforms.list)

  
//   const joinAGame = async () => {
//     const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/users/join_game/${id}`, null, {
//       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//     })
//     console.log(data)
//     setPartie(data);
// };

const updateGame = async () => {
  const res = await  axios.put(`${import.meta.env.VITE_API_URL}/games/${id}`, informations, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};

  const handleClick = () => {     
    dispatch(joinAGame(id)); 
    // dispatch(deleteGame(id))
  };
  
  const handleChangegames = (e : ChangeEvent<HTMLInputElement>) => { 
    setPlatform(findByName(videoGames, e.target.value))
    dispatch(changeGameInput(e.target.value))
    }
    
    const handleChangePlatforms = (e : ChangeEvent<HTMLInputElement>) => {
    setVideoGame(findByName(platformsData, e.target.value))
    dispatch(changePlatformInput(e.target.value))
    }
    
    const handleDateChange = (e : ChangeEvent<HTMLInputElement>) => {
      dispatch(changeDateinput(e.target.value))
    }
    
    const handleParticipantsChange= (e:ChangeEvent<HTMLInputElement>) => {
      dispatch(changeParticipantNumberinput(e.target.value))
      }
    
    const handleSubmit = (e : ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      updateGame();  
      setOpen(!open)
    }
    
    // const handle
    function handleClicke () {
      setOpen(!open)
    }
    
  return (
    <>
      {!partie ? (
        <div className="flex justify-center">
          <img src="https://i.gifer.com/5IPd.gif" />
        </div>
      ) : (
        <div>
          <h1>
            Partie n°{partie.id} de {partie.organizer.pseudo}
          </h1>
          <div className="card lg:card-side bg-base-100 shadow-xl flex justify-center">
            <div>
              <figure className= {isDesktopOrLaptop ? ' h-1/2 w-full ' : 'h-auto w-content '}>
                <img
                  className="object-scale-down  h-full"
                  src={`${import.meta.env.VITE_API_COVERS}/${
                    partie.videoGame.cover
                  }`}
                  alt={partie.videoGame.name}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {partie.videoGame.name} sur {partie.platform.name}
                </h2>
                <p>Début de la partie le {formatedDate(partie.beginAt)}</p>
                <p>
                  {partie.participants.length}/{partie.maxParticipants}{' '}
                  Joueurs
                </p>
                
                <ul>
                  {partie.participants.map((p:any) =>
                  <li key={p.pseudo}>{p.pseudo}</li>
                  )}                  
                </ul>
               
                {partie.countParticipants >= partie.maxParticipants ? (
                  <div className="card-actions justify-end">
                    <p>Le nombre maximum de participants à été atteint</p>
                    <Link to="/parties">
                    <button className="btn btn-primary">
                      Revenir à la page des parties
                    </button>
                    </Link>
                  </div>
                ) : (
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={handleClick}>
                      { findById(partie.participants, currentUser.id) ? "Se désinscrire" : "S'inscrire"  }                                                                                   
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
      )}
          { partie.organizer.email === currentUser.email &&
      <aside
        className={
          open
            ? 'flex flex-row gap-6 p-3 mt-20 fixed top-0 right-0 z-50 translate-x-64 transition-all'
            : 'flex flex-row gap-6 p-3 mt-20 fixed top-0 right-0 z-50 transition-all'
        }
      >

        {open ?
          <button className="btn btn-outline btn-success z-50" onClick={handleClicke}>
          Modifier la partie
          </button>
          : <button className="btn btn-outline btn-error z-50" onClick={handleClicke}>
          X
        </button>}
        <form action="" className='flex flex-col gap-2'>
          <label htmlFor="">Choisissez un jeu : </label>
          <input list="videogames" placeholder='Jeux' onChange={handleChangegames}/>
          <datalist id="videogames">
            <option value={partie.videoGame.name} key={partie.videoGame.slug}></option>)
          </datalist>
          <label htmlFor="">Choisissez une plateforme : </label>
          <input list="platforms" placeholder='Plateforme' onChange={handleChangePlatforms}/>
          <datalist id="platforms">
            {Platform===undefined ? platformsData.map((platform )=> <option value={platform.name} key={platform.slug}></option>) : Platform.platforms.map((platform : Iplatform)=> <option value={platform.name} key={platform.slug}></option>) }
          </datalist>          
          <input type="datetime-local" min={Date.now()} placeholder='Date' required onChange={handleDateChange}></input>
          <input type="number" min="2" max="50" placeholder='Nombre de joueur' onChange={handleParticipantsChange}></input> 
          <button className='btn' onClick={handleSubmit}>Envoyer</button>
        </form>
      </aside>
    
    }
    </>
  );
}
