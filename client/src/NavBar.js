import { useContext } from "react";
import { UserContext } from "./context/user";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function NavBar () {
    const {designer, setDesigner} = useContext(UserContext)
    const history = useHistory()

    const handleClick = (e) => {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => {
            setDesigner(null)
            history.push('/')
        })
    }

    return (
        <div>
            <NavLink to='/' exact >Home</NavLink>
            <NavLink to='/pieces' exact>My Pieces</NavLink>
            <NavLink to='/designs' exact>Designs</NavLink>
            <NavLink to='/new_design'>New Design</NavLink>
            <NavLink to='/profile' exact>Profile</NavLink>
            {designer ? 
            <button onClick={handleClick}>Log Out</button>:
            <div></div> }
        </div>  
    )
}