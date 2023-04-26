import NewPiece from "./NewPiece"
import Piece from "./Piece"
import { useState } from "react"

export default function PiecesContainer ({pieces}) {
    const [openForm, setOpenForm] = useState(false)
    
    const displayPieces = pieces.map(p => {
    return(
    <Piece key={p.id} p={p}/>
    )
    })

    const handleOpenForm = () => {
        setOpenForm(!openForm)
    }
    
    
    return (
        <>
        <button onClick={handleOpenForm}>{openForm ? "Cancel" : "Add New"}</button>
        {openForm ?
        <NewPiece /> :
        displayPieces
        }
        </>
    )
}