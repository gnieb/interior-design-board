import { useContext } from "react";
import { UserContext } from "./context/user";

export default function NavBar () {
    const {designer, setDesigner} = useContext(UserContext)

    const handleLogout = (e) => {

    }



    return (
        <div>
            Links!!!!!
            {designer ? 
            <button>Log Out</button>:
            <div></div> }
        </div>  
    )
}