import DesignCanvas from "./DesignCanvas"
// this component will have :
// Canvas
// pieces images
// list of pieces
// form to add another piece? - either from collection or new - upload or from the internet

export default function DesignDisplay ({d}) {
   
    const listPieces = d.pieces.map(p => {
        return  <p key={p.id}>{p.name}</p>
    })

    return (
        <>
        <h3>{d.name}</h3>
        <h5>{listPieces}</h5>
        <DesignCanvas d={d} />
        </>
    )
} 