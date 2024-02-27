import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux';


export default function Accueil() {
  const isLogged = useAppSelector((state) => state.users.logged);
  const videoGames = useAppSelector((state)=>state.videoGames.homeList)
  return (
    <>
 
 <h1 className='mb-2 text-xl mt-4 lg:text-6xl'>Relevez des défis en trouvant d'autres joueurs</h1>
  <p className='lg:text-xl text-sm mt-4 mb-10'>Le nouveau réseau social du monde des Jeux-vidéos, rencontrer et partager votre passion au cours d’une partie.</p>
{/* Lien de connexion et d'inscription de l'utilisateur si non connecté*/}
{
!isLogged &&
<div className='flex justify-center gap-2 mb-5'>
<button className="btn btn-warning"><Link className="text-2xl" to='register'>S'inscrire</Link></button>

<button className="btn btn-info"><Link className="text-2xl" to='login'>Se connecter</Link></button>
</div>
}

{/* import d'un carroussel via daisyUI et personnalisation dans App.css*/}
    <div className='container carousel h-1/3'> 
      <div className="flex infinite h-72 lg:h-full gap-4 lg:gap-4">
      {videoGames.map((game) => 
  <div className="carousel-item w-60 lg:w-96 infinite-item " key={game.slug}>
    <img src={`https://andre-appaoo-server.eddi.cloud/${game.cover}`}
    alt={game.slug} 
    className='rounded-xl'/>
  </div> 
      )}
</div>
    </div>
    </>
  )
}
