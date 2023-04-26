import { UserContext } from "./context/user"
import { useContext, useState } from "react"

export default function EditProfilePage ({handleEditMode}) {
    const {designer, setDesigner} = useContext(UserContext)

    const handleSubmit = () => {

    }

    return (
        <>
        <h1>This will be form shit</h1>
        <form onSubmit={handleSubmit}>
        <label></label>
        <input></input>

        </form>
        <button onClick={handleEditMode} >Cancel</button>
        </>
    )
}