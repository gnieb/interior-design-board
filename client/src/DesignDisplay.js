import DesignCanvas from "./DesignCanvas"
// this component will have :
// Canvas
// pieces images
// list of pieces
// form to add another piece? - either from collection or new - upload or from the internet

export default function DesignDisplay ({d}) {
   

    return (
        <>
        <DesignCanvas d={d} />
        </>
    )
} 
