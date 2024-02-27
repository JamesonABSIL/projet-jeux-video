import React, { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { updateMail, updateProfil, updatePseudo, updatenintendocode, updatepsId, updatexbId } from '../../store/reducer/users';

export default function UpdateProfil() {
  const dispatch = useAppDispatch();
  const currentUser=useAppSelector((state) => state.users.currentUser)
  const error = useAppSelector((state) => state.users.error)

const handlePseudoChange= (e: ChangeEvent<HTMLInputElement>) => {
  dispatch(updatePseudo(e.target.value))
}
const handleEmailChange= (e: ChangeEvent<HTMLInputElement>) => {
  dispatch(updateMail(e.target.value))

}
const handlenintendoCodeChange= (e: ChangeEvent<HTMLInputElement>) => {
  dispatch(updatenintendocode(e.target.value))
}
const handlePsIdChange= (e: ChangeEvent<HTMLInputElement>) => {
  dispatch(updatepsId(e.target.value))
}
const handleXbIdChange= (e: ChangeEvent<HTMLInputElement>) => {
  dispatch(updatexbId(e.target.value))
}

const handleClick = (e : React.MouseEvent<HTMLElement>)=> {
  e.preventDefault();
  dispatch(updateProfil())
  !error ? alert("Vos modifications ont bien été mises à jours") : alert("Une erreur est survenue, veillez réessayer")
}

  return (
    <>
  <h1 className='mt-2 mb-5 text-3xl lg:text-9xl '>Modification du profil</h1>
    <div className='flex justify-center'>
    <form action="" className='flex flex-col gap-y-4 w-88 justify-center bg-black p-5 rounded-2xl'>
      <p>Pseudo :</p>
      <input type="text" name="pseudo" placeholder="Pseudo" value={currentUser.pseudo} onChange={handlePseudoChange}/>
      <p>Email :</p>
      <input type="text" name="email" placeholder="Email" value={currentUser.email} onChange={handleEmailChange}/>
      <p>Identifiant Nintendo :</p>
      <input type="text" name="nintendoCode" placeholder="NintendoCode" onChange={handlenintendoCodeChange} value={currentUser.nintendoCode ? currentUser.nintendoCode : "" }/>
      <p>Identifiant PlayStation :</p>
      <input type="text" name="psId" placeholder="PlaystationId" onChange={handlePsIdChange} value={currentUser.psId ? currentUser.psId : ""}/>
      {/* <input type="text" name="pcIds" value={currentUser.email}/> */}
      <p>Identifiant Xbox :</p>
      <input type="text" name="xbId" placeholder="XboxId"onChange={handleXbIdChange} value={currentUser.xbId ? currentUser.xbId : ""}/>
      <button className='btn btn-success m-5' onClick={handleClick}>Envoyer</button>
    </form>
    </div>
    </>
  )
}

