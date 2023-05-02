import React, {useState, useContext, useEffect} from "react"
import { UserContext } from "./context/user";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import addtocollection from "././styles/addtocollection.png"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function Moodboard ({ addNewPiece, d, handleAssociatedPD, showAssocPD}) {
    const [showModal, setShowModal] = useState(false)
    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)
    const {designer} = useContext(UserContext)

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
            [e.target.name] : e.target.value
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
        fetch("/pieces", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(newPiece)
        })
        .then(r => {
            if (r.ok) {
                r.json().then((r) => {
                    console.log(r)
                    createPDInstance(r)
                    setFormData({
                        name: "",
                        type: "",
                        style: "",
                        image: "",
                        color: "",
                    })
                    handleClose()
                })
            } else {
                r.json().then(console.log)
            }
        })
    }

    const createPDInstance = (r) => {
        fetch("/pdinstances", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                piece_id: r.id,
                design_id: d.id
            })
        })
        .then(r => {
            if (r.ok) {
                r.json().then( r => {
                    console.log(r)
                    handleAssociatedPD(r)
                    // addNewPiece(r.piece)
                })
            } else {
                r.json().then(console.log)
            }
        })
    }



    return (
        <> 
        {showAssocPD ?
            <div style={{padding: '50px'}}  >
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                    >
                    <Masonry gutter="20px" >
                        {showAssocPD.map((pd, i) => (
                            <img
                                key={i}
                                src={pd.piece.image}
                                style={{width: "100%", display: "block", cursor: "pointer"}}
                                alt={pd.piece.name}
                            />
                        ))}
                        <img 
                        src={addtocollection}
                        onClick={handleShow} 
                        style={{ display: "block", cursor: "pointer"}}
                        alt="add to collection"
                        />
                    </Masonry>
                </ResponsiveMasonry>
            </div> :
            <img 
            src={addtocollection}
            onClick={handleShow} 
            style={{ display: "block", cursor: "pointer"}}
            alt="add to collection"
            /> }

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>ADD A PIECE TO DESIGN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Piece Name</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange}/>
                        <Form.Label>Element Type</Form.Label>
                        <Form.Select name="type" onChange={handleChange} >
                            <option value="">Select Type</option>
                            <option value="Accessory">Accessory</option>
                            <option value="Flooring">Flooring</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Lighting">Lighting</option>
                            <option value="Misc">MISC</option>
                            <option value="Texture" >Texture</option>
                        </Form.Select>
                        <Form.Label>Interior Design Style</Form.Label>
                        <Form.Select name="style" onChange={handleChange} >
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
                        <Form.Select name="color" onChange={handleChange} >
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
                        <Form.Control placeholder="image url..." type="text" name="image" value={formData.image} onChange={handleChange}/>
                        <br />
                        <Button type="submit">Add to Collection</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}