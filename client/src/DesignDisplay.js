import Moodboard from "./Moodboard"
import ColorPalette from "./ColorPalette";
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import DesignEdit from "./DesignEdit";
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';


export default function DesignDisplay ({ piecesLibrary, setPiecesLibrary, d, removeDesign, addNewPiece}) {
    const [showModal, setShowModal] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)
    const [showAssocPD, setShowAssocPD] = useState([])
    
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
        <div>
            <Grid container component="main">
        <h1 id="mainName">{d.name.toUpperCase()}</h1>
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
        <Grid container > 
            <Grid item xs={4}>
                <ColorPalette d={d} />
            </Grid>
            <Grid item xs={8}>
                <Moodboard 
                addNewPiece={addNewPiece} 
                d={d} 
                handleAssociatedPD={handleAssociatedPD} 
                showAssocPD={showAssocPD}
                setPiecesLibrary={setPiecesLibrary}
                piecesLibrary={piecesLibrary}/>
            </Grid>
        </Grid>   
        </> 
        }
        </Grid>
        </div> 
    )
} 
