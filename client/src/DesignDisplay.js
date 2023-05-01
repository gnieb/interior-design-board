// import DragandDrop from "./DragandDrop"
// this component will have :
// Canvas
// pieces images
// list of pieces
// form to add another piece? - either from collection or new - upload or from the internet

import Moodboard from "./Moodboard"

//pieces refers to ALL pieces in library
//associatedPieces refers to the pieces that belong in this design so far. 

export default function DesignDisplay ({d, pieces, removeDesign}) {
    const assocPieces = d.pieces
    const handleDelete = (e) => {
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

    return (
        <>
        <button onClick={handleDelete} >Delete this Design</button>
        {/* <DesignCanvas d={d} pieces={pieces} /> */}
        <Moodboard assocPieces={assocPieces}/>
        </>
    )
} 
