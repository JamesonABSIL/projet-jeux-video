import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Link } from 'react-router-dom';

export default function Plateformes() {
  const platforms = useAppSelector((state) => state.platforms.list);

  return (
    <>
      <h1 className='mb-2 text-5xl lg:text-9xl my-9 mb-9'>Plateformes</h1>
      <div className="flex flex-wrap gap-5 justify-center">
        {platforms.map((platforms) => (
          <div
            className="card w-1/3 bg-gray-700 shadow-xl z-0 rounded-3xl flex justify-center items-center lg:w-96 min-h-[150px] min-w-[150px]"
            key={platforms.name}
          >
            <figure className="lg:h-80">
            <Link to={`/plateformes/${platforms.slug}`} >
              <img className="rounded-3xl min-h-[150px] min-w-[150px]" src={`${import.meta.env.VITE_API_COVERS}/${platforms.logo}`} alt={platforms.name} />
              </Link>

            </figure>
            <div className="card-body hidden lg:block">
              <h2 className="text-center text-white">{platforms.name}</h2>
              <p className='text-white text-lg'></p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
