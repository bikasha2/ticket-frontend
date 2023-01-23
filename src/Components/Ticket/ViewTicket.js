import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const deleteTicketToast = () => {
    toast.success('Ticket has been deleted successfully !', {
        position: toast.POSITION.TOP_RIGHT
    });
};

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

    function getData(token, config) {
        axios.get("https://ticket-backend-eqk1.onrender.com/api/tickets", config)
            .then(function (response) {
                setData(response.data)
            })
    }



    const deleteTicket = (e, id) => {
        e.preventDefault()
        // headers
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": userToken
            }
        }
        // Request Body
        axios.delete(`https://ticket-backend-eqk1.onrender.com/api/ticket/${id}`, config)
            .then(function (response) {
                getData(userToken, config)
                deleteTicketToast()
            })
    }



    useEffect(() => {
        const token = location.state
        setUserToken(token)
        // headers
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        }
        // Request Body
        getData(token, config)
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
                <CardContent>
                    {data.map(item => (
                        <CardContent key={item._id} sx={{ border: '1px solid gray', marginTop: '2px' }}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                <Checkbox {...label} />
                                Email: {item.email} &nbsp;
                                Description: {item.description}  &nbsp;
                                Date: {item.date} &nbsp;
                                Time: {item.time}
                                <Button onClick={e => deleteTicket(e, item._id)} sx={{ float: 'right', color: 'red' }} variant="outlined" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </Typography>

                        </CardContent>
                    ))}
                </CardContent>
                <ToastContainer />
            </Card>


        </>
    )
}

export default ViewTicket;

