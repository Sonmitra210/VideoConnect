import React from 'react'
import "../App.css"
import { useNavigate } from 'react-router-dom';
export default function Landing() {
    let navigate = useNavigate();

  return (
    <div className='landingPageContainer'>
        <nav>
            <div className='navHeader'>
                <h2>Video Connect</h2>
            </div>
            <div className='navList'>
                <p onClick={() => navigate('/auth', { state: { form: 1 } })}>Register</p>
                <div role='button' onClick={() => navigate('/auth', { state: { form: 0 } })}>Login</div>
            </div>
        </nav>
        <div className='landingMainContainer'>
            <div className='landingPageContent'>
                <h1><span style={{color:"#FF9839"}}>Connect</span> with your loved ones</h1>
                <br></br>
                <h3>Cover any distance by Video Connect</h3>
                <br></br>
                <a href='/auth'>
                    <button>Get Started</button>
                </a>
            </div>
            <div className='landingPageImage'>
                <img src='/videocall.png'></img>
            </div>
        </div>
        
    </div>
  )
}
