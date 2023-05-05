import Link from '@mui/material/Link';
import photo9 from '././styles/photo9.avif'

export default function Article ({a}) {

    return (
        <>
        <img src={photo9} alt="Article image" style={{width:'100px'}} />
        <Link href={a.href} target="_blank" underline="hover">
        <h4>{a.title}</h4>
        </Link>
        <h6>{a.subtitle}</h6>
        </>
    )
}