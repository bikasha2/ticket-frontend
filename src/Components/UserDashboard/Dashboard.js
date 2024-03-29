import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';


function Dashboard() {


    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [product, setProduct] = useState("Website");


    const showToastMessage = () => {
        toast.success('Ticket has been created successfully !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const errorToastMessage = () => {
        toast.error('Ticket has been created unsuccessfully !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const history = useHistory()



    function handleSubmit(e) {
        e.preventDefault()
        const body = {
            email: email,
            description: description,
            product: product,
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        // Request Body
        axios.post("https://ticket-backend-eqk1.onrender.com/api/tickets", body, config)
            .then(function (response) {
                if (response.status === 200) {
                    setEmail("");
                    setDescription("");
                    showToastMessage();
                }
            }).catch((err) => {
                errorToastMessage();
            })
    }

    function login(e) {
        e.preventDefault()
        history.push('/login')
    }

    return (
        <>
            <Box sx={{ fontWeight: 'Bold', padding: '20px' }}>
                <Button variant="contained" color='success' sx={{ fontWeight: 'Bold' }} onClick={e => login(e)}>View Tickets</Button>
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
                        Create Tickets
                    </Typography>
                </Grid>
            </Grid>

            <Box sx={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }} component="form" noValidate autoComplete="off">
                <FormControl sx={{ border: '1px solid gray', paddingTop: '20px', paddingLeft: '50px', paddingBottom: '15px', paddingRight: '50px' }}>

                    Email: <TextField sx={{ width: '100vh' }} value={email} onChange={(newValue) => setEmail(newValue.target.value)}  id="email" margin="normal" />
                    Description: <TextField fullWidth value={description} onChange={(newValue) => setDescription(newValue.target.value)}  id="Description" margin="normal" />
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={product}
                        label="Product"
                        onChange={(newValue) => setProduct(newValue.target.value)}
                        sx={{ width: '30vh', marginTop: '10px' }}
                    >
                        <MenuItem value={"Website"}>Website</MenuItem>
                        <MenuItem value={"MobileApp"}>MobileApp</MenuItem>
                        <MenuItem value={"Subscription"}>Subscription</MenuItem>
                        <MenuItem value={"General"}>General</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                    <Button onClick={e => handleSubmit(e)} variant="contained" color="success" sx={{ marginTop: '15px', display: 'flex', justifyContent: 'center' }}>
                        Submit
                    </Button>
                    <ToastContainer />
                </FormControl>
            </Box>
        </>
    )
}

export default Dashboard;
