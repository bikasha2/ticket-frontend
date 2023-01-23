import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const deleteTicketToast = () => {
    toast.success('Ticket has been deleted successfully !', {
        position: toast.POSITION.TOP_RIGHT
    });
};

const completeTicketToast = () => {
    toast.success('Ticket has been marked completed !', {
        position: toast.POSITION.TOP_RIGHT
    });
};

const uncompleteTicketToast = () => {
    toast.success('Ticket has been marked uncompleted !', {
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

    function getData(token) {
        axios.get("http://localhost:3002/api/tickets",  {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
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
        axios.delete(`http://localhost:3002/api/ticket/${id}`, config)
            .then(function (response) {
                getData(userToken)
                deleteTicketToast()
            })
    }

    const completeTicket = (e, id) => {
        e.preventDefault()
       
        // headers
        const config = {
            headers: {
                "Content-Type": "application/json",
               
            }
        }
        // Request Body
        axios.put(`http://localhost:3002/api/ticket/completed/${id}`, config)
            .then(function (response) {
                getData(userToken)
                completeTicketToast()
            })
    }
    const unCompleteTicket = (e, id) => {
        e.preventDefault()
        // headers
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        // Request Body
        axios.put(`http://localhost:3002/api/ticket/uncompleted/${id}`, config)
            .then(function (response) {
                getData(userToken)
                uncompleteTicketToast()
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
                <CardContent>
                    {data.map(item => {
                    return item.ticket === true ?
                      <CardContent key={item._id} sx={{ border: '1px solid gray', marginTop: '5px' }}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {/* <Checkbox {...label} /> */}
                                Email: {item.email} &nbsp;
                                Description: {item.description}  &nbsp;
                                Date: {item.date} &nbsp;
                                Time: {item.time}
                               
                                <Button onClick={e => deleteTicket(e, item._id)} sx={{ float: 'right',  backgroundColor: '#FF0000', color: 'white', marginLeft: '10px', "&:hover": { border: "1px solid white",color: 'white',backgroundColor: 'red'} }} variant="outlined" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                                <Button onClick={e => completeTicket(e, item._id)} sx={{ float: 'right', backgroundColor: 'green', color: 'white', "&:hover": { border: "1px solid white",color: 'green',backgroundColor: 'lightgreen'} }} variant="outlined" startIcon={<DeleteIcon />}>
                                    Complete
                                </Button>
                            </Typography>

                        </CardContent> : 
                        <CardContent key={item._id} sx={{ border: '1px solid gray', marginTop: '5px', backgroundColor: 'lightgreen' }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {/* <Checkbox {...label} /> */}
                            Email: {item.email} &nbsp;
                            Description: {item.description}  &nbsp;
                            Date: {item.date} &nbsp;
                            Time: {item.time}
                            <Button onClick={e => deleteTicket(e, item._id)} sx={{ float: 'right', backgroundColor: '#FF0000', color: 'white', marginLeft: '10px', "&:hover": { border: "1px solid white",color: 'white',backgroundColor: 'red'} }} variant="outlined" startIcon={<DeleteIcon />}>
                                Delete
                            </Button>
                            <Button onClick={e => unCompleteTicket(e, item._id)} sx={{ float: 'right', backgroundColor: '#FF0000', color: 'white', "&:hover": { border: "1px solid white",color: 'white',backgroundColor: 'red'}}} variant="outlined" startIcon={<DeleteIcon />}>
                                    unComplete
                                </Button>
                        </Typography>

                    </CardContent>
                    })}
                </CardContent>
                <ToastContainer />
            </Card>


        </>
    )
}

export default ViewTicket;

