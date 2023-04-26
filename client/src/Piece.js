export default function Piece ({p, removePiece}) {
    const {name, type, style, image, color, id} = p
    
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
       </div> 
    )
}