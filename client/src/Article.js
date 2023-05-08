import Link from '@mui/material/Link';
import photo9 from '././styles/photo9.avif'
import mag2 from '././styles/mag2.avif'
import mag3 from '././styles/mag3.avif'
import mag4 from '././styles/mag4.avif'
import mag5 from '././styles/mag5.avif'
import mag6 from '././styles/mag6.avif'
import mag7 from '././styles/mag7.avif'
import mag8 from '././styles/mag8.avif'
import mag9 from '././styles/mag9.avif'
import mag10 from '././styles/mag10.avif'
import mag11 from '././styles/mag11.avif'
import mag12 from '././styles/mag12.avif'
import mag13 from '././styles/mag12.avif'
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


export default function Article ({a}) {
    const imageArray = [photo9, mag2, mag3, mag4, mag5, mag6, mag7, mag8, mag9, mag10, mag11, mag12, mag13 ]
    const randomPic = imageArray[Math.floor(Math.random() * imageArray.length)];

    return (
        <Grid item xs={12} sm={10} md={10}>
        <CardActionArea component="a" href={a.href} target="_blank" style={{padding: "20px"}}>
            <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                        {a.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {a.subtitle}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                        Architectural Digest
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                        Continue reading...
                    </Typography>
                </CardContent>
                <CardMedia 
                component="img"
                sx={{ width: 200, height: 250, display: { xs: 'none', sm: 'block' } }}
                image={randomPic} 
                alt="articleImage"/>
            </Card>

        </CardActionArea>
        </Grid>
    )
}