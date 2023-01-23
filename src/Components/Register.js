import React, {useState} from 'react';
import axios from 'axios'
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

function Register() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");

    const successToastMessage = (response) => {
        console.log(response)
        toast.success('Registration successfully !',{
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const errorToastMessage = (error) => {
        console.log(error)
        toast.error('Registeration unsuccessfuly !',{
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const history = useHistory();

    function handleSumbit(e) {
        e.preventDefault()
        const body = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            role: role
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        // Request Body
        axios.post("http://localhost:3002/api/users/register", body, config)
            .then(function (response) {
                console.log(response);
                successToastMessage(response)
                setFirstName("")
                setLastName("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                setRole("")
               
            })
            .catch((error) =>{
                errorToastMessage(error)
                setFirstName("")
                setLastName("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                setRole("")
               
            })
    }
          
    return(
        <>
            <Box sx={{fontWeight: 'Bold', padding: '20px'}}>
            <Button variant="contained" color='success' sx={{fontWeight: 'Bold', float: 'right'}} onClick={e => history.push('/login')}>Login</Button>
            <Button variant="contained" color='success' sx={{fontWeight: 'Bold', float: 'left'}} onClick={e => history.push('/login')}>View Ticket</Button>
           
          <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >

                <Grid item xs={3}>
                    <Typography variant="h1" component="h2">
                        Register
                    </Typography>
                </Grid>
            </Grid>

            <Box sx={{marginTop: '30px',display: 'flex', justifyContent: 'center'}} component="form" noValidate autoComplete="off">
            <FormControl  sx={{border: '1px solid gray', paddingTop: '20px', paddingLeft: '50px', paddingBottom: '15px', paddingRight: '50px'}}>
            First Name: <TextField onChange={(newValue) => setFirstName(newValue.target.value)} sx={{width: '100%'}} label={'Please enter your First Name'} id="FirstName" margin="normal" />
            Last Name: <TextField onChange={(newValue) => setLastName(newValue.target.value)} sx={{width: '100%'}} label={'Please enter your Last Name'} id="LastName" margin="normal" />
            Email: <TextField onChange={(newValue) => setEmail(newValue.target.value)} sx={{width: '100%'}} label={'Please enter your Email'} id="email" margin="normal" />
            Password: <TextField onChange={(newValue) => setPassword(newValue.target.value)} sx={{width: '100%'}} label={'Please enter your Password'} id="Password" margin="normal" />
            Confirm Password: <TextField onChange={(newValue) => setConfirmPassword(newValue.target.value)} sx={{width: '100%'}} label={'Please enter your Confirm Password'} id="ConfirmPassword" margin="normal" />
            Role: <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            label="Age"
            onChange={(newValue) => setRole(newValue.target.value)}
            sx={{width: '30vh', marginTop: '10px'}}
            >
            <MenuItem  value={"IT Staff"}>IT Admin</MenuItem>
            </Select>
            <Button onClick={e => handleSumbit(e)} variant="contained" color="success" sx={{marginTop: '15px', display: 'flex', justifyContent: 'center'}}>
                Submit
            </Button>
            <ToastContainer />
            </FormControl>
            </Box>
            </Box>
            
        </>
    )
}

export default Register;

