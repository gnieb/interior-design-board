import UpdateProfilePage from "./UpdateProfilePage"
import { UserContext } from "./context/user"
import { useContext, useState } from "react"
import Menu from "./Menu"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


export default function ProfilePage () {
    const {designer} = useContext(UserContext)
    const {first_name, last_name, email, city} = designer
    const [editMode, setEditMode] = useState(false)

   
    const handleEditMode = (e) => {
        setEditMode(!editMode)
    }


    return (
        <>
        {editMode ?
        <UpdateProfilePage handleEditMode={handleEditMode} /> :
       (<div id="profile">
       <Menu />
       <Grid container component="main" >
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} 
            sx={{
                margin:'10px'
            }}>
            <Box
            sx={{color:'#263A29', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',}}>
            <h2><strong>PROFILE</strong></h2>
            <h3>NAME {first_name} {last_name}</h3>
            <h3>EMAIL - {email}</h3>
            <h3>LOCATION - {city}</h3>
            <Button onClick={handleEditMode}>Edit</Button>
            </Box>
        </Grid>
        </Grid>
        </div> )}
        </>
    )
}

// maybe add a change password field if theres time?????