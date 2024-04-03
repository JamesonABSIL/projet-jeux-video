import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Link, useParams } from 'react-router-dom';
import { findById, findByName } from '../../store/selectors/findData';
import { useMediaQuery } from 'react-responsive';
import {
  changeDateinput,
  changeGameInput,
  changeParticipantNumberinput,
  changePlatformInput,
  joinAGame,
  updateGame,
  updateGameStatus,
} from '../../store/reducer/games';
import { Iplatform } from '../../@types/types';
import { CurrentUser } from '../../store/reducer/users';

export default function Partie() {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });

  const { id } = useParams();
  const [open, setOpen] = useState(true);

  const partie = useAppSelector((state) => findById(state.games.list, id));
  const dispatch = useAppDispatch();

  const formatedDate = (time: string) =>
    new Date(time).toLocaleString('fr-FR', {
      timeZone: 'UTC',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    const formatedDateTest = (time: string | Date) =>
    new Date(time).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

  const [Platform, setPlatform] = useState<any>();
  const [videoGame, setVideoGame] = useState<any>();

  const currentUser = useAppSelector((state) => state.users.currentUser);
  const videoGames = useAppSelector((state) => state.videoGames.list);
  const platformsData = useAppSelector((state) => state.platforms.list);

  const handleClick = () => {
    dispatch(joinAGame(id));
  };

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

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(updateGame(id));
    setOpen(!open);
  };
  // const handle
  function handleClicke() {
    setOpen(!open);
  }

  const handleSetStatus = (id: number) => {
    dispatch(updateGameStatus(id));
  };

  const renderSwitch = (params: string, p: CurrentUser) => {
    switch (params) {
      case 'PlayStation 4':
      case 'PlayStation 5':
        return p.psId;
      case 'Xbox One':
      case 'Xbox Serie X':
        return p.xbId;
      case 'Nintendo Switch':
        return p.nintendoCode;
      case 'PC':
        return '';
    }
  };
  const dateEng = new Date().toLocaleString('en-GB', {
    year: 'numeric',
    day: '2-digit',
    month: 'long',
  })


  
  return (
    <>
      {!partie ? (
        <div className="flex justify-center ">
          <img src="https://i.gifer.com/5IPd.gif" />
        </div>
      ) : (
        <div>
          <h1 className="mb-2 text-4xl lg:text-8xl">
            Partie n°{partie.id} de {partie.organizer.pseudo}
          </h1>
          <div className="card lg:card-side bg-base-100 shadow-xl flex justify-center">
            <div className="flex">
              <figure
                className={
                  isDesktopOrLaptop ? ' h-full w-full ' : 'h-auto w-content '
                }
              >
                <img
                  className="object-scale-down max-h-[500px] lg:max-h-[900px]"
                  src={`${import.meta.env.VITE_API_COVERS}/${
                    partie.videoGame.cover
                  }`}
                  alt={partie.videoGame.name}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {partie.videoGame.name} sur {partie.platform.name}
                </h2>
                <p>Début de la partie le {formatedDate(partie.beginAt)}</p>
                <p>
                  {partie.participants.length}/{partie.maxParticipants} Joueurs
                </p>
                {partie.organizer.id === currentUser.id && (
                  <ul>
                    {partie.participants.map((p: any) => (
                      <li key={p.pseudo}>
                        {p.pseudo} - {renderSwitch(partie.platform.name, p)}
                      </li>
                    ))}
                  </ul>
                )}

                {partie.countParticipants >= partie.maxParticipants ? (
                  <div className="card-actions justify-end">
                    <p>Le nombre maximum de participants à été atteint</p>
                    <Link to="/parties">
                      <button className="btn btn-primary">
                        Revenir à la page des parties
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="card-actions justify-end">
                    {partie.status != 'finished' && (
                      <button
                        className={
                          partie.organizer.id === currentUser.id
                            ? 'hidden'
                            : 'btn btn-primary'
                        }
                        onClick={handleClick}
                      >
                        {findById(partie.participants, currentUser.id)
                          ? 'Se désinscrire'
                          : "S'inscrire"}
                      </button>
                    )}
                  </div>
                )}
                {partie.status === 'finished' && <p>La partie est terminée</p>}

                {partie.organizer.id === currentUser.id &&
                  partie.status != 'finished' && (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSetStatus(partie.id)}
                    >
                      Marquer la partie comme terminée
                    </button>
                  )}
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
      )}
      {partie.organizer.id === currentUser.id && (
        <aside
          className={
            open
              ? 'flex flex-row gap-16 lg:gap-20 mt-32 fixed top-0 right-0 z-50 translate-x-80 lg:translate-x-72 transition-all lg:gap-6 lg: mt-20'
              : 'flex flex-row pl-3 gap-1 mt-32 fixed top-0 right-0 z-50 transition-all  lg: mt-20'
          }
        >
          {open ? (
            <button
              className="btn btn-outline btn-success z-50 bg-black"
              onClick={handleClicke}
            >
              Modifier
            </button>
          ) : (
            <button
              className="btn btn-outline btn-error z-50 bg-black"
              onClick={handleClicke}
            >
              X
            </button>
          )}
          <form
            action=""
            className="flex flex-col gap-2 bg-black p-2 rounded-md"
          >
            <label htmlFor="">Choisissez un jeu : </label>
            <input
              list="videogames"
              placeholder="Jeux"
              onChange={handleChangegames}
            />
            <datalist id="videogames">
              <option
                value={partie.videoGame.name}
                key={partie.videoGame.slug}
              ></option>
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
      )}
    </>
  );
}
