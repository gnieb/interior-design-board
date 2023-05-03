import { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as yup from "yup"
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

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
        <>
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
        </>
    )   
}
