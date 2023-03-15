import React, { useState, useContext } from 'react';
import axios from 'axios'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useHistory } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';




function Login() {
    const {setAuthState} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("IT Staff");

    const showToastMessage = () => {
        toast.success('login successfully', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const errorToastMessage = () => {
        toast.error('login unsuccessfully', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const history = useHistory();

    function handleSumbit(e) {
        e.preventDefault()

        const body = {
            email: email,
            password: password,
            role: role
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        // Request Body
        axios.post("https://ticket-backend-eqk1.onrender.com/api/users/login", body, config)
            .then(function (response) {
                if (response.status === 200) {
                    showToastMessage()
                    let tokst = response.data.token
                    window.localStorage.setItem('token', tokst)
                    setAuthState({token: tokst, isAuthenticated: true })
                }
            }).catch((err) => {
                errorToastMessage()
            })



    }

   

    return (
        <>
            <Box sx={{ fontWeight: 'Bold', padding: '20px' }}>
                <Button variant="contained" color='success' sx={{ fontWeight: 'Bold', float: 'right' }} onClick={e => history.push('/')}>Dashboard</Button>
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
                        Login
                    </Typography>
                </Grid>
            </Grid>

            <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }} component="form" noValidate autoComplete="off">
                <FormControl sx={{ border: '1px solid gray', paddingTop: '20px', paddingLeft: '50px', paddingBottom: '15px', paddingRight: '50px' }}>
                    Email: <TextField onChange={(newValue) => setEmail(newValue.target.value)} sx={{ width: '100%' }} id="email" margin="normal" />
                    Password: <TextField
                        type="password"
                        onChange={(newValue) => setPassword(newValue.target.value)} sx={{ width: '100%' }} id="Password" margin="normal" />
                    Role: <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        label="Role"
                        onChange={(newValue) => setRole(newValue.target.value)}
                        sx={{ width: '30vh', marginTop: '10px' }}
                    >
                        <MenuItem value={"IT Admin"}>IT Admin</MenuItem>
                        <MenuItem value={"IT Staff"}>IT Staff</MenuItem>
                    </Select>
                    <Button onClick={e => handleSumbit(e)} variant="contained" color="success" sx={{ marginTop: '15px', display: 'flex', justifyContent: 'center' }}>
                            Submit
                    </Button>
                           

                    <Typography mt={3} fontWeight='medium' component='div'>
                        For Test Drive:
                        &nbsp;
                        <Box fontWeight='bold' display='inline'>
                            Email:&nbsp;
                        </Box>
                        <Box fontWeight='medium' display='inline'>
                            adhikaribikash821@gmail.com
                        </Box> &nbsp;
                        <Box fontWeight='bold' display='inline'>
                            Password:&nbsp;
                        </Box>
                        <Box fontWeight='medium' display='inline'>
                            Bikash@123
                        </Box>
                    </Typography>
                    <ToastContainer />
                </FormControl>
            </Box>


        </>
    )
}

export default Login;

