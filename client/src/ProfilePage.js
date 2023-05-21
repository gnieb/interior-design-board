import UpdateProfilePage from "./UpdateProfilePage"
import { UserContext } from "./context/user"
import { useContext, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
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
import Modal from 'react-bootstrap/Modal';
import DeleteIcon from '@mui/icons-material/Delete';


export default function ProfilePage () {
    const {designer, setDesigner} = useContext(UserContext)
    const {first_name, last_name, email, city, username} = designer
    const [editMode, setEditMode] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const history = useHistory()
   
    const handleEditMode = (e) => setEditMode(!editMode)
    const handleDeleteModal = (e) => setShowDeleteModal(!showDeleteModal)
    const handleClose = (e) => setShowDeleteModal(!showDeleteModal)
    const handleCloseAndDelete = (e) => {
        fetch(`/designers/${designer.id}`, {method: "DELETE"})
            .then(r => {
                if (r.ok){
                    setShowDeleteModal(!showDeleteModal)
                    setDesigner(null)
                    history.push('/')
                }
            })
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
            <Button variant="outlined" color="error" onClick={handleDeleteModal}> Delete Account</Button>
            </List>
        </Grid>
        </Grid>
        </div> )}
        <Modal show={showDeleteModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>DELETE ACCOUNT</Modal.Title>
            </Modal.Header>
            <Modal.Body>ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT?
                THIS WILL DELETE ALL YOUR DESIGN WORK.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    I CHANGED MY MIND
                </Button>
                
                <Button onClick={handleCloseAndDelete} variant="outlined" color="error" startIcon={<DeleteIcon />}>
                I'm Sure
                </Button>
            </Modal.Footer>
            </Modal>
        </>
    )
}

// maybe add a change password field if theres time?????