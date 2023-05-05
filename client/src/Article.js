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




export default function Article ({a}) {
    const imageArray = [photo9, mag2, mag3, mag4, mag5, mag6, mag7, mag8, mag9, mag10, mag11, mag12, mag13 ]
    const randomPic = imageArray[Math.floor(Math.random() * imageArray.length)];

    return (
        <>
        <img src={randomPic} alt="Article image" style={{width:'100px'}} />
        <Link href={a.href} target="_blank" underline="hover">
        <h4>{a.title}</h4>
        </Link>
        <h6>{a.subtitle}</h6>
        </>
    )
}