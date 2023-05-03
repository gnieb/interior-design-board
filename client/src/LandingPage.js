
import { UserContext } from "./context/user"
import { useContext } from "react"
import Home from "./Home"
import SignupOrLogin from "./SignupOrLogin"

export default function LandingPage ({setDesigns}) {
    const {designer} = useContext(UserContext)

    return (
        <>
        {designer ?
        <Home /> :
        <SignupOrLogin setDesigns={setDesigns} />
        }
        </>
    )
}