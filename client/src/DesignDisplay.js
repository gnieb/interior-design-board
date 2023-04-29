// import DragandDrop from "./DragandDrop"
// this component will have :
// Canvas
// pieces images
// list of pieces
// form to add another piece? - either from collection or new - upload or from the internet

import Moodboard from "./Moodboard"

//pieces refers to ALL pieces in library
//associatedPieces refers to the pieces that belong in this design so far. 

export default function DesignDisplay ({d, pieces}) {
   const assocPieces = d.pieces

    return (
        <>
        {/* <DesignCanvas d={d} pieces={pieces} /> */}
        <Moodboard assocPieces={assocPieces}/>
        </>
    )
} 
