import { useParams } from "react-router-dom";

export default function DesignDisplay ({designs}) {

    const params = useParams()
    console.log(params)

    return (
        <>
        <h2>{designs[params.dID].name}</h2>
        <h3>design display will go here</h3>
        </>
    )
} 