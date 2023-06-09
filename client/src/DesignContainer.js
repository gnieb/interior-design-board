import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import DesignDisplay from "./DesignDisplay"
import { Switch } from "react-router-dom/cjs/react-router-dom";
import NewDesign from "./NewDesign";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import Menu from "./Menu";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function DesignContainer ({piecesLibrary, 
                                        setPiecesLibrary ,
                                        designs, 
                                        setDesigns, 
                                        handleNewD, 
                                        removeDesign, 
                                        addNewPiece}) {
    const [route, setRoute] = useState('/designs')

    useEffect(() => {
        fetch("/check_session")
            .then((r) => {
                if (r.ok) {
                    r.json().then(r => {
                      setDesigns(r.designs)
                      setPiecesLibrary(r.pieces)
                      })
                   
                } else {
                      console.log("STATUS:", r.status)
                    }
            })
      }, [])

    const handleRename = (dObj) => {
        const updatedDesigns = designs.map(d => {
            if (d.id !== dObj.id) {
                return d
            } else{
                return dObj
            }
        })
        setDesigns(updatedDesigns)
    }
    

    const designMenu = designs.map(d => {
        return (
            <div key={d.id}>
                <Link onClick={() => setRoute(`/designs/${d.id}`)} className="designMenuItem" to={`/designs/${d.id}`} style={{}}>{d.name.toUpperCase()}</Link>
            </div>
        )
    })

    const displayDesigns = designs.map(d => {
        return (
            <Route key={d.id} exact path={`/designs/${d.id}`}>
                <DesignDisplay 
                d={d} 
                removeDesign={removeDesign} 
                addNewPiece={addNewPiece}
                setPiecesLibrary={setPiecesLibrary}
                piecesLibrary={piecesLibrary}
                handleRename={handleRename}/>
            </Route>
        )
    })
 
    return (
        <div id="designsPage">
        <Menu />
        
        <Grid container component='main'>
            <Grid item sx={{padding:'30px'}}>
                <div className="designPageOptions">
                <h1  id="myDesigns"><strong>MY DESIGNS</strong></h1>
                {designMenu}
                </div>
            </Grid>
            <Grid item
            sx={{padding: '50px'}}>
                <NavLink id="newDesign" className="designMenuItem designPageOptions" to='/designs/new' exact >NEW DESIGN</NavLink>
            </Grid>
        </Grid>
        <Switch>
            <Route exact path='/designs/new'>
                <NewDesign designs={designs} handleNewD={handleNewD} />
            </Route>
            {displayDesigns}
        </Switch>
        </div>
        
    )
}