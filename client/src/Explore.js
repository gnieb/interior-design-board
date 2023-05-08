import { useEffect, useState } from "react"
import Article from "./Article"
import Grid from '@mui/material/Grid';
import Menu from "./Menu";
import Paper from '@mui/material/Paper';
import { formControlLabelClasses } from "@mui/material";


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
        <Grid container component="main">
            <Grid item
            xs={false}
            sm={false}
            md={6}
            sx={{padding: '200px 30px', }}>
                <h1 id="exploreHeadline">EXPLORE TRENDS. FIND INSPIRATION.</h1>
            </Grid>
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6}
            >
                {articleList}
            </Grid>
        </Grid>
        </div>
    )
}