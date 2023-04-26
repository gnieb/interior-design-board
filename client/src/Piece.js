export default function Piece ({p}) {
    const {name, type, style, image, color} = p
    
    return (
       <div>
        <h3>{name}</h3>
        <img src={image} alt={name} />
        <p>{type}</p>
        <p>{style}</p>
        <p>{color}</p>
       </div> 
    )
}