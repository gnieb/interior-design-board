// import DragandDrop from "./DragandDrop"
// this component will have :
// Canvas
// pieces images
// list of pieces
// form to add another piece? - either from collection or new - upload or from the internet

import Moodboard from "./Moodboard"
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DesignEdit from "./DesignEdit";

//associatedPieces refers to the pieces that belong in this design so far. 

export default function DesignDisplay ({d, removeDesign, addNewPiece}) {
    const [showModal, setShowModal] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)
    const handleCloseAndDelete = (e) => {
        fetch(`/designs/${d.id}`, {
            method: "DELETE"
        })
        .then( r => {
            if (r.ok) {
              removeDesign(d)
              console.log(r.status)  
            } else {
                console.log(r.status)
            }
        })
    }

    const handleEdit = () => setEditMode(!editMode)

    return (
        <>
        <Button onClick={handleEdit}>Edit design</Button>
        <Button onClick={handleShow} >Delete Design</Button>
        {/* <DesignCanvas d={d} pieces={pieces} /> */}
        <h2>{d.name}</h2>
        {editMode ?
        <DesignEdit /> :
       <>
        <Moodboard addNewPiece={addNewPiece} d={d}/>
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>DELETE DESIGN</Modal.Title>
            </Modal.Header>
            <Modal.Body>ARE YOU SURE YOU WANT TO DELETE THIS DESIGN?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    I CHANGED MY MIND
                </Button>
                <Button variant="danger" onClick={handleCloseAndDelete}>
                    I'M SURE
                </Button>
            </Modal.Footer>
        </Modal>
        </> }
       
        </> 
    )
} 
