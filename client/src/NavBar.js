import { useContext } from "react";
import { UserContext } from "./context/user";

export default function NavBar () {
    const {designer, setDesigner} = useContext(UserContext)

    const handleClick = (e) => {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => setDesigner(null))
    }

    return (
        <div>
            Links!!!!!
            {designer ? 
            <button onClick={handleClick}>Log Out</button>:
            <div></div> }
        </div>  
    )
}