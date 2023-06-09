
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';


export default function ColorPalette ({d}) {
    const [color1, setColor1] = useState(d.color1 ? d.color1 : "#FFFFFF" )
    const [color2, setColor2] = useState(d.color2 ? d.color2 : "#CCCCCC")
    const [color3, setColor3] = useState(d.color3 ? d.color3 : "#999999")
    const [color4, setColor4] = useState(d.color4 ? d.color4 : "#666666")
    const [color5, setColor5] = useState(d.color5 ? d.color5 : "#333333")

    const generateRandomPalette = () => {
        fetch('/randpalette')
            .then(r => {
                if (r.ok) {
                    r.json().then(r => {
                        setIndividualColors(r.result)
                    })
                } else {
                    r.json().then(console.log)
                }
            })
    }

    const toHex = (color) => {
        const hex = color.toString(16)
        return hex.length == 1 ? "0" + hex : hex
     }
    const rgbToHex = (array) => `#${toHex(array[0])}${toHex(array[1])}${toHex(array[2])}`
    
    const setIndividualColors = (palette) => {
        setColor1(rgbToHex(palette[0]))
        setColor2(rgbToHex(palette[1]))
        setColor3(rgbToHex(palette[2]))
        setColor4(rgbToHex(palette[3]))
        setColor5(rgbToHex(palette[4]))
    }

    const handleSavePalette = () => {
        console.log("SAVINGGGGGG")
        const newPal = {
            color1:color1,
            color2:color2,
            color3:color3,
            color4:color4,
            color5:color5
        }
        fetch(`/designs/${d.id}`, {
            method: "PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(newPal)
        })
        .then(r=> {
            if(r.ok) {
                console.log(r)
            } else {
                console.log(r.status)
            }
        })
    }
 

    return (
        <div style={{padding:"50px"}}>
        <Box 
                sx={{
                    width: 200,
                    height: 200,
                    backgroundColor: color1,
                    '&:hover': {
                    backgroundColor: "#CCCCCC",
                    opacity: [0.9, 0.8, 0.7],
                    },
                }}
            />
            <Box 
                sx={{
                    width: 200,
                    height: 200,
                    backgroundColor: color2,
                    '&:hover': {
                    backgroundColor: "#CCCCCC",
                    opacity: [0.9, 0.8, 0.7],
                    },
                }}
            />
            <Box
                sx={{
                    width: 200,
                    height: 200,
                    backgroundColor: color3,
                    '&:hover': {
                    backgroundColor: "#CCCCCC",
                    opacity: [0.9, 0.8, 0.7],
                    },
                }}
            />
            <Box 
                sx={{
                    width: 200,
                    height: 200,
                    backgroundColor: color4,
                    '&:hover': {
                    backgroundColor: "#CCCCCC",
                    opacity: [0.9, 0.8, 0.7],
                    },
                }}
            />
            <Box
                sx={{
                    width: 200,
                    height: 200,
                    backgroundColor: color5,
                    '&:hover': {
                    backgroundColor: "#CCCCCC",
                    opacity: [0.9, 0.8, 0.7],
                    },
                }}
            />
            
            <Tooltip title={<h5>"Click 'GENERATE RANDOM PALETTE' for color palette suggestions. When you find one you like, click 'SAVE PALETTE'"</h5>}>
                <IconButton
                sx={{ color: "gray", m:1 }}
                aria-label={`How to use the palettes`}
                // onClick={()=> handleDelete(item) }
              > How to Use The Palette  
               <InfoIcon/>
              </IconButton>
            </Tooltip>
            <Button onClick={generateRandomPalette}>Generate Random Palette</Button>
            <Button onClick={handleSavePalette}>Save Palette</Button>
        </div>

    )
}