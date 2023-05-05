import { useEffect, useState } from "react"
import Article from "./Article"


export default function Explore() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch('/explore')
            .then((r) => {
                if (r.ok) {
                    r.json().then(r => {
                        console.log(r)
                        setArticles(r)
                    })
                }
            })
    }, [])


    const articleList = articles.map((a, i) => <Article key={i} a={a}/>)

    return (
        <>
        <p>Welcome to EXPLORE</p>
        <p>All Articles are courtesy of Architectural Digest TRENDS</p>
        {articleList}
        </>
    )
}