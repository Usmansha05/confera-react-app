import RestoreIcon from '@mui/icons-material/Restore';
import { Button, IconButton, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import { AuthContext } from '../contexts/AuthContext';
import withAuth from '../utils/withAuth';

function HomeComponent() {


    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");


    const {addToUserHistory} = useContext(AuthContext);
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <>

            <div className="navBar">
                <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ display: "flex", alignItems: "center" }}>
                    <h2>Confera</h2>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} style={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => { navigate("/history") }}>
                        <RestoreIcon />
                    </IconButton>
                    <p>History</p>
                    <Button onClick={() => { localStorage.removeItem("token"); navigate("/auth") }}>
                        Logout
                    </Button>
                </motion.div>
            </div>


            <div className="meetContainer">
                <motion.div className="leftPanel" initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                    <div>
                        <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>Providing Quality Video Call Just Like Quality Education</motion.h2>
                        <motion.div style={{ display: 'flex', gap: "10px" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                            <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
                <motion.div className='rightPanel' initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                    <img srcSet='/logo3.png' alt="" />
                </motion.div>
            </div>
        </>
    )
}


export default withAuth(HomeComponent)