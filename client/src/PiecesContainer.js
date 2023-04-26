import NewPiece from "./NewPiece"
import Piece from "./Piece"
import { useState } from "react"
import FilterBy from "./FilterBy"

export default function PiecesContainer ({pieces, addNewPiece, removePiece, handleStyleFilter, handleTFilter}) {
    const [openForm, setOpenForm] = useState(false)
    
    const displayPieces = pieces.map(p => {
    return(
    <Piece key={p.id} p={p} removePiece={removePiece}/>
    )
    })

    const handleOpenForm = () => setOpenForm(!openForm)


    return (
        <>
        <button onClick={handleOpenForm}>{openForm ? "Cancel" : "Add New"}</button>
        {openForm ?
        <NewPiece addNewPiece={addNewPiece} handleOpenForm={handleOpenForm} /> :
        (<>
        <FilterBy handleStyleFilter={handleStyleFilter} handleTFilter={handleTFilter} />
        {displayPieces}
        </>)}
        </>
    )
}