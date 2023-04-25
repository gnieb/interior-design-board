import React, {useState, useEffect } from "react";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UserContext = React.createContext()


function UserProvider({children}) {
    const [designer, setDesigner] = useState(null)
    // const history = useHistory()

    // useEffect(() => {
    //     fetch("http://127.0.0.1:5555/checksession")
    //         .then(r => {
    //             if (r.ok) {
    //                 console.log("STATUS:", r.status)
    //                 r.json().then((r) => {
    //                     setDesigner(r)
    //                     // history.push('/')
    //                 })
    //             } 
    //         })
    // }, [])

    return <UserContext.Provider value={{designer, setDesigner}} >{children}</UserContext.Provider>
}
export { UserContext, UserProvider }

