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

  const formatedDate = (time: string) =>
    new Date(time).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    /*useState va nous permettre de passer d'un état à un autre pour avoir un rendu différents selon son contenu. Open est par défaut sur true.
    En utilisant setOpen, on peut modifier la valeur
    */
  const [open, setOpen] = useState(true);

    /*On prépare un state vide qui va nous permettre de stocker une list de platform selon un jeu-vidéo*/
  const [Platform, setPlatform] = useState<Ivideo_game>()

  /*Récupération sur slug dans l'URL*/
  const { slug } = useParams();  

  /*On s'abonne à un jeu, on fait un filtre sur les listes des jeux et on retrouve l'objet de celui qui a le même slug que le slug en URL*/
  const videoGame = useAppSelector((state)=>findBySlug(state.videoGames.list, slug )) 
    
  /*On s'abonne à la liste de tous les jeux vidéos*/
  const videoGames = useAppSelector((state)=>state.videoGames.list)

    /*On s'abonne à la liste de toutes les plateformes*/
  const platformsData = useAppSelector((state)=>state.platforms.list)

  const date = new Date().toLocaleDateString();
  
  const dispatch = useAppDispatch();

  /*On récupère les platformes associés à un jeu*/
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

const handleSubmit = (e : React.MouseEvent<HTMLElement>) => {
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
 <h1 className='mb-2 text-5xl lg:text-9xl'> {videoGame.name}</h1>
    <div className="card lg:card-side bg-base-100 shadow-xl">
      
        <figure className= { isDesktopOrLaptop ? 'h-1/2 w-1/2' : 'h-1/2'
}
>
        <img
        className='object-contain	max-h-[500px] lg:max-h-[900px]'
          src={`${import.meta.env.VITE_API_COVERS}/${videoGame.cover}`}
          alt="Album"
          />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{videoGame.name}</h2>
        <p>Rejoignez notre escouade</p>
        <ul>
          {videoGame.games.map((parties :any) =>             
            <li className="items-center gap-x-10 text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"> { parties.status != 'finished' && <Link to={`/parties/${parties.id}`}>Partie n°{parties.id} le {formatedDate(parties.beginAt)} sur {parties.platform.name} {parties.participants.length}/{parties.maxParticipants}{' '}
            Joueurs</Link> }</li>            
          )} 
        </ul>
        <div className="card-actions justify-end">
          <Link to='/jeux'><button className="btn z-50">Revenir aux jeux</button></Link>
          <aside
          
        className={
          open
            ? 'flex flex-row gap-20 mt-16 fixed top-0 right-0 z-40 translate-x-72 transition-all lg:gap-6 lg:mt-20 '
            : 'flex flex-row gap-1 pl-3 mt-16 fixed top-0 right-0 z-40 transition-all lg:mt-20'
        }
      >
        {open ?
        <button className="btn btn-outline btn-success z-40 bg-black" onClick={handleClick}>
          Créer une partie
        </button>
        : <button className="btn btn-outline btn-error z-40 bg-black" onClick={handleClick}>
          X
        </button>}
        <form action="" className='flex flex-col gap-2 bg-black p-2 rounded-md border-solid border-2 border-green-500'>
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
    </div>
    </div>}
          </>
  );
}
