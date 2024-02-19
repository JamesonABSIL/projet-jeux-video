import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useMediaQuery } from 'react-responsive';
import { findByName, findBySlug } from '../../hooks/findData';
import { ChangeEvent, useEffect, useState } from 'react';
import { changeDateinput, changeGameInput, changeParticipantNumberinput, changePlatformInput, sendGame } from '../../store/reducer/games';
import { Iplatform, Ivideo_game } from '../../@types/types';

export default function Jeu() {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

  const [open, setOpen] = useState(true);
  const [Platform, setPlatform] = useState<Ivideo_game>()
  const [game, setGame] = useState()

  const { slug } = useParams();  

  const videoGame = useAppSelector((state)=>findBySlug(state.videoGames.list, slug )) 

  const videoGames = useAppSelector((state)=>state.videoGames.list)
  const platformsData = useAppSelector((state)=>state.platforms.list)

  const date = new Date().toLocaleDateString();
  
  const dispatch = useAppDispatch();

  
const handleChangegames = () => { 
setPlatform(findByName(videoGames, videoGame.name))
dispatch(changeGameInput(videoGame.name))
}

useEffect(() => {
(videoGame && handleChangegames() )},
[videoGame]
)

const handleChangePlatforms = (e : ChangeEvent<HTMLInputElement>) => {
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
 {!videoGame ? "Ca charge" : <div>
 <h1> {videoGame.name}</h1>
    <div className="card lg:card-side bg-base-100 shadow-xl">
      
        <figure className= { isDesktopOrLaptop ? 'h-1/2 w-1/2' : 'h-1/2 '
}
>
        <img
        className='object-scale-down  h-full'
          src={`${import.meta.env.VITE_API_COVERS}/${videoGame.cover}`}
          alt="Album"
          />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{videoGame.name}</h2>
        <p>Rejoignez notre escouade</p>
        <div className="card-actions justify-end">
          <Link to='/jeux'><button className="btn">Revenir aux jeux</button></Link>
          <aside
          
        className={
          open
            ? 'flex flex-row gap-6 mt-20 fixed top-0 right-0 z-50 translate-x-72 transition-all'
            : 'flex flex-row gap-6 pl-3 mt-20 fixed top-0 right-0 z-50 transition-all'
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
          <label htmlFor="videogames">Choisissez un jeu : </label>
          <input list="videogames" placeholder='Jeux' onChange={handleChangegames}/>
          <datalist id="videogames">
            <option value={videoGame.name} key={videoGame.name} ></option>
          </datalist>
          <label htmlFor="">Choisissez une plateforme : </label>
          <input list="platforms" placeholder='Plateforme' onChange={handleChangePlatforms}/>
          <datalist id="platforms">
            {Platform===undefined ? platformsData.map((platform)=> <option value={platform.name} key={platform.slug}></option>) : Platform.platforms.map((platform : Iplatform)=> <option value={platform.name} key={platform.slug}></option>) }
          </datalist>          
          <input type="datetime-local" min={Date.now()} placeholder='Date' required onChange={handleDateChange}></input>
           <input type="number" min="2" max="50" placeholder='Nombre de joueur' onChange={handleParticipantsChange}></input> 
          <button className='btn' onClick={handleSubmit}>Envoyer</button>
        </form>
      </aside>
        </div>
      </div>
    </div></div>}
    
          </>
  );
}
