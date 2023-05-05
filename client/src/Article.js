import Link from '@mui/material/Link';
import photo9 from '././styles/photo9.avif'
import mag2 from '././styles/mag2.avif'
import mag3 from '././styles/mag3.avif'
import mag4 from '././styles/mag4.avif'
import mag5 from '././styles/mag5.avif'




export default function Article ({a}) {
    const imageArray = [photo9, mag2, mag3, mag4, mag5 ]
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