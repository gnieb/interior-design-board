import Moodboard from "./Moodboard"
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import DesignEdit from "./DesignEdit";
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';

export default function DesignDisplay ({ piecesLibrary, setPiecesLibrary, d, removeDesign, addNewPiece}) {
    const [showModal, setShowModal] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)
    const [showAssocPD, setShowAssocPD] = useState([])
    const [randomPalette, setRandomPalette] = useState([])
    const handleAssociatedPD = (p) => setShowAssocPD([...showAssocPD, p])
    
    const handleRemovePiece = (pObj) => {
        const updatedPieces = showAssocPD.filter(pd => pd !== pObj )
        setShowAssocPD(updatedPieces)
    }


    useEffect(() => {
        fetch(`/designs/${d.id}`)
            .then(r => {
                if (r.ok) {
                    r.json().then( r => {
                        setShowAssocPD(r.pdinstances)
                    })
                }
            })
    }, [])

    
    useEffect(() =>{
        fetch('/randpalette')
        .then(r => {
            if (r.ok) {
                r.json().then(r => {
                    console.log(r.result)
                    setRandomPalette(r.result)
                })
            } else {
                r.json().then(console.log)
            }
        })
            
    }, [])
         console.log(randomPalette)

        const toHex = (color) => {
           const hex = color.toString(16)
           return hex.length == 1 ? "0" + hex : hex
        }

        
        const rgbToHex = (array) => `#${toHex(array[0])}${toHex(array[1])}${toHex(array[2])}`
        
        // TEST
        // console.log(rgbToHex([255, 51, 255]))
        
          const displayColors = randomPalette.map(colorArray => {
            rgbToHex(colorArray)
        })
    
    
    
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
        <h2>{d.name}</h2>
        <Button onClick={handleEdit}>{editMode ? "View Moodboard" :"Edit design"}</Button>
        
        {editMode ?
        <>
        <Button onClick={handleShow} variant="outlined" color="error" startIcon={<DeleteIcon />}>
        Delete
      </Button>
        <DesignEdit handleAssociatedPD={handleAssociatedPD}
        showAssocPD={showAssocPD}
         handleRemovePiece={handleRemovePiece}/> 
         <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>DELETE {d.name.toUpperCase()}</Modal.Title>
            </Modal.Header>
            <Modal.Body>ARE YOU SURE YOU WANT TO DELETE THIS DESIGN?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    I CHANGED MY MIND
                </Button>
                
                <Button onClick={handleCloseAndDelete} variant="outlined" color="error" startIcon={<DeleteIcon />}>
                I'm Sure
                </Button>
            </Modal.Footer>
            </Modal>
         </> :
       <>

        



        <Moodboard 
        addNewPiece={addNewPiece} 
        d={d} 
        handleAssociatedPD={handleAssociatedPD} 
        showAssocPD={showAssocPD}
        setPiecesLibrary={setPiecesLibrary}
        piecesLibrary={piecesLibrary}/>
        </> }
        </> 
    )
} 
