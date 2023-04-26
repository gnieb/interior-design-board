import EditProfilePage from "./EditProfilePage"
import { UserContext } from "./context/user"
import { useContext, useState } from "react"


export default function ProfilePage () {
    const {designer} = useContext(UserContext)
    const {first_name, last_name, email, city} = designer
    const [editMode, setEditMode] = useState(false)

   
    const handleClick = (e) => {
        setEditMode(!editMode)
    }


    return (
        <>
        {editMode ?
        <EditProfilePage /> :
       (<>
       <h2>My Profile</h2>
        <h3>First name - {first_name}</h3>
        <h3>Last name - {last_name}</h3>
        <h3>Email - {email}</h3>
        <h3>Location - {city}</h3>
        <button onClick={handleClick}>Edit Designer</button>
        </> )}
        </>
    )
}

// maybe add a change password field if theres time?????