import React from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom"
import Button from '@mui/material/Button';

export default function NotFound() {
    const history= useHistory()
    const goBackOne = () => history.goBack()

    return (
        <div>
            Whoops, there's nothing here!
            <Button onClick={goBackOne}>back to safety</Button>
        </div>
    )
}