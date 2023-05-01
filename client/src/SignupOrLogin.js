import { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from "react-bootstrap/esm/Button";
import SignUp from "./SignUp";
import Login from "./Login";

export default function SignupOrLogin() {
    const { setDesigner} = useContext(UserContext)
    const history = useHistory()
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