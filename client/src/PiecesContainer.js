import NewPiece from "./NewPiece"
import Piece from "./Piece"
import { useState, useEffect } from "react"
import FilterBy from "./FilterBy"

export default function PiecesContainer ({piecesLibrary, setPiecesLibrary}) {
    const [openForm, setOpenForm] = useState(false)
    // const [pieces, setPieces] = useState([])
    const [styleFilter, setStyleFilter] = useState("")
    const [typeFilter, setTypeFilter] = useState("")

    useEffect(() => {
        fetch("/check_session")
            .then((r) => {
                if (r.ok) {
                    r.json().then(r => {
                      setPiecesLibrary(r.pieces)
                      })
                   
                } else {
                      console.log("STATUS:", r.status)
                    }
            })
      }, [])


    const addNewPiece = (piece) => setPiecesLibrary([...piecesLibrary, piece])

    const handleStyleFilter = (value) => setStyleFilter(value)
    const filteredByStyle = (styleFilter !== "") ? piecesLibrary.filter((p) => p.style === styleFilter) : [...piecesLibrary]
    // console.log("FILTER BY STYLE:", filteredByStyle)
    const handleTFilter = (value) => setTypeFilter(value)
    const filteredByStyleAndType = (typeFilter !=="") ? filteredByStyle.filter((p) => p.type ===typeFilter) : [...filteredByStyle]
    // console.log("FILTER BY STYLE AND TYPE:", filteredByStyleAndType)
    

    const removePiece = (piece) => {
        const updatedPieces = piecesLibrary.filter((p) => p.id !== piece.id)
        setPiecesLibrary(updatedPieces)
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