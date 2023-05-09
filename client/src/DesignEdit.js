
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

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

      <Grid container spacing={3} sx={{padding:'50px'}}>
          {showAssocPD.map((item, i) => {
            return (
              <Grid key={i} item xs={6} sm={4} >
              <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }} >
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