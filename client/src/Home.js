import { UserContext } from "./context/user"
import { useContext } from "react"


export default function Home () {
    const {designer} = useContext(UserContext)

    return (
        <>
            <h1>WELCOME, {designer.first_name.toUpperCase()}</h1> 
        </>
    )
}