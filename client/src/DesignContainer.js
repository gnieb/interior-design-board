import { Link } from "react-router-dom";
import { Route, useRouteMatch } from "react-router-dom";
import DesignDisplay from "./DesignDisplay"
import { Switch } from "react-router-dom/cjs/react-router-dom";

export default function DesignContainer ({designs}) {
    const match = useRouteMatch()

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
                <DesignDisplay d={d} />
            </Route>
        )
    })

    return (
        <>
        <h2>My Designs</h2>
        {designMenu}
        <h2>---------------------------------------</h2>
        <Switch>
            {displayDesigns}
        </Switch>
        </>
        
    )
}