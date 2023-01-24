import React, { useState, useEffect } from 'react';
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




function ViewTicket() {

    const [data, setData] = useState([])
    const [userToken, setUserToken] = useState("")
  
    const history = useHistory()

    const location = useLocation();

    const logout = (e) => {
        e.preventDefault()
        localStorage.clear('token');
        history.push('/')
    }

    function getData(token) {
        axios.get("http://localhost:3002/api/tickets", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
            .then(function (response) {
                setData(response.data)
            })
    }



   



    useEffect(() => {
        const token = location.state
        setUserToken(token)
        getData(token)
    }, [location]);


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
                <CardContent > 
                    {data.map(item => {
                        return(
                        <TicketCardContet item={item} userToken={userToken} getData={getData} key={item._id}/>
                        )  
                    })}
                </CardContent>
                <ToastContainer />
            </Card>


        </>
    )
}

export default ViewTicket;

