import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function ForgotPassword() {
    return (
        <div class="wrapper">
            <div class="text-center mt-4 name"> FORGOT PASSWORD </div>
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '34ch', maxWidth: '90%' }, }} noValidate autoComplete="off">
                <div >
                    {/* <TextField error id="outlined-error" label="Error" defaultValue="Hello World" />
                    <TextField error id="outlined-error-helper-text" label="Error" defaultValue="Hello World" helperText="Incorrect entry." /> */}
                    <TextField id="standard-basic" label="Email" variant="standard" />
                    <TextField id="standard-basic" label="Username" variant="standard" />
                    <TextField type="password" id="standard-basic" label="New Password" variant="standard" />

                </div>
            </Box>
            <button class="btn mt-3">Proceed/SAVE</button>
        </div>
    )
}

export default ForgotPassword
