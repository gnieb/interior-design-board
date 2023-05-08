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
            sm={4}
            md={4}
            sx={{padding: '200px 0', }}>
                <h3 id="welcome">EXPLORE TRENDS. FIND INSPIRATION.</h3>
            </Grid>
            <Grid item xs={12} sm={10} md={8} component={Paper} elevation={6}
            sx={{padding:'20px'}}>
                {articleList}
            </Grid>
        </Grid>
        </div>
    )
}