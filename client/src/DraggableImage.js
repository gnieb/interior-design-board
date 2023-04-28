import { useDrag } from "react-dnd"

export default function DraggableImage ({image, id}) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: "image",
        item: {id: id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))
   
    return  (
        <>
        <img
        ref={drag} 
        src={image} 
        width ={'200px'.toString()} 
        style={{border: isDragging ? "5px solid pink" : "0px"}}/>
        </>
    )
}