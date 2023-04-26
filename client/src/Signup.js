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
        <label>Already a Member?</label>
        <NavLink exact to='/login'>Log In</NavLink>
        {Object.values(formik.errors).map((error, i) => <h2 key={i} style={{color:'red'}}>{error}</h2>)}
        <form onSubmit= {formik.handleSubmit} >
            <label>First Name</label>
            <input type='text' name="first_name" value={formik.values.first_name} onChange={formik.handleChange} />
            <label>Last Name</label>
            <input type='text' name="last_name" value={formik.values.last_name} onChange={formik.handleChange} />
            <label>Email (optional)</label>
            <input type='text' name="email" value={formik.values.email} onChange={formik.handleChange} />
            <label>Username</label>
            <input type = 'text' name="username" value={formik.values.username} onChange={formik.handleChange}/>
            <label>Password</label>
            <input type = 'password' name="password" value={formik.values.password} onChange={formik.handleChange} />
            <button type = 'submit'>Sign Up</button>
        </form>
        </>

    ) 
}