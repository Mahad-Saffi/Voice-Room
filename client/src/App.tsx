import {Route, Routes, BrowserRouter as Router, Navigate,} from 'react-router-dom';

import './App.css'
import { MainPage } from './pages/main';
import { SignIn } from './pages/signIn';
import { Room } from './pages/room';
import { StreamCall } from '@stream-io/video-react-sdk';
import { useUser } from './user-context';

function App() {
  const { call } = useUser();
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/sign-in' element={<SignIn/>}/> 
          <Route path='/room' element={
            call ?
            <StreamCall call={call}>
              <Room/>
            </StreamCall> : <Navigate to='/'/>
            }/> 
        </Routes>
      </Router>
    </>
  )
}

export default App
