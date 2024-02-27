import { useMediaQuery } from 'react-responsive';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'

export default function Header() {

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const { pathname } = useLocation();
 
  return (
    <header className='z-10 '>
      {/* Gestion du header sur mobile ou tablette */}
      <div>
        {isTabletOrMobile && (
          <div className="navbar bg-base-100 z-50">
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 "
                >
                 <Navbar />
                </ul>
              </div>
            </div>
            <div className="navbar-center">
              <Link className="text-3xl" to="/">Jeux vide'O</Link>{' '}
            </div>
            <div className="navbar-end">
            <Link to='/profil'>
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" />
                  </svg>
                </div>
              </button>
              </Link>
            </div>
          </div>
        )}
        {/* Gestion du header sur PC */}
        {isDesktopOrLaptop && (
          <div className="navbar ">
            <div className="navbar-start">
              <Link className="text-3xl" to="/">Jeux vide'O</Link>
            </div>
            <div className="navbar-center flex flex-row">
              <ul className="flex flex-row space-x-6">
              <Navbar />
              </ul>
            </div>

            <div className="navbar-end">             
              <Link to='/profil'>
              <button className="btn btn-ghost btn-circle ">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" />
                  </svg>
                </div>
              </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
