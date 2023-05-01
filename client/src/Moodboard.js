import React, {useState} from "react"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import addtocollection from "././styles/addtocollection.png"


export default function Moodboard ({assocPieces}) {

    const [openAdd, setOpenAdd] = useState()
    const handleClickAdd = (e) => setOpenAdd(!openAdd)


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
                        onClick={handleClickAdd} 
                        />
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </>
        
    )
}