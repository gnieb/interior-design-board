import { UserContext } from "./context/user"
import { useContext } from "react"


export default function ProfilePage () {
    const {designer, setDesigner} = useContext(UserContext)

    console.log(designer)
    return (
        <>
        <h2>My Profile</h2>
        
        </>
    )
}