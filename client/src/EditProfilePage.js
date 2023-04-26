import { UserContext } from "./context/user"
import { useContext, useState } from "react"

export default function EditProfilePage ({handleEditMode}) {
    const {designer, setDesigner} = useContext(UserContext)
    // const [newFirst, setNewFirst] = useState('')
    // const [newLast, setNewLast] = useState('')
    // const [newEmail, setNewEmail] = useState('')

    const des = {
        first_name: designer.first_name,
        last_name: designer.last_name,
        email: designer.email,
        city: designer.city
    }

    const [formData, setFormData] = useState(des)

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedDes = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            city: formData.city
        }
        
        fetch(`/designers/${designer.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedDes)
        })
        .then(r => {
            if (r.ok) {
                r.json().then((r) => {
                    setDesigner(r)
                    handleEditMode()
                })
            }
        })
    }

   

    return (
        <>
        <h1>This will be form shit</h1>
        <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input type="text" id="first_name" value={formData.first_name} onChange={handleChange} ></input>
        <label>Last Name</label>
        <input type="text" id="last_name" value={formData.last_name} onChange={handleChange} ></input>
        <label>Email</label>
        <input type="text" id="email" value={formData.email} onChange={handleChange} ></input>
        <label>Location</label>
        <input type="text" id="city" value={formData.city} onChange={handleChange} ></input>
        <br />
        <button type="submit" >Save Changes</button>
        </form>
        <button onClick={handleEditMode} >Cancel</button>
        </>
    )
}