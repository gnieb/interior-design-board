import UpdateProfilePage from "./UpdateProfilePage"
import { UserContext } from "./context/user"
import { useContext, useState } from "react"
import Menu from "./Menu"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';


export default function ProfilePage () {
    const {designer} = useContext(UserContext)
    const {first_name, last_name, email, city, username} = designer
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
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} 
            sx={{
                margin:'10px'
            }}>
            <List
            sx={{color:'#263A29', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',}}>
                <Divider variant="middle" component="div" role="presentation"/>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar
                    style={{background:'#263A29'}}>
                    {Array.from(designer.first_name)[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${first_name.toUpperCase()} ${last_name.toUpperCase()}`} secondary={username} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                    <ListItemAvatar>
                    <Avatar
                    style={{background:'#263A29'}}>
                    <MailIcon/>
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary='EMAIL' secondary={email} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar
                    style={{background:'#263A29'}}>
                    <LocationOnIcon/>
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="LOCATION" secondary={city} />
                </ListItem>
            <Button onClick={handleEditMode}>Edit</Button>
            </List>
        </Grid>
        </Grid>
        </div> )}
        </>
    )
}

// maybe add a change password field if theres time?????