import React from 'react';
import "./Login.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from "formik";
import * as yup from "yup";

function Login() {
    // const formValidationSchema = yup.object({
    //     email: yup.string().required(),
    //     password: yup.string().min(8).required()
    // })
    const validateForm = (values) => {
        const errors = {};
        console.log("validate form", values);
        // if (values.email.length < 3) {
        //     errors.email = "Please provide correct email"
        // } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/i.test(values.email)) {
        //     errors.email = "Invalid email address"
        // }
        if (values.username.length < 3) {
            errors.username = "Invalid username"
        }

        if (values.password.length < 8) {
            errors.password = "Invalid password"
        }
        return errors;
    }


    const { handleBlur, handleChange, handleSubmit, values, touched, errors } = useFormik({
        initialValues: { email: '', password: '' },
        validate: validateForm,
        onSubmit: (values) => {
            console.log("onsubmit", values)
        }

    });
    return (
        <div class="wrapper">
            <div class="logo"> <img src="https://www.centrahubcrm.com/CentraHub_Favicon.png" alt="" /> </div>
            <div class="text-center mt-4 name"> CRM </div>
            <form onSubmit={handleSubmit}>
                <Box sx={{ '& .MuiTextField-root': { m: 1, width: '34ch', maxWidth: '90%' }, }}>
                    <div >
                        <TextField type="text" id="username" name="username" label="Username" variant="standard" value={values.username} onChange={handleChange} onBlur={handleBlur} />
                        {errors.username && touched.username && errors.username}
                        <TextField type="password" id="password" name="password" label="Password" variant="standard" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                        {errors.password && touched.password && errors.password}
                        <button type="submit" class="btn mt-3">Login</button>
                    </div>
                </Box>
            </form>
            <div class="text-center mt-2"> <a href="#">Forgot password?</a></div>
            <div class="text-center mt-2"> <a class="sign-up" href="#">Sign Up </a></div>
        </div>
    )
}

export default Login
