import React from 'react';

export default function Contact() {
  return (
    <>
    <h1 className='text-4xl lg:text-8xl mb-2'>Contact</h1>
    <div className='flex justify-center'>
      <form action="" className='flex flex-col gap-y-4 w-2/3 '>
        <input type="text" placeholder='Prénom' ></input>
        <input type="text" placeholder='Nom'></input>
        <input type="text" placeholder='Société'></input>
        <input type="text" placeholder='Email'></input>
        <textarea placeholder='Message' cols="40" rows="12"></textarea>
        <button className='btn btn-primary'>Envoyer</button>
      </form>
    </div>
    </>
  );
}
