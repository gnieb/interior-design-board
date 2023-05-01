import { useState } from "react"

export default function Piece ({p, removePiece}) {
    const {name, type, style, image, color, id} = p
    const [showDesigns, setShowDesigns] = useState(false)
    const handleShowDesigns = (e) => setShowDesigns(!showDesigns)

// do we need this conditional logic??
    const displayAssociatedDesigns = p.designs ? (p.designs.map(d => {
        return (
            <h2 key={d.id}>{d.name}</h2>
        )
    })) :

    (<h2>no designs associated yet</h2>)


    const handleDelete = () => {
        fetch(`/pieces/${id}`, {
            method: "DELETE",
        })
        .then((r) => {
            if (r.ok) {
                    console.log( "piece deleted!")
                    removePiece(p)
            } else {
                console.log(r.status)
            }
        })
    }



    return (
       <div>
        <h3>{name}</h3>
        <img src={image} alt={name} />
        <p>{type}</p>
        <p>{style}</p>
        <p>{color}</p>
        <button onClick={handleDelete}>Remove from Collection</button>
        <button onClick={handleShowDesigns}>{ showDesigns ? "Hide Designs":"Show Assocciated Designs"}</button>
        {showDesigns ? 
        displayAssociatedDesigns :
        <div></div>}
       </div> 
    )
}