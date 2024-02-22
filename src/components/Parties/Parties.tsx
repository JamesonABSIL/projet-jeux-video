import React, { ChangeEvent, useState } from 'react';
import { Igame, Iplatform, Ivideo_game } from '../../@types/types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { findByName, findById } from '../../hooks/findData';
import { changeDateinput, changeGameInput, changeParticipantNumberinput, changePlatformInput, sendGame } from '../../store/reducer/games';
import { Link } from 'react-router-dom';

export default function Parties() {  

  const formatedDate = (time : string) => new Date(time).toLocaleString(
    "fr-FR",
      { 
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }
  );

  const formatedDateOnlyDay = (time : string) => new Date(time).toLocaleString(
    "fr-FR",
      { 
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
  );

  const [open, setOpen] = useState(true);
  const [Platform, setPlatform] = useState()
  const [videoGame, setVideoGame] = useState()

  const videoGames = useAppSelector((state)=>state.videoGames.list)
  const platformsData = useAppSelector((state)=>state.platforms.list)
  const parties = useAppSelector((state)=>state.games.list)
 

  const date = new Date().toLocaleDateString();
  
  
  const dispatch = useAppDispatch();

  
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
  dispatch(sendGame());  
  setOpen(!open)
}


// const handle
function handleClick () {
  setOpen(!open)
}
  return (
    <>
      <h1>Parties</h1>
      <h2>Aujourd'hui</h2>
      <div>
        <div className="carousel carousel-center max-w-full p-4 space-x-4 bg-neutral rounded-box">
          {parties.map((game : Igame) => (

            (date===formatedDateOnlyDay(game.beginAt) && 
            <div className="carousel-item w-80 z-0" key={game.id}>
            <div className="card lg:card-side bg-base-100 shadow-xl ">
              <figure className='h-96'>
                <img src={`${import.meta.env.VITE_API_COVERS}/${game.videoGame.cover}`} alt={game.slug} />
              </figure>
              <div className="card-body flex flex-col">
                <h3 className="card-title text-white ">{game.videoGame.name} sur {game.platform.name}</h3>
                <h4 className="text-white"> Organisateur : {game.organizer.pseudo}</h4>
                <p className="text-white">le {formatedDate(game.beginAt)}</p>
                <p className="text-white">Joueurs {game.participants.length}/{game.maxParticipants}</p>
                <div className="card-actions justify-center">
                  <Link to={`/parties/${game.id}`}>
                  <button className="btn btn-primary ">
                  Voir Plus
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>)

          ))}
        </div>
      </div>

      <h2>Parties à venir</h2>
      <div>
        <div className="carousel carousel-center max-w-full p-4 space-x-4 bg-neutral rounded-box">
          {parties.map((game : any ) => (
             (date < formatedDateOnlyDay(game.beginAt) && 
            <div className="carousel-item w-80 z-0  " key={game.id}>
              <div className="card lg:card-side bg-base-100 shadow-xl ">
                <figure className='h-96'>
                  <img  src={`${import.meta.env.VITE_API_COVERS}/${game.videoGame.cover}`} alt={game.slug}  />
                </figure>
                <div className="card-body flex flex-col">
                  <h3 className="card-title text-white">{game.videoGame.name} sur {game.platform.name}</h3>
                  <h4 className="text-white"> Organisateur : {game.organizer.pseudo}</h4>
                  <p className="text-white">le {formatedDate(game.beginAt)}</p>
                  <p className="text-white">Joueurs {game.participants.length}/{game.maxParticipants}</p>
                  
                  <div className="card-actions justify-center">
                  {game.participants.length >= game.maxParticipants ? (
                    <p> Le nombre maximum de participants à été atteint </p>
                  ) : (
                  <Link to={`/parties/${game.id}`}>
                    <button className="btn btn-primary">Voir Plus</button>
                  </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>)
          ))}
        </div>
      </div>
      <aside
        className={
          open
            ? 'flex flex-row gap-6 p-3 mt-20 fixed top-0 right-0 z-50 translate-x-64 transition-all'
            : 'flex flex-row gap-6 p-3 mt-20 fixed top-0 right-0 z-50 transition-all'
        }
      >
        {open ?
        <button className="btn btn-outline btn-success z-50" onClick={handleClick}>
          Créer une partie
        </button>
        : <button className="btn btn-outline btn-error z-50" onClick={handleClick}>
          X
        </button>}
        <form action="" className='flex flex-col gap-2'>
          <label htmlFor="">Choisissez un jeu : </label>
          <input list="videogames" placeholder='Jeux' onChange={handleChangegames}/>
          <datalist id="videogames">
            {videoGame===undefined ? videoGames.map((game)=> <option value={game.name} key={game.slug}></option>) : videoGame.videoGames.map((game : Ivideo_game) => <option value={game.name} key={game.slug}></option>) }
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
    </>
  );
}
