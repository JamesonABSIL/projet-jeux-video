import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();
  return (
   <>
   {/* Gestion de la barre de navigation */}
                  <li>
                    <NavLink
                      className={(active) =>
                        active && pathname === '/'
                          ? 'menu-link menu-link--active text-2xl'
                          : 'menu-link text-2xl'
                      }
                      to="/"
                    >
                      Accueil
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={(active) =>
                        active && pathname === '/genres'
                          ? 'menu-link menu-link--active text-2xl'
                          : 'menu-link text-2xl'
                      }
                      to="genres"
                    >
                      Genres
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={(active) =>
                        active && pathname === '/plateformes'
                          ? 'menu-link menu-link--active text-2xl'
                          : 'menu-link text-2xl'
                      }
                      to="plateformes"
                    >
                      Plateformes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={(active) =>
                        active && pathname === '/jeux'
                          ? 'menu-link menu-link--active text-2xl'
                          : 'menu-link text-2xl'
                      }
                      to="jeux"
                    >
                      Jeux-Videos
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={(active) =>
                        active && pathname === '/parties'
                          ? 'menu-link menu-link--active text-2xl'
                          : 'menu-link text-2xl'
                      }
                      to="parties"
                    >
                      Parties
                    </NavLink>
                  </li>
                  </>
  )
}
