import React, { useState, useContext } from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import 'react-toastify/dist/ReactToastify.css';
import CommentBox from './CommentBox';
import { Typography } from '@mui/material';
import AuthContext from '../../Context/AuthContext';
import * as ticketService from '../../service/ticketService'
import * as toast from '../../toast/toast'

function TicketCardContet({ item, getData }) {

    const { authState } = useContext(AuthContext);
    const [assigne, setAssigne] = useState("IT Staff")

    const deleteTicket = (e, id) => {
        ticketService.deletedTicket({ id, authState })
            .then(function () {
                getData()
                toast.deleteTicketToast()
            })
            .catch(function (err) {
                toast.ErrordeleteTicketToast()
            })
    }

    const completeTicket = (e, id) => {
        ticketService.ticketCompleted({ id })
            .then(function () {
                getData()
                toast.completeTicketToast()
            })
            .catch(function (err) {
                toast.ErrorcompleteTicketToast()
            })
    }
    const unCompleteTicket = (e, id) => {
        ticketService.ticketUncompleted({ id })
            .then(function () {
                getData()
                toast.uncompleteTicketToast()
            })
            .catch(function (err) {
                toast.ErroruncompleteTicketToast()
            })
    }

    const assigneTicket = (e, id) => {
        ticketService.assigneTickets({ id, assigne })
            .then(function () {
                getData()
                toast.assigneTicketToast()
            })
            .catch(function (err) {
                toast.ErrorassigneTicketToast()
            })
    }
    const cardStyle = { border: '1px solid gray', marginTop: '5px' }
    return (
        <>
            <CardContent sx={item.ticket ? { ...cardStyle, backgroundColor: 'lightgreen' } : cardStyle}>
                <Box sx={{ fontSize: 14 }} color="text.secondary" >

                    <Box fontWeight={"bold"} sx={{ marginTop: '10px' }}>
                        Email :
                    </Box> {item.email} &nbsp;

                    <Box fontWeight={"bold"} sx={{ marginTop: '10px' }}>
                        Description :
                    </Box> {item.description}

                    <Box fontWeight={"bold"} sx={{ marginTop: '10px' }}>
                        Product :
                    </Box> {item.product} &nbsp;

                    <Box fontWeight={"bold"} sx={{ marginTop: '10px' }}>
                        Date :
                    </Box>  {item.date} &nbsp;

                    <Box fontWeight={"bold"} sx={{ marginTop: '10px' }}>
                        Time :
                    </Box> {item.time} &nbsp;

                    <Box fontWeight={"bold"} sx={{ marginTop: '10px' }}>
                        Assigne :
                    </Box> {item.assigne} &nbsp;

                    <Box fontWeight={"bold"} sx={{ marginTop: '10px' }}>
                        Comments :
                    </Box>
                    {item.comments.map(element => {
                        return (
                            <Box sx={{ marginTop: '10px' }}>
                                {element}&nbsp;
                            </Box>

                        )
                    })}
                    <Box >
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
                            <CommentBox  getData={getData} id={item._id} />
                            <Typography sx={{ marginTop: '10px' }}>
                                Comment Box :
                            </Typography>
                        </Box>
                    </Box >
                </Box>
            </CardContent>

        </>
    )
}

export default TicketCardContet;