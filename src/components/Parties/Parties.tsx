import React, { ChangeEvent, useState } from 'react';
import { Igame, Iplatform, Ivideo_game } from '../../@types/types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { findByName, findById } from '../../store/selectors/findData';
import {
  changeDateinput,
  changeGameInput,
  changeParticipantNumberinput,
  changePlatformInput,
  sendGame,
} from '../../store/reducer/games';
import { Link } from 'react-router-dom';

export default function Parties() {
  /*Fonction permettant de convertir le format de la date recupéré en API au format dd/mm/YY mm:ss*/
  const formatedDate = (time: string) =>
    new Date(time).toLocaleString('fr-FR', {
      timeZone: 'UTC',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  /*Fonction permettant de convertir le format de la date recupéré en API au format dd/mm/YY, permet de comparer par la suite si une partie à lieu aujourd'hui ou plus tard*/
  const formatedDateOnlyDay = (time: string) =>
    new Date(time).toLocaleString('fr-FR', {
      timeZone: 'UTC',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  /*State pour */
  const [open, setOpen] = useState(true);
  const [Platform, setPlatform] = useState<never | any>();
  const [videoGame, setVideoGame] = useState<never | any>();

  const videoGames = useAppSelector((state) => state.videoGames.list);
  const platformsData = useAppSelector((state) => state.platforms.list);
  const parties = useAppSelector((state) => state.games.list);

  const date = new Date()
  const dateToday = new Date().toLocaleDateString();


  const dispatch = useAppDispatch();

  const handleChangegames = (e: ChangeEvent<HTMLInputElement>) => {
    setPlatform(findByName(videoGames, e.target.value));
    dispatch(changeGameInput(e.target.value));
  };

  const handleChangePlatforms = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoGame(findByName(platformsData, e.target.value));
    dispatch(changePlatformInput(e.target.value));
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeDateinput(e.target.value));
  };

  const handleParticipantsChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeParticipantNumberinput(e.target.value));
  };

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(sendGame());
    setOpen(!open);
  };

  // const handle
  function handleClick() {
    setOpen(!open);
  }
  return (
    <>
      <h1 className="mb-2 text-5xl lg:text-9xl">Parties</h1>
      <h2 className="mb-2 text-4xl lg:text-6xl">Aujourd'hui</h2>
      <div>
        <div className="carousel max-w-full p-4 space-x-4 bg-neutral rounded-box">
          {parties.map(
            (game: Igame) =>
            dateToday === formatedDateOnlyDay(game.beginAt) &&
              game.status != 'finished' && (
                <div className="carousel-item w-80 z-0" key={game.id}>
                  <div className="card lg:card-side bg-base-100 shadow-xl ">
                    <figure className="h-96">
                      <img
                        src={`${import.meta.env.VITE_API_COVERS}/${
                          game.videoGame.cover
                        }`}
                        alt={game.slug}
                      />
                    </figure>
                    <div className="card-body flex flex-col">
                      <h3 className="card-title text-white ">
                        {game.videoGame.name} sur {game.platform.name}
                      </h3>
                      <h4 className="text-white">
                        {' '}
                        Organisateur : {game.organizer.pseudo}
                      </h4>
                      <p className="text-white">
                        le {formatedDate(game.beginAt)}
                      </p>
                      <p className="text-white">
                        Joueurs {game.participants.length}/
                        {game.maxParticipants}
                      </p>
                      <div className="card-actions justify-center">
                        <Link to={`/parties/${game.id}`}>
                          <button className="btn btn-primary ">
                            Voir Plus
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      <h2 className="mb-2 text-4xl lg:text-6xl">Parties à venir</h2>
      <div>
        <div className="carousel carousel-center max-w-full p-4 space-x-4 bg-neutral rounded-box">
          {parties.map(
            (game: any) =>
              date < new Date(formatedDateOnlyDay(game.beginAt)) && (
                <div className="carousel-item w-80 z-0" key={game.id}>
                  <div className="card lg:card-side bg-base-100 shadow-xl ">
                    <figure className="h-96">
                      <img
                        src={`${import.meta.env.VITE_API_COVERS}/${
                          game.videoGame.cover
                        }`}
                        alt={game.slug}
                      />
                    </figure>
                    <div className="card-body flex flex-col">
                      <h3 className="card-title text-white">
                        {game.videoGame.name} sur {game.platform.name}
                      </h3>
                      <h4 className="text-white">
                        {' '}
                        Organisateur : {game.organizer.pseudo}
                      </h4>
                      <p className="text-white">
                        le {formatedDate(game.beginAt)}
                      </p>
                      <p className="text-white">
                        Joueurs {game.participants.length}/
                        {game.maxParticipants}
                      </p>

                      <div className="card-actions justify-center">
                        {game.participants.length >= game.maxParticipants ? (
                          <p>
                            {' '}
                            Le nombre maximum de participants à été atteint{' '}
                          </p>
                        ) : (
                          <Link to={`/parties/${game.id}`}>
                            <button className="btn btn-primary">
                              Voir Plus
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <aside
        className={
          open
            ? 'flex flex-row gap-20 mt-24 fixed top-0 right-0 z-50 translate-x-72 transition-all lg:gap-6 lg: mt-20'
            : 'flex flex-row pl-3 gap-1 mt-16 fixed top-0 right-0 z-50 transition-all  lg: mt-20'
        }
      >
        {open ? (
          <button
            className="btn btn-outline btn-success z-50 bg-black"
            onClick={handleClick}
          >
            Créer une partie
          </button>
        ) : (
          <button
            className="btn btn-outline btn-error z-50 bg-black"
            onClick={handleClick}
          >
            X
          </button>
        )}
        <form
          action=""
          className="flex flex-col gap-2 bg-black p-2 rounded-md border-solid border-2 border-green-500"
        >
          <label htmlFor="">Choisissez un jeu : </label>
          <input
            list="videogames"
            placeholder="Jeux"
            onChange={handleChangegames}
          />
          <datalist id="videogames">
            {videoGame === undefined
              ? videoGames.map((game) => (
                  <option value={game.name} key={game.slug}></option>
                ))
              : videoGame.videoGames.map((game: Ivideo_game) => (
                  <option value={game.name} key={game.slug}></option>
                ))}
          </datalist>
          <label htmlFor="">Choisissez une plateforme : </label>
          <input
            list="platforms"
            placeholder="Plateforme"
            onChange={handleChangePlatforms}
          />
          <datalist id="platforms">
            {Platform === undefined
              ? platformsData.map((platform) => (
                  <option value={platform.name} key={platform.slug}></option>
                ))
              : Platform.platforms.map((platform: Iplatform) => (
                  <option value={platform.name} key={platform.slug}></option>
                ))}
          </datalist>
          <input
            type="datetime-local"
            min={Date.now()}
            placeholder="Date"
            required
            onChange={handleDateChange}
          ></input>
          <input
            type="number"
            min="2"
            max="50"
            placeholder="Nombre de joueur"
            onChange={handleParticipantsChange}
          ></input>
          <button className="btn" onClick={handleSubmit}>
            Envoyer
          </button>
        </form>
      </aside>
    </>
  );
}
