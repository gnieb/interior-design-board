// all the pieces in and map thru them, give them all a delete button, add a add modal
// ?

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';

export default function DesignEdit ({handleAssociatedPD, showAssocPD, handleRemovePiece}) {

    const handleDelete = (pd) => {
      fetch(`/pdinstances/${pd.id}`, {
        method: "DELETE"
      })
        .then(r => {
          if (r.ok) {
            console.log("delete successful!")
            handleRemovePiece(pd)
          }
        })
    }

    return (

      <Grid container spacing={3} >
          {showAssocPD.map((item, i) => {
            return (
              <Grid item xs={6} sm={4} >
              <Card key={i} sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }} >
                <CardActionArea>
                <CardMedia
                component="img"
                height="250"
                image={item.piece.image}
                alt={item.piece.name}
                sx={{ 
                    objectFit:'cover'
                     }}
                />
                <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {item.piece.name}
                </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button onClick={() => handleDelete(item)}>Remove from Collection</Button>
            </CardActions>
          </Card>
          </Grid>
            )
          })}
      </Grid>
    )
}