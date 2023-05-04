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

    const [color1, setColor1] = useState(d.color1 ? d.color1 : "#EEEEEE" )
    const [color2, setColor2] = useState(d.color2 ? d.color2 : "#CCCCCC")
    const [color3, setColor3] = useState(d.color3 ? d.color3 : "#999999")
    const [color4, setColor4] = useState(d.color4 ? d.color4 : "#666666")
    const [color5, setColor5] = useState(d.color5 ? d.color5 : "#333333")

    /////////////////////// 2 separate things://////////
    //1. randome geneator: coming from color palette API: comes in an array of 5 arrays
    // => translate that into rbgtoHex colors and distribute them to the boxes. 

    //2. saving to the database and setting randompalette though... that will be strings. why not just store these as hex string??

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
                        setIndividualColors(r.result)
                    })
                } else {
                    r.json().then(console.log)
                }
            })
    }


    
    const toHex = (color) => {
           const hex = color.toString(16)
           return hex.length == 1 ? "0" + hex : hex
        }
    const rgbToHex = (array) => `#${toHex(array[0])}${toHex(array[1])}${toHex(array[2])}`
    
    const setIndividualColors = (palette) => {
        setColor1(rgbToHex(palette[0]))
        setColor2(rgbToHex(palette[1]))
        setColor3(rgbToHex(palette[2]))
        setColor4(rgbToHex(palette[3]))
        setColor5(rgbToHex(palette[4]))
    }
    

    const handleSavePalette = () => {
        console.log("SAVINGGGGGG")
        const newPal = {
            color1:color1,
            color2:color2,
            color3:color3,
            color4:color4,
            color5:color5
        }
        fetch(`/designs/${d.id}`, {
            method: "PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(newPal)
        })
        .then(r=> {
            if(r.ok) {
                console.log(r)
                setIndividualColors(newPal)
            }
        })
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
                    backgroundColor: color1,
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
                    backgroundColor: color2,
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
                    backgroundColor: color3,
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
                    backgroundColor: color4,
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
                    backgroundColor: color5,
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
