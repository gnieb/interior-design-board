import { Link } from "react-router-dom";
import { Route, useRouteMatch } from "react-router-dom";
import DesignDisplay from "./DesignDisplay"
import { Switch } from "react-router-dom/cjs/react-router-dom";

export default function DesignContainer ({designs, pieces}) {
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
                <DesignDisplay d={d} pieces={pieces}/>
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
            {displayDesigns}
        </Switch>
        </>
        
    )
}