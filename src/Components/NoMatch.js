import React from "react";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function NoMatch() {
    const history = useHistory()
    setTimeout(() => {
        history.push('/')
    }, 1000)
    return (
        <>


            <Box sx={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontSize: '70vh' }}>
                <Box sx={{ fontSize: '30vh' }}>
                    404
                </Box>

            </Box>
            <Typography sx={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontSize: '10vh' }}>
                No Match Found
            </Typography>


        </>
    )
}

export default NoMatch;