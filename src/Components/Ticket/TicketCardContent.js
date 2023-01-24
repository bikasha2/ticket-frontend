import React, { useState } from 'react';
import axios from 'axios'
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { toast } from 'react-toastify';
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
const assigneTicketToast = () => {
    toast.success('Ticket has been assigned !', {
        position: toast.POSITION.TOP_RIGHT
    });
};

function TicketCardContet({item, userToken, getData}) {


    const [assigne, setAssigne] = useState("IT Staff")

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

    const assigneTicket = (e, id) => {
        e.preventDefault()
        // headers
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        // Request Body
        axios.put(`http://localhost:3002/api/ticket/assigne/${id}`, { assigne }, config)
            .then(function (response) {
                getData(userToken)
                assigneTicketToast()
            })
    }
    const cardStyle = { border: '1px solid gray', marginTop: '5px' }
    return (
        <>
           
             <CardContent sx={item.ticket?{...cardStyle, backgroundColor: 'lightgreen'}: cardStyle}>
                                <Box sx={{ fontSize: 14 }} color="text.secondary" >

                                    <Box fontWeight={"bold"}>
                                        Email :
                                    </Box> {item.email} &nbsp;

                                    <Box fontWeight={"bold"}>
                                        Description :
                                    </Box> {item.description}

                                    <Box fontWeight={"bold"}>
                                        Product :
                                    </Box> {item.product} &nbsp;

                                    <Box fontWeight={"bold"}>
                                        Date :
                                    </Box>  {item.date} &nbsp;

                                    <Box fontWeight={"bold"}>
                                        Time :
                                    </Box> {item.time} &nbsp;

                                    <Box fontWeight={"bold"}>
                                        Assigne :
                                    </Box> {item.assigne} &nbsp;



                                    <Box sx={{ display: 'flex', flexDirection: 'column-reverse', width: '30vh' }}>
                                        <Button onClick={e => deleteTicket(e, item._id)} sx={{ float: 'right', backgroundColor: '#FF0000', marginTop: '10px', color: 'white', "&:hover": { border: "1px solid white", color: 'white', backgroundColor: 'red' } }} variant="outlined" startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                        <Button onClick={e => completeTicket(e, item._id)} sx={{ float: 'right', backgroundColor: 'green', marginTop: '10px', color: 'white', "&:hover": { border: "1px solid white", color: 'green', backgroundColor: 'lightgreen' } }} variant="outlined" startIcon={<DoneIcon />}>
                                            Complete
                                        </Button>
                                        <Button onClick={e => unCompleteTicket(e, item._id)} sx={{ float: 'right', backgroundColor: 'red', marginTop: '10px', color: 'white', "&:hover": { border: "1px solid white", color: 'white', backgroundColor: 'red' } }} variant="outlined" startIcon={<ClearIcon />}>
                                            Uncomplete
                                        </Button>
                                        <Button sx={{ border: '1px solid black', marginTop: '10px', backgroundColor: 'white' }} onClick={e => assigneTicket(e, item._id)}>
                                            Change Assigne
                                        </Button>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={assigne}
                                            label="Assigne"
                                            onChange={(newValue) => setAssigne(newValue.target.value)}
                                            sx={{ border: '1px solid black', backgroundColor: 'white', marginTop: '10px' }}
                                        >
                                            <MenuItem value={"IT Admin"}>IT Admin</MenuItem>
                                            <MenuItem value={"IT Staff"}>IT Staff</MenuItem>
                                        </Select>

                                    </Box>


                                </Box>
                            </CardContent>
             
        </>
    )
}

export default TicketCardContet;