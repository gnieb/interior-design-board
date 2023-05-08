import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import DesignDisplay from "./DesignDisplay"
import { Switch } from "react-router-dom/cjs/react-router-dom";
import NewDesign from "./NewDesign";
import { useEffect } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import Menu from "./Menu";

export default function DesignContainer ({piecesLibrary, 
                                        setPiecesLibrary ,
                                        designs, 
                                        setDesigns, 
                                        handleNewD, 
                                        removeDesign, 
                                        addNewPiece}) {
    
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

    const designMenu = designs.map(d => {
        return (
            <div key={d.id}>
                <Link to={`/designs/${d.id}`}>{d.name}</Link>
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
                piecesLibrary={piecesLibrary}/>
            </Route>
        )
    })
 
    return (
        <>
        <Menu />
        <h2>My Designs</h2>
        {designMenu}
        <NavLink to='/designs/new' exact >NEW DESIGN</NavLink>
        <Switch>
            <Route exact path='/designs/new'>
                <NewDesign designs={designs} handleNewD={handleNewD} />
            </Route>
            {displayDesigns}
        </Switch>
        </>
        
    )
}