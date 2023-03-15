import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useHistory, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TicketCardContet from './TicketCardContent';
import AuthContext from '../../Context/AuthContext';
import CircularProgressWithLabel from "./Spinner"




function ViewTicket() {
    const {authState,setAuthState} = useContext(AuthContext);
  
    const [data, setData] = useState([])
    const [userToken, setUserToken] = useState("")
    const [isFetching, setIsFetching] = useState(true); 
    const history = useHistory()

    const location = useLocation();


    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuthState({token: "", isAuthenticated: false })
        history.push('/')
    }

    function getData() {
        axios.get("https://ticket-backend-eqk1.onrender.com/api/tickets", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": authState.token
            }
        })
            .then(function (response) {
                setIsFetching(false); 
                setData(response.data)
            })
    }

    useEffect(() => {
        const token = location.state
        setUserToken(token)
        getData(token)
    }, []);

    if (isFetching) {
        return (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems:"center",
          minHeight:"100vh" }}>
                <CircularProgressWithLabel />
          </Box>
        );
    }
    return (
        <>
            <Box sx={{ fontWeight: 'Bold', padding: '20px' }}>
                <Button variant="contained" color='success' sx={{ fontWeight: 'Bold', float: 'right' }} onClick={e => logout(e)}>Logout</Button>
            </Box>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '10vh' }}
            >

                <Grid item xs={3}>
                    <Typography variant="h1" component="h2">
                        Tickets
                    </Typography>
                </Grid>

            </Grid>



            <Card >
                {data.map(item => {
                    return (
                        <CardContent >
                            <TicketCardContet key={item._id} userToken={userToken} getData={getData} item={item}> </TicketCardContet>
                        </CardContent>
                    )
                })}
                <ToastContainer />
            </Card>


        </>
    )
}

export default ViewTicket;

