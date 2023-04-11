import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Registration from './components/Registration/Registration'
import UserStat from './components/UserStat/UserStat'
import Game from './components/Game/Game'


function App() {
  const [user, setUser] = useState();

  return (
    <>
 
    <Navbar user={user}/>
      <Routes>
        <Route path='/'>
          <Route index element={<Home user={user}/>}/>
          <Route path='login' element={<Login/>}></Route>
          <Route path='registration' element={<Registration/>}/>
        </Route>
        <Route path='/:user'>
          <Route index element={<Home user={user}/>}/>
          <Route path='statistic' element={<UserStat/>}/>
          <Route path='game' element={<Game/>}/>
        </Route>
        </Routes>
  
    </>
  )
}

export default App
