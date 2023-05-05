

export default function Article ({a}) {

    return (
        <>
        <a href={a.href} target="_blank">
        <h4>{a.title}</h4>
        </a>
        <h6>{a.subtitle}</h6>
        </>
    )
}