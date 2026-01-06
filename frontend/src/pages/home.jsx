import React, { useState , useContext } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../../src/contexts/AuthContexts.jsx';
import "../styles/home.css"
 function HomeComponent() {

        let navigate = useNavigate();
        const [meetingCode , setMeetingCode]= useState();
        const {addToUserHistory} = useContext(AuthContext);


        let handleVideoCall = async()=>{
            await addToUserHistory(meetingCode)
            navigate(`/${meetingCode}`) 
        }


        return (
            <>
    
                <div className="navBar">
    
                    <div style={{ display: "flex", alignItems: "center" }}>
    
                        <h2>VideoConnect</h2>
                    </div>
    
                    <div className='features' style={{ display: "flex", alignItems: "center", position:"absolute" , right:"0"}}>
                        <div className='history'>
                            <IconButton onClick={
                                () => {
                                    navigate("/history")
                                }
                            }>
                                <RestoreIcon />
                            </IconButton>
                            <p>History</p>
                        </div>
                        <div>
                            <Button onClick={() => {
                                localStorage.removeItem("token")
                                navigate("/auth")
                            }}>
                                Logout
                            </Button>

                        </div>
    
                    
                    </div>
    
    
                </div>
    
    
                <div className="meetContainer">
                    <div className='rightPanel'>
                        <img srcSet='public/calllogo.jpg' alt="" />
                    </div>
                    <div className="leftPanel">
                        <div>
                            <h2>Providing Quality Video Call For Everyone</h2>
                            <br></br>
                            <br></br>
                        </div>
                        
                            <div style={{ display: 'flex', gap: "10px" }}>
    
                                <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
                                <Button onClick={handleVideoCall} variant='contained'>Join</Button>
    
                            </div>
                        
                    </div>
                    
                </div>
            </>
        )
}
export default withAuth(HomeComponent);