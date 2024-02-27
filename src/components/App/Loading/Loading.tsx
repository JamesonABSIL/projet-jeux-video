import React from 'react'

export default function Loading() {
  return (
    <>
    <div className="Sonic flex justify-center">
      <div className="flex justify-center">
        <img className="h-40 lg:h-80" src="https://i.gifer.com/5IPd.gif" />
        <img
          className="h-20 mt-20 lg:h-40 lg:mt-40"
          src="https://i.gifer.com/ZHDT.gif"
        />
        <img
          className="h-20 mt-20 lg:h-40 lg:mt-40"
          src="https://i.gifer.com/ZHDT.gif"
        />
        <img
          className="h-20 mt-20 lg:h-40 lg:mt-40"
          src="https://i.gifer.com/ZHDT.gif"
        />
      </div>
    </div>
    <p className="flex justify-center text-2xl"> Chargement...</p>
  </>
  )
}
