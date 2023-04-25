import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/user";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as yup from "yup"

export default function LandingPageLogin() {

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
                history.push('/home')
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
        <label>Not a Member Yet?</label>
        <NavLink exact to='/'>Sign Up</NavLink>
        <form onSubmit={formik.handleSubmit}>
            <label>Username</label>
            <input type = 'text' name="username" value={formik.values.username} onChange={formik.handleChange}/>
            <label>Password</label>
            <input type = 'password' name="password" value={formik.values.password} onChange={formik.handleChange}/>
            <button type = 'submit'>Log In</button>
        </form>
        </>

    ) 
}