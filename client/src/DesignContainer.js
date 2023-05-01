import { Link } from "react-router-dom";
import { Route, useRouteMatch } from "react-router-dom";
import DesignDisplay from "./DesignDisplay"
import { Switch } from "react-router-dom/cjs/react-router-dom";
import NewDesign from "./NewDesign";

export default function DesignContainer ({designs, handleNewD, removeDesign, addNewPiece}) {
    // const match = useRouteMatch()
    

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
                <DesignDisplay d={d} removeDesign={removeDesign} addNewPiece={addNewPiece}/>
            </Route>
        )
    })

    // const displayPiecesLibrary = pieces.map(p => {
    //     return <img key={p.id} src={p.image} alt={p.name} width ={'150px'.toString()}  />
    // })

 
    return (
        <>
        <h2>My Designs</h2>
        {designMenu}
        <h2>---------------------------------------</h2>
        {/* {displayPiecesLibrary} */}
        <Switch>
            <Route exact path='/designs/new'>
                <NewDesign designs={designs} handleNewD={handleNewD} />
            </Route>
            {displayDesigns}
        </Switch>
        </>
        
    )
}