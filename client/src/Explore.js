import { useEffect, useState } from "react"


export default function Explore() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch('/explore')
            .then((r) => {
                if (r.ok) {
                    r.json().then(r => {
                        setArticles(r)
                    })
                }
            })
    }, [])




    return (
        <>
        </>
    )
}