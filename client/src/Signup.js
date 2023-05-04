import { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as yup from "yup"
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" >
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


export default function Signup() {
    const { setDesigner} = useContext(UserContext)
    const history = useHistory()
    const [notUnique, setNotUnique] = useState(false)


// add a confirm password input???
    const formSchema = yup.object().shape({
        first_name: yup.string().required("Enter first name"),
        last_name: yup.string().required("Enter last name"),
        email: yup.string().email("Invalid Email"),
        username: yup.string().required("Choose a username"),
        password: yup.string().min(8, "Password must be greater than 7 characters").required("Password must be greater than 7 characters")
    })

    const handleResponse = (r) => {
    if (r.ok) {
      console.log("STATUS:", r.status)
      r.json().then(r=> {
        setDesigner(r)
        history.push('/')
      })
    } else {
      console.log("STATUS:", r.status, )
      setNotUnique(true)
      setTimeout(() => {
        setNotUnique(false)
      }, 7000)
    }
  }

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name:"",
            email: "",
            username: "",
            password: ""
        },
        validationSchema:formSchema,
        onSubmit: (values) => {
            fetch("/designers", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(values)
            })
                .then(handleResponse)
        }
    })

    return (
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1680632914285-0bc6110e475c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
          <p>Required fields *</p>
        <Form onSubmit= {formik.handleSubmit} >
            <Form.Label>First Name *</Form.Label>
            <Form.Control type='text' name="first_name" value={formik.values.first_name} onChange={formik.handleChange} />
            <p style={{ color: "red" }}> {formik.errors.first_name}</p>
            <Form.Label>Last Name *</Form.Label>
            <Form.Control type='text' name="last_name" value={formik.values.last_name} onChange={formik.handleChange} />
            <p style={{ color: "red" }}> {formik.errors.last_name}</p>
            <Form.Label>Email (optional)</Form.Label>
            <Form.Control type='text' name="email" value={formik.values.email} onChange={formik.handleChange} />
            <p style={{ color: "red" }}> {formik.errors.email}</p>
            <Form.Label>Username *</Form.Label>
            <Form.Control type = 'text' name="username" value={formik.values.username} onChange={formik.handleChange}/>
            <p style={{ color: "red" }}> {formik.errors.username}</p>
           {notUnique ? 
           <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
                {formik.values.username} is already taken — <strong>please choose a different username!</strong>
            </Alert> : <></> }
            <Form.Label>Password *</Form.Label>
            <Form.Control type = 'password' name="password" value={formik.values.password} onChange={formik.handleChange}
             />
             <p style={{ color: "red" }}> {formik.errors.password}</p>
            <Button type = 'submit'>Sign Up</Button>
        </Form> 
        <Copyright sx={{ mt: 5 }} />
        </Box>
        </Grid>
        </Grid>
        </ThemeProvider>
    )   
}
