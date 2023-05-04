import { UserContext } from "./context/user"
import { useContext, useEffect, useState } from "react"


export default function Home () {
    const {designer} = useContext(UserContext)
    const [randomPalette, setRandomPalette] = useState([])

    useEffect(() =>{
        fetch('/randpalette')
        .then(r => {
            if (r.ok) {
                r.json().then(r => {
                    console.log(r.result)
                    setRandomPalette(r.result)
                })
            } else {
                r.json().then(console.log)
            }
        })
            
    }, [])
         console.log(randomPalette)

        const toHex = (color) => {
           const hex = color.toString(16)
           return hex.length == 1 ? "0" + hex : hex
        }

        
        const rgbToHex = (array) => `#${toHex(array[0])}${toHex(array[1])}${toHex(array[2])}`
        
        // TEST
        // console.log(rgbToHex([255, 51, 255]))
        
          const displayColors = randomPalette.map(colorArray => {
            rgbToHex(colorArray)
        })


        return (
        <>
            <h1>WELCOME, {designer.first_name.toUpperCase()}</h1> 
        </>
    )
}