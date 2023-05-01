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

//pieces refers to ALL pieces in library
//associatedPieces refers to the pieces that belong in this design so far. 

export default function DesignDisplay ({d, pieces, removeDesign, addNewPiece}) {
    const assocPieces = d.pieces
    const [showModal, setShowModal] = useState(false)
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

    return (
        <>
        <button onClick={handleShow} >Delete this Design</button>
        {/* <DesignCanvas d={d} pieces={pieces} /> */}
        <h2>{d.name}</h2>
        <Moodboard assocPieces={assocPieces} addNewPiece={addNewPiece}/>
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
        </>
    )
} 
