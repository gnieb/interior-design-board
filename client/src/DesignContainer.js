import { Link } from "react-router-dom";
import { Route, useRouteMatch } from "react-router-dom";
import DesignDisplay from "./DesignDisplay"

export default function DesignContainer ({designs}) {
    const match = useRouteMatch()
    console.log(match)

    const listDesigns = designs.map(d => {
        return (
            <div key={d.id}>
                <Link to={`/designs/${d.id}`}>{d.name}</Link>
            </div>
        )
    })

    return (
        <>
        <h2>My Designs</h2>
        {listDesigns}
        <h2>---------------------------------------</h2>
        <Route exact path={`${match.url}/:dID`}>
            <DesignDisplay designs={designs}/>
        </Route>
        </>
        
    )
}