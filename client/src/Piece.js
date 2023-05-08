import { useState } from "react"
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export default function Piece ({p, removePiece}) {
    const {name, type, style, image, color, id} = p
    const [showDesigns, setShowDesigns] = useState(false)
    const handleShowDesigns = (e) => setShowDesigns(!showDesigns)
    const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    const displayAssociatedDesigns = p.designs ? (p.designs.map(d => {
        return (
            <h6 key={d.id}>{d.name}</h6>
        )
    })) :
    (<h2>no designs associated yet</h2>)


    const handleDelete = () => {
        fetch(`/pieces/${id}`, {
            method: "DELETE",
        })
        .then((r) => {
            if (r.ok) {
                    console.log( "piece deleted!")
                    removePiece(p)
            } else {
                console.log(r.status)
            }
        })
    }



    return (
        <Grid item xs={12} sm={6} md={4} >
        <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }} >
            <CardActionArea>
                <CardMedia
                component="img"
                height="250"
                image={image}
                alt={name}
                sx={{ 
                    objectFit:'cover'
                     }}
                />
                <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {name}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={handleDelete}>Remove from Collection</Button>
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <Typography paragraph><strong>Associated Designs:</strong></Typography>
                <Typography paragraph>
                    {displayAssociatedDesigns}
                </Typography>
                <Typography paragraph><strong>Design Style -</strong> {style}</Typography>
                <Typography paragraph><strong>Interior Element Category -</strong> {type}</Typography>
                </CardContent>
            </Collapse>
        </Card>
        </Grid>
    )
}