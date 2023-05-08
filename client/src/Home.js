import { UserContext } from "./context/user"
import { useContext, useEffect } from "react"
import Menu from "./Menu"


export default function Home () {
    const {designer} = useContext(UserContext)
   

        return (
        <main id="home">
            <Menu /> 
        </main>
        )
}