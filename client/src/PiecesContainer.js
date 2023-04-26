import NewPiece from "./NewPiece"
import Piece from "./Piece"
import { useState } from "react"

export default function PiecesContainer ({pieces, addNewPiece, removePiece}) {
    const [openForm, setOpenForm] = useState(false)
    
    const displayPieces = pieces.map(p => {
    return(
    <Piece key={p.id} p={p} removePiece={removePiece}/>
    )
    })

    const handleOpenForm = () => {
        setOpenForm(!openForm)
    }
    
    
    return (
        <>
        <button onClick={handleOpenForm}>{openForm ? "Cancel" : "Add New"}</button>
        {openForm ?
        <NewPiece addNewPiece={addNewPiece} handleOpenForm={handleOpenForm} /> :
        displayPieces
        }
        </>
    )
}