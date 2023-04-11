import React from 'react'
import { Outlet } from 'react-router-dom'

function Home({user}) {
  return (
    <div>
      {user? (
      <>
      <p>Залогиненный home</p>
      <button></button>
      </>): (<p>Незалогиненный home</p>)}
      <Outlet/>
    </div>
 
  )
}

export default Home