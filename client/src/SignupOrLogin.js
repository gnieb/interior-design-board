import {  useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Signup from "./Signup";
import Login from "./Login";

export default function SignupOrLogin({setDesigns}) {
    const [showSignup, setShowSignUp] = useState(false)
    const handleSwitchView = () => setShowSignUp(!showSignup)

    return (
        <>
        <Button onClick={handleSwitchView}>{ showSignup ? "Log In" :"Become a Member"}</Button>
        { showSignup ?
        <Signup /> :
        <Login setDesigns={setDesigns} />
        }
        </>

    ) 
}