import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux';


export default function Accueil() {
  const isLogged = useAppSelector((state) => state.users.logged);
  const videoGames = useAppSelector((state)=>state.videoGames.homeList)
  return (
    <>
<p className='mt-10 mb-10'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, veritatis, iste quidem molestiae nihil deserunt incidunt inventore minima provident illo animi, minus adipisci quo corrupti maxime sequi. Inventore esse, in fugiat fuga atque tempore nemo unde, totam harum beatae quibusdam possimus aliquid alias nisi similique quasi nulla eaque. Mollitia repellat nihil explicabo et rerum qui deleniti! Accusantium facilis voluptate in hic pariatur, aut dolore ipsum voluptatem, voluptatibus recusandae, nesciunt quam mollitia cum non illum iusto nemo distinctio. 
</p>
{/* Lien de connexion et d'inscription de l'utilisateur */}
{
!isLogged &&
<div className='flex justify-center gap-2 mb-20'>
<button className="btn btn-warning"><Link className="text-2xl" to='register'>S'inscrire</Link></button>

<button className="btn btn-info"><Link className="text-2xl" to='login'>Se connecter</Link></button>

</div>
}

{/* import d'un carroussel via daisyUI */}
    <div > 
      <div className="carousel rounded-box flex ">
      {videoGames.map((game) => 
  <div className="carousel-item w-96" key={game.slug}>
    <img src={`http://andre-appaoo-server.eddi.cloud/projet-08-jeux-video-back/public/images/${game.cover}`}
    alt={game.slug} />
  </div> 
      )}
</div>
    </div>
    </>
  )
}
