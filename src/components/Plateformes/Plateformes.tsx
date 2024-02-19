import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Link } from 'react-router-dom';

export default function Plateformes() {
  const platforms = useAppSelector((state) => state.platforms.list);

  return (
    <>
      <h1>Plateformes</h1>
      <div className="flex flex-wrap gap-5 justify-center">
        {platforms.map((platforms) => (
          <div
            className="card w-96 bg-base-100 shadow-xl  z-0"
            key={platforms.name}
          >
            <figure className="h-96">
              <img className="h-96 object-fill"src={`${import.meta.env.VITE_API_COVERS}/${platforms.logo}`} alt={platforms.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-white">{platforms.name}</h2>
              <p className='text-white text-lg'></p>
              <Link to={`/plateformes/${platforms.slug}`} >
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Voir les jeux</button>
              </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
