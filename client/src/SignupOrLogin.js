import {  useState } from "react";
import Button from "react-bootstrap/esm/Button";
import SignUp from "./SignUp";
import Login from "./Login";

export default function SignupOrLogin() {
    const [showSignup, setShowSignUp] = useState(false)
    const handleSwitchView = () => setShowSignUp(!showSignup)

    return (
        <>
        <Button onClick={handleSwitchView}>{ showSignup ? "Log In" :"Become a Member"}</Button>
        { showSignup ?
        <SignUp /> :
        <Login />
        }
        </>

    ) 
}