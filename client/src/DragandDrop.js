// import DraggableImage from "./DraggableImage"
// import { useState } from "react"
// import { useDrop } from "react-dnd"

// export default function DesignCanvas ({d, pieces}) {
//     const [moodboard, setMoodboard] = useState([])
//     const [{isOver}, drop] = useDrop(() => ({
//         accept:"image",
//         drop: (item) => addImageToMoodboard(item.id),
//         collect: (monitor) => ({
//             isOver: !!monitor.isOver(),
//         }),
//     }))

//     const addImageToMoodboard = (id) => {
//         const imageList = pieces.filter((piece) => id===piece.id)
//         setMoodboard((moodboard) => [...moodboard, imageList[0]])
//     }

//     const displayDraggableImages = pieces.map(piece => {
//         return <DraggableImage  image={piece.image} key={piece.id} id={piece.id}/>
//     }) 

//     const displayMoodboardImages = moodboard.map((piece) => {
//         return <DraggableImage image={piece.image} key={piece.id} id={piece.id} />
//     })

//     return (
//         <>
//         <div>{displayDraggableImages}</div> 
//         <h1>{d.name} Moodboard</h1>
//         <div className="moodboard" ref={drop}>
//             {displayMoodboardImages}
//         </div>
//         </>
//     )
// }