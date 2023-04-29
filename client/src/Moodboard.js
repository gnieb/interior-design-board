import React from "react"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import addtocollection from "././styles/addtocollection.png"


export default function Moodboard ({assocPieces}) {

//onClick, bring up a modal with a form in it to add an image!!!!


    return (
        <>
            <div style={{padding: '10px'}}  >
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                    >
                    <Masonry gutter="20px" >
                        
                        {assocPieces.map((piece, i) => (
                            <img
                                key={i}
                                src={piece.image}
                                style={{width: "100%", display: "block", cursor: "pointer"}}
                                alt="piece.name"
                            />
                        ))}
                        <img 
                        src={addtocollection}
                         />
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </>
        
    )
}