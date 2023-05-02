import NewPiece from "./NewPiece"
import Piece from "./Piece"
import { useState, useEffect } from "react"
import FilterBy from "./FilterBy"

export default function PiecesContainer () {
    const [openForm, setOpenForm] = useState(false)
    const [pieces, setPieces] = useState([])
    const [styleFilter, setStyleFilter] = useState("")
    const [typeFilter, setTypeFilter] = useState("")

    useEffect(() => {
        fetch("/check_session")
            .then((r) => {
                if (r.ok) {
                    r.json().then(r => {
                      setPieces(r.pieces)
                      })
                   
                } else {
                      console.log("STATUS:", r.status)
                    }
            })
      }, [])


    const addNewPiece = (piece) => setPieces([...pieces, piece])

    const handleStyleFilter = (value) => setStyleFilter(value)
    const filteredByStyle = (styleFilter !== "") ? pieces.filter((p) => p.style === styleFilter) : [...pieces]
    // console.log("FILTER BY STYLE:", filteredByStyle)
    const handleTFilter = (value) => setTypeFilter(value)
    const filteredByStyleAndType = (typeFilter !=="") ? filteredByStyle.filter((p) => p.type ===typeFilter) : [...filteredByStyle]
    // console.log("FILTER BY STYLE AND TYPE:", filteredByStyleAndType)
    

    const removePiece = (piece) => {
        const updatedPieces = pieces.filter((p) => p.id !== piece.id)
        setPieces(updatedPieces)
      }
    
    const displayPieces = filteredByStyleAndType.map(p => {
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