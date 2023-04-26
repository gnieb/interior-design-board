import Piece from "./Piece"

export default function PiecesContainer ({pieces}) {
    
    const displayPieces = pieces.map(p => {
    return(
    <Piece key={p.id} p={p}/>
    )
    })
    
    
    return (
        <div>
            {displayPieces}
        </div>
    )
}