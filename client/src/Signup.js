import { useContext } from "react";
import { UserContext } from "./context/user";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as yup from "yup"
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';

export default function SignUp() {
    const { setDesigner} = useContext(UserContext)
    const history = useHistory()


// add a confirm password input???
    const formSchema = yup.object().shape({
        first_name: yup.string().required("Enter first name"),
        last_name: yup.string().required("Enter last name"),
        email: yup.string().email(),
        username: yup.string().required("Choose a username"),
        password: yup.string().required("Choose a password")
    })

    const handleResponse = (r) => {
    if (r.ok) {
      console.log("STATUS:", r.status)
      r.json().then(r=> {
        setDesigner(r)
        history.push('/')
      })
    } else {
      console.log("STATUS:", r.status)
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
        {Object.values(formik.errors).map((error, i) => <h2 key={i} style={{color:'red'}}>{error}</h2>)}
        <Form onSubmit= {formik.handleSubmit} >
            <Form.Label>First Name</Form.Label>
            <Form.Control type='text' name="first_name" value={formik.values.first_name} onChange={formik.handleChange} />
            <Form.Label>Last Name</Form.Label>
            <Form.Control type='text' name="last_name" value={formik.values.last_name} onChange={formik.handleChange} />
            <Form.Label>Email (optional)</Form.Label>
            <Form.Control type='text' name="email" value={formik.values.email} onChange={formik.handleChange} />
            <Form.Label>Username</Form.Label>
            <Form.Control type = 'text' name="username" value={formik.values.username} onChange={formik.handleChange}/>
            <Form.Label>Password</Form.Label>
            <Form.Control type = 'password' name="password" value={formik.values.password} onChange={formik.handleChange} />
            <Button type = 'submit'>Sign Up</Button>
        </Form> 
        </>
    )   
}
