import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/user";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as yup from "yup"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";

export default function Login() {

    const { setDesigner} = useContext(UserContext)
    const history = useHistory()

    const formSchema = yup.object().shape({
        username: yup.string().required("Please choose a username"),
        password: yup.string().required("Please choose a password")
    })

    const handleResponse = (r) => {
            if (r.ok) {
            console.log("STATUS:", r.status)
            r.json().then(r => {
                setDesigner(r)
                history.push('/')
            })
            } else {
            console.log("STATUS:", r.status)
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
        <label>Don't have an account?</label>
        <NavLink exact to='/'>Create Account</NavLink>
        <Form onSubmit={formik.handleSubmit}>
            <Form.Label>Username</Form.Label>
            <Form.Control type = 'text' name="username" value={formik.values.username} onChange={formik.handleChange}/>
            <Form.Label>Password</Form.Label>
            <Form.Control type = 'password' name="password" value={formik.values.password} onChange={formik.handleChange}/>
            <Button type = 'submit'>Log In</Button>
        </Form>
        </>

    ) 
}