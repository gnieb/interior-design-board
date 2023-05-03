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

export default function Login({setDesigns}) {

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
        <>
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
        </>

    ) 
}