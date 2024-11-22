import {Route, Routes, BrowserRouter as Router,} from 'react-router-dom';

import './App.css'
import { MainPage } from './pages/main';
import { SignIn } from './pages/signIn';
import { Room } from './pages/room';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/sign-in' element={<SignIn/>}/> 
          <Route path='/room' element={<Room/>}/> 
        </Routes>
      </Router>
    </>
  )
}

export default App
