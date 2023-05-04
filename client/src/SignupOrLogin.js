import {  useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Signup from "./Signup";
import Login from "./Login";

export default function SignupOrLogin({setDesigns}) {
    const [showSignup, setShowSignUp] = useState(false)
    const handleSwitchView = () => setShowSignUp(!showSignup)

    return (
        <>
        { showSignup ?
        <Signup showSignup={showSignup} handleSwitchView={handleSwitchView}/> :
        <Login setDesigns={setDesigns} showSignup={showSignup} handleSwitchView={handleSwitchView} />
        }
        </>

    ) 
}