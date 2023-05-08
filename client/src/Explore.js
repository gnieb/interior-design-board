import { useEffect, useState } from "react"
import Article from "./Article"
import Grid from '@mui/material/Grid';
import Menu from "./Menu";


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
        <div id="explore">
            <Menu />
        <h3>Welcome to EXPLORE</h3>
        <Grid container spacing={4}>
        {articleList}
        </Grid>
        </div>
    )
}