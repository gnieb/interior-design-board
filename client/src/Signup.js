import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/user";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as yup from "yup"

export default function Signup() {
    const { setDesigner} = useContext(UserContext)
    const history = useHistory()

// add a confirm password input???
    const formSchema = yup.object().shape({
        name: yup.string().required("Please enter your name"),
        username: yup.string().required("Please choose a username"),
        password: yup.string().required("Please choose a password")
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
            name: "",
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
        <label>Already a Member?</label>
        <NavLink exact to='/login'>Log In</NavLink>
        {Object.values(formik.errors).map(error => <h2  style={{color:'red'}}>{error}</h2>)}
        <form onSubmit= {formik.handleSubmit} >
            <label>Name</label>
            <input type='text' name="name" value={formik.values.name} onChange={formik.handleChange} />
            <label>Username</label>
            <input type = 'text' name="username" value={formik.values.username} onChange={formik.handleChange}/>
            <label>Password</label>
            <input type = 'password' name="password" value={formik.values.password} onChange={formik.handleChange} />
            <button type = 'submit'>Sign Up</button>
        </form>
        </>

    ) 
}