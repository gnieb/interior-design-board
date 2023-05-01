
import { UserContext } from "./context/user"
import { useContext } from "react"
import Home from "./Home"
import SignupOrLogin from "./SignupOrLogin"

export default function LandingPage () {
    const {designer} = useContext(UserContext)

    return (
        <>
        {designer ?
        <Home /> :
        <SignupOrLogin />
        }
        </>
    )
}