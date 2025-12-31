import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import LandingPage from "./pages/landing.jsx"
import Authentication from "./pages/authentication.jsx"
import { AuthProvider } from './contexts/AuthContexts.jsx'
import VideoMeet from './pages/VideoMeet.jsx'
import HomeComponent from './pages/home.jsx'
import History from './pages/history.jsx'

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<LandingPage />}></Route>
            <Route path='/auth' element={<Authentication />}></Route>
            <Route path='/home' element={<HomeComponent />}></Route>
            <Route path='/history' element={<History />}></Route>
            <Route path='/:url' element={<VideoMeet />}></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
    
  )
}

export default App
