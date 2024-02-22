import React from 'react';

export default function Contact() {
  return (
    <>
    <h1>Contact</h1>
    <div className='flex justify-center'>
      <form action="" className='flex flex-col gap-y-4 w-1/3 '>
        <input type="text" placeholder='Prénom' ></input>
        <input type="text" placeholder='Nom'></input>
        <input type="text" placeholder='Société'></input>
        <input type="text" placeholder='Email'></input>
        <textarea placeholder='Message' cols="40" rows="20"></textarea>
        <button className='btn btn-primary'>Envoyer</button>
      </form>
    </div>
    </>
  );
}
