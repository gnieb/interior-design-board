import DesignCanvas from "./DesignCanvas"
// this component will have :
// Canvas
// pieces images
// list of pieces
// form to add another piece? - either from collection or new - upload or from the internet

export default function DesignDisplay ({d}) {
   
    console.log(d)
    const usedPieces = d.pieces.map(p => {
        return (
            <>
            <p>{p.name}</p>
            <img src={p.image} />
            </>
        )
    })


    return (
        <>
        <h3>{d.name}</h3>
        <h3>{usedPieces}</h3>
        </>
    )
} 