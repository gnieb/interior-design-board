import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as yup from "yup"
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import photo7 from "././styles/photo7.avif"

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

export default function Login({setDesigns, showSignup, handleSwitchView}) {

    const { setDesigner} = useContext(UserContext)
    const history = useHistory()
    const [noMatch, setNoMatch] = useState(false)
    const formSchema = yup.object().shape({
        username: yup.string().required("Username required"),
        password: yup.string().required("Password required")
    })

    const handleResponse = (r) => {
            if (r.ok) {
            console.log("STATUS:", r.status)
            r.json().then(r => {
                setDesigner(r)
                console.log(r)
                history.push('/')
            })
            } else {
            console.log("STATUS:", r.status)
            setNoMatch(true)
            setTimeout(() => {
                setNoMatch(false)
            }, 7000)
            }
        }

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema:formSchema,
        onSubmit: (values) => {
            fetch("/login", {
                credentials: "include",
                method: "POST",
                headers: {"Content-Type": "application/json"},
                
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
                    backgroundImage: `url(${photo7})`,
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
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type = 'text' name="username" value={formik.values.username} onChange={formik.handleChange}/>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type = 'password' name="password" value={formik.values.password} onChange={formik.handleChange}/>
                        <Button type = 'submit'>Log In</Button>
                        {noMatch ? 
                        <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        <strong>Username and password do not match</strong>
                        </Alert>: <></>}
                    </Form>
                    <Button onClick={handleSwitchView}>{ showSignup ? "Already Have an Account?" :"Don't Have an Account?"}</Button>
                    <Copyright sx={{ mt: 5 }} />
                </Box>
            </Grid>
        </Grid>
        </ThemeProvider>

    ) 
}