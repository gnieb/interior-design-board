import React, {useState} from "react"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import addtocollection from "././styles/addtocollection.png"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


export default function Moodboard ({assocPieces}) {
    const [showModal, setShowModal] = useState(false)
    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)
    const handleSubmit = () => {
        console.log("form submitted!!!")
        handleClose()
    }


    return (
        <> 
        {assocPieces ?
            <div style={{padding: '10px'}}  >
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                    >
                    <Masonry gutter="20px" >
                        {assocPieces.map((piece, i) => (
                            <img
                                key={i}
                                src={piece.image}
                                style={{width: "100%", display: "block", cursor: "pointer"}}
                                alt="piece.name"
                            />
                        ))}
                        <img 
                        src={addtocollection}
                        onClick={handleShow} 
                        style={{ display: "block", cursor: "pointer"}}
                        />
                    </Masonry>
                </ResponsiveMasonry>
            </div> :
            <img 
            src={addtocollection}
            onClick={handleShow} 
            style={{ display: "block", cursor: "pointer"}}
            /> }

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>ADD A PIECE TO DESIGN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    THE FORM WILL GO HERE
                    <form>
                        <label></label>
                        <input type="text" />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>



        </>
        
    )
}