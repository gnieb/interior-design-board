import { UserContext } from "./context/user"
import { useContext, useState } from "react"
import Menu from "./Menu"
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function UpdateProfilePage ({handleEditMode}) {
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
        <div id="update">
        <Menu />
        <Grid container component="main" >
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} 
            sx={{
                margin:'10px'
            }}>
                <Box 
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', 
                    padding: "20px 0",
                    }}>
                <Form onSubmit={handleSubmit}>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" id="first_name" value={formData.first_name} onChange={handleChange} />
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" id="last_name" value={formData.last_name} onChange={handleChange} />
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" id="email" value={formData.email} onChange={handleChange} />
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" id="city" value={formData.city} onChange={handleChange} />
                <br />
                <Button type="submit" >Save Changes</Button>
                </Form>
                <Button onClick={handleEditMode} >Cancel</Button>
                </Box>
            </Grid>
        </Grid>
        </div>
    )
}