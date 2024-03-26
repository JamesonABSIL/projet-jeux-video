import { useAppDispatch } from '../../hooks/redux';
import { Link } from 'react-router-dom';
import { updateFavorite } from '../../store/reducer/users';
import { findBySlug } from '../../store/selectors/findData';

interface IMap {
  src: string;
  alt: string;
  id: number;
  slug: string;
  favorites: {};
}

export default function FavoriteCard({ src, alt, id, slug, favorites }: IMap) {
  const dispatch = useAppDispatch();

  const handleClick = (id: number) => {
    dispatch(updateFavorite(id));
  };

  return (
    <div className="card w-1/3 bg-base-100 shadow-xl z-0 hover:z-50 lg:w-96 lg:image-full">
      <figure className="lg:h-72">
        <button
          className="btn delete btn-circle absolute btn-outline size-8 top-0 left-0 lg:hidden"
          onClick={() => handleClick(id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill=""
            viewBox="0 0 24 24"
            stroke="#b91c1c"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <Link className="lg:hidden block" to={`/jeux/${slug}`}>
          <img src={src} alt={alt} />
        </Link>
        <img className="lg:block hidden" src={src} alt={alt} />
      </figure>
      <div className="lg:card-body hidden">
        <h3 className="card-title text-white">{alt}</h3>
        <div className="card-actions justify-end justify-between ">
          <button
            className="btn delete btn-circle btn-outline"
            onClick={() => handleClick(id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill=""
              viewBox="0 0 24 24"
              stroke="#b91c1c"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <Link to={`/jeux/${slug}`}>
            <button className="btn btn-primary">Plus d'infos</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
