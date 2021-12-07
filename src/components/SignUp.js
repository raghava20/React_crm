import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function SignUp() {
    return (
        <div class="wrapper">
            <div class="text-center mt-4 name"> SIGN UP </div>
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '34ch', maxWidth: '90%' }, }} noValidate autoComplete="off">
                <div >
                    {/* <TextField error id="outlined-error" label="Error" defaultValue="Hello World" />
                    <TextField error id="outlined-error-helper-text" label="Error" defaultValue="Hello World" helperText="Incorrect entry." /> */}
                    <TextField type="text" id="standard-basic" label="Username" variant="standard" />
                    <TextField type="password" id="standard-basic" label="Password" variant="standard" />
                    <TextField type="email" id="standard-basic" label="Email" variant="standard" />
                    <TextField type="number" id="standard-basic" label="Contact No" variant="standard" />
                    <FormControl sx={{ m: 1, minWidth: 120 }} >
                        <InputLabel id="select-label">Level</InputLabel>
                        <Select
                            labelId="select-label"
                            id="users"
                            label="Level"
                        >
                            <MenuItem value={10}>Admin</MenuItem>
                            <MenuItem value={20} >Manager</MenuItem>
                            <MenuItem value={30}>Employee</MenuItem>
                            <MenuItem value={40}>Visitor</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </Box>
            <button class="btn mt-3">SIGN UP</button>
        </div>
    )
}

export default SignUp
