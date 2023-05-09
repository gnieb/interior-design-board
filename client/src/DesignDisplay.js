import Moodboard from "./Moodboard"
import ColorPalette from "./ColorPalette";
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import DesignEdit from "./DesignEdit";
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import Form from 'react-bootstrap/Form';
import Box from '@mui/material/Box';


export default function DesignDisplay ({ handleRename, piecesLibrary, setPiecesLibrary, d, removeDesign, addNewPiece}) {
    const [showModal, setShowModal] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)
    const [showAssocPD, setShowAssocPD] = useState([])
    const [showRename, setShowRename] = useState(false)
    const [rename, setRename] = useState('')
    
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

    const handleRenameChange = (e) => {
        setRename(e.target.value)
    }

    const handleRenameSubmit = (e) => {
        e.preventDefault()
        const updatedD = {
            name: rename
        }
        fetch(`/designs/${d.id}`, {
            method: "PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(updatedD)
        })
            .then((r) => {
                if(r.ok) {
                    r.json().then(r => {
                    handleRename(r)
                    setShowRename(false)
                    })
                } else {
                    console.log(r)
                }
            }) 
    }

    const handleEdit = () => setEditMode(!editMode)

    return (
        <div id="designDisplay">
        <h1 id="mainName">{d.name.toUpperCase()}</h1>
        
        <Button onClick={handleEdit}>{editMode ? "Back to View" :"Edit design"}</Button>
        
        {editMode ?
        <>
        <Button startIcon={<EditIcon/>} onClick={() => setShowRename(true)}>Rename</Button>
        <Button onClick={handleShow} color="error" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      {showRename ? 
      <Box 
      sx={{
          my: 4,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
        //   padding: "20px 0",
          }}>
      <Form onSubmit={handleRenameSubmit}>
        <Form.Label>Rename</Form.Label>
        <Form.Control type="text" name="rename" value={rename} onChange={handleRenameChange}/>
        <Button type="submit">SAVE</Button>
      </Form></Box>: <></>}
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
        </div> 
    )
} 
