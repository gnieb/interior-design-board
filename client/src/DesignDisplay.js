

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