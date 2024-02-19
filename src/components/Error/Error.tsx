import React from 'react'
import picture from '../../assets/guitar-video-games-hyperlink-http-404-computer-servers-mug-error-message-cartoon-png-clipart-thumbnail.jpg'
import { Link } from 'react-router-dom'
export default function Error() {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <Link to='/'><img className='mt-4 ml-8' src={picture} alt="" /></Link>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
          </div>
        </div>
      </main>
  )
}
