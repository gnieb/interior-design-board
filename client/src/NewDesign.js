import React, {useState} from "react";
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function NewDesign ({designs, handleNewD}) {

    const new_design = {
        name: "",
        designer_id: "",
    }

    const [formData, setFormData] = useState(new_design)
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const newD = {
            name: formData.name,
        }
        fetch("/designs", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newD)
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(r => {
                        handleNewD(r)
                    })
                }
            })

        setFormData({
            name: "",
        })
    }

    return (
        <>
        <Grid container alignItems={'center'} sx={{padding:'15px'}}>
        <Box  sx={{background:'rgba(255,255,255,.6)', padding:'40px 80px'}}>
        <Form  onSubmit={handleSubmit}>
            <Form.Label><strong>NEW DESIGN</strong></Form.Label>
            <Form.Control placeholder="Great name here..." type="text" name="name" value={formData.name} onChange={handleChange}/>
            <Button type="submit" variant="contained" color="success"><strong>Create</strong></Button>
        </Form>
        </Box>
        </Grid>
        </>
    )
}


