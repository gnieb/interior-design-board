import { useState } from "react"
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function NewPiece ({addNewPiece, handleOpenForm}) {

    const newP = {
        name: "",
        type: "",
        style: "",
        image: "",
        color: "",
    }
    const [formData, setFormData] = useState(newP)
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id] : e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const newPiece = {
            name: formData.name,
            type: formData.type,
            style: formData.style,
            image: formData.image,
            color: formData.color,
        }
        console.log(newPiece)
        fetch("/pieces", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(newPiece)
        })
        .then(r => {
            if (r.ok) {
                r.json().then((r) => {
                    console.log(r)
                    addNewPiece(r)
                    setFormData({
                        name: "",
                        type: "",
                        style: "",
                        image: "",
                        color: "",
                    })
                    handleOpenForm()
                })
            } else {
                r.json().then(console.log)
            }
        })
    }

    return (
        <>
        <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            //   padding: '0px 0',
              
            }}
          >
        <Form onSubmit={handleSubmit}>
            <Form.Label>Piece Name</Form.Label>
            <Form.Control type="text" id="name" value={formData.name} onChange={handleChange}/>
            <Form.Label>Element Type</Form.Label>
            <Form.Select id="type" onChange={handleChange} >
                <option value="">Select Type</option>
                <option value="Accessory">Accessory</option>
                <option value="Flooring">Flooring</option>
                <option value="Furniture">Furniture</option>
                <option value="Lighting">Lighting</option>
                <option value="Misc">MISC</option>
                <option value="Texture" >Texture</option>
            </Form.Select>
            <Form.Label>Interior Design Style</Form.Label>
            <Form.Select id="style" onChange={handleChange} >
                <option value="">Select Style</option>
                <option value="Any" >Any</option>
                <option value="Bohemian">Bohemian</option>
                <option value="Contemporary">Contemporary</option>
                <option value="Industrial">Industrial</option>
                <option value="Mid-Century Modern">Mid-Century Modern</option>
                <option value="Minimalist">Minimalist</option>
                <option value="Modern">Modern</option>
                <option value="Modern Farmhouse">Modern Farmhouse</option>
                <option value="Rustic">Rustic</option>
                <option value="Traditional">Traditional</option>
            </Form.Select>
            <Form.Label>Color</Form.Label>
            <Form.Select id="color" onChange={handleChange} >
                <option value="" >Select Color</option>
                <option value="Mulit">Multi</option>
                <option value="White">White</option>
                <option value="Beige">Beige</option>
                <option value="Brown">Brown</option>
                <option value="Black">Black</option>
                <option value="Grey">Grey</option>
                <option value="Green">Green</option>
                <option value="Blue">Blue</option>
                <option value="Red">Red</option>
                <option value="Pink">Pink</option>
                <option value="Purple">Purple</option>
                <option value="Yellow">Yellow</option>
                <option value="Orange">Orange</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Bronze">Bronze</option>
            </Form.Select>
            <Form.Label>Add Image</Form.Label>
            <Form.Control  type="text" id="image" value={formData.image} onChange={handleChange}/>
            <br />
            <Button type="submit" color="success">Add to Collection</Button>
        </Form> 
        </Box>   
        </>
    )
}