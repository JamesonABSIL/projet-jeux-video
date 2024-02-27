import { updateFavorite } from '../../store/reducer/users';
import { findBySlug } from '../../hooks/findData';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

interface IMap {
  src : string,
  alt : string,
  name: string,
  description : string,
  slug : string,
  userFavorite : [],
  link : string,
  id : number,
  game : {},
}

/*Parametres à transmettre à la card lorsqu'on l'appelle*/ 
export default function Card({
  src,
  alt,
  name,
  description,
  slug,
  userFavorite,
  link,
  id,
  game,  
}: IMap) {
  const dispatch = useAppDispatch();

  /*On s'abonne à la liste des jeux-vidéos*/
  const videoGames = useAppSelector((state)=>state.videoGames.list)

  /*Fonction pour ajouter ou retirer des favoris au clic selon l'ID du jeu*/
  const handleClickUpdate = (id : number) => {
    dispatch(updateFavorite(id));
  };


  return (
    
      <div className="card w-1/3 bg-base-100  shadow-xl z-0 hover:z-50 lg:w-96 lg:image-full">
    <figure className="lg:h-72 rounded-xl">
      
      <button className="btn coeur absolute top-0 left-0 w-1/2 lg:hidden" onClick={() =>handleClickUpdate(id) }> 
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill={findBySlug(userFavorite, slug)  ? '#b91c1c' : 'none'}
            viewBox="0 0 24 24"
            stroke="#b91c1c "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button> 
        <Link className='lg:hidden block' to={`/jeux/${link}`}>
        <img src={src} alt={alt} />
        </Link>
        <img className='lg:block hidden'src={src} alt={alt} />

    </figure>
    <div className="lg:card-body hidden">
      <h2 className="card-title text-white">{name}</h2>
      <p className="text-transparent hover:text-white text-sm ">
        {description}
      </p>
      <div className="card-actions justify-end justify-between">
         <button className="btn coeur" onClick={() =>handleClickUpdate(id) }> 
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill={findBySlug(userFavorite, slug)  ? '#b91c1c' : 'none'}
            viewBox="0 0 24 24"
            stroke="#b91c1c "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button> 
        <Link to={`/jeux/${link}`}>
          <button className="btn btn-primary">Voir le jeu</button>
        </Link>
      </div>
    </div>
  </div>  
 
 

  );
}
