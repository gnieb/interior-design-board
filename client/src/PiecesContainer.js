import NewPiece from "./NewPiece"
import Piece from "./Piece"
import { useState, useEffect } from "react"
import FilterBy from "./FilterBy"
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Menu from "./Menu";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import addtocollection from '././styles/addtocollection.png';
import Box from '@mui/material/Box';


export default function PiecesContainer ({piecesLibrary, setPiecesLibrary}) {
    const [openForm, setOpenForm] = useState(false)
    const [styleFilter, setStyleFilter] = useState("")
    const [typeFilter, setTypeFilter] = useState("")

    useEffect(() => {
        fetch("/check_session")
            .then((r) => {
                if (r.ok) {
                    r.json().then(r => {
                      setPiecesLibrary(r.pieces)
                      })
                   
                } else {
                      console.log("STATUS:", r.status)
                    }
            })
      }, [])


    const addNewPiece = (piece) => setPiecesLibrary([...piecesLibrary, piece])

    const handleStyleFilter = (value) => setStyleFilter(value)
    const filteredByStyle = (styleFilter !== "") ? piecesLibrary.filter((p) => p.style === styleFilter) : [...piecesLibrary]
    // console.log("FILTER BY STYLE:", filteredByStyle)
    const handleTFilter = (value) => setTypeFilter(value)
    const filteredByStyleAndType = (typeFilter !=="") ? filteredByStyle.filter((p) => p.type ===typeFilter) : [...filteredByStyle]
    // console.log("FILTER BY STYLE AND TYPE:", filteredByStyleAndType)
    

    const removePiece = (piece) => {
        const updatedPieces = piecesLibrary.filter((p) => p.id !== piece.id)
        setPiecesLibrary(updatedPieces)
      }
    
    const displayPieces = filteredByStyleAndType.map(p => {
    return(
    <Piece key={p.id} p={p} removePiece={removePiece}/>
    )
    })

    const handleOpenForm = () => setOpenForm(!openForm)


    return (
        <main id="collectionPage">
          <Menu />
        {openForm ?
        <>
        <Button variant="outlined" onClick={handleOpenForm}>CANCEL</Button>
        <NewPiece addNewPiece={addNewPiece} handleOpenForm={handleOpenForm} /> 
        </>:
        (<>
        <Grid container spacing={3} >
          <Grid item xs={12} sm={4} >
            <Card sx={{ maxWidth: 345, margin:'50px' }}>
              <CardActionArea>
              <CardMedia
                component="img"
                height="250"
                image={addtocollection}
                alt="addtoCollection"
                sx={{ 
                    objectFit:'cover'
                     }}
                />
              </CardActionArea>
              <CardActions>
              <Button onClick={handleOpenForm}>
                ADD TO COLLECTION
              </Button>
              </CardActions>
            </Card>
            <Box
            sx={{ maxWidth: 345, margin:'50px' }}>
              <FilterBy handleStyleFilter={handleStyleFilter} handleTFilter={handleTFilter} />
            </Box>
          
          </Grid>
          {displayPieces}
        </Grid>
        </>)}
        </main>
    )
}