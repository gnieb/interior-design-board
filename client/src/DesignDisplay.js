import Moodboard from "./Moodboard"
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import DesignEdit from "./DesignEdit";
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

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
    const example= [[56, 58, 53],[108, 59, 57],[181, 181, 165],[196, 200, 173], [154, 156, 158]]
    const [randomPalette, setRandomPalette] = useState(example)
    const [color1, setColor1] = useState(randomPalette[0])
    const [color2, setColor2] = useState(randomPalette[1])
    const [color3, setColor3] = useState(randomPalette[2])
    const [color4, setColor4] = useState(randomPalette[3])
    const [color5, setColor5] = useState(randomPalette[4])

    const setIndividualColors = (palette) => {
        setColor1(palette[0])
        setColor2(palette[1])
        setColor3(palette[2])
        setColor4(palette[3])
        setColor5(palette[4])
    }
   
    console.log(color1)

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

    const generateRandomPalette = () => {
        fetch('/randpalette')
            .then(r => {
                if (r.ok) {
                    r.json().then(r => {
                        setRandomPalette(r.result)
                        setIndividualColors(r.result)
                    })
                } else {
                    r.json().then(console.log)
                }
            })
    }


    console.log(randomPalette)
    const toHex = (color) => {
           const hex = color.toString(16)
           return hex.length == 1 ? "0" + hex : hex
        }
    const rgbToHex = (array) => `#${toHex(array[0])}${toHex(array[1])}${toHex(array[2])}`
    
    const handleSavePalette = () => {
        console.log("SAVINGGGGGG")
    }
    
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
        <Container>
        <Box 
                sx={{
                    width: 200,
                    height: 200,
                    backgroundColor: rgbToHex(color1),
                    '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                    },
                }}
            />
            <Box 
                sx={{
                    width: 200,
                    height: 200,
                    backgroundColor: rgbToHex(color2),
                    '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                    },
                }}
            />
            <Box
                sx={{
                    width: 200,
                    height: 200,
                    backgroundColor: rgbToHex(color3),
                    '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                    },
                }}
            />
            <Box 
                sx={{
                    width: 200,
                    height: 200,
                    backgroundColor: rgbToHex(color4),
                    '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                    },
                }}
            />
            <Box
                sx={{
                    width: 200,
                    height: 200,
                    backgroundColor: rgbToHex(color5),
                    '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                    },
                }}
            />
            <IconButton
                sx={{ color: "gray" }}
                // aria-label={`Remove ${item.piece.name}`}
                // onClick={()=> handleDelete(item) }
              >
               <InfoIcon/>
              </IconButton>
            <p>How to use the palettes: click the generate button to see new palette suggestions. Only click the save button if you'd like to replace your old palette.</p>
            <Button onClick={generateRandomPalette}>Generate Random Palette</Button>
            <Button onClick={handleSavePalette}>Save Palette</Button>
        </Container>


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
