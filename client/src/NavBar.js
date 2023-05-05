import { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function NavBar () {
    const {designer, setDesigner} = useContext(UserContext)
    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };

 
    

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
            <NavLink to='/pieces' exact>Piece Collection</NavLink>
            <NavLink to='/designs' exact>Designs</NavLink>
            <NavLink to='/designs/new' exact >New Design</NavLink>
            <div>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickMenu}
                >
                <Avatar>{designer.name}</Avatar>
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}>
                    <MenuItem onClick={handleClose} ><NavLink to='/profile' exact >Profile</NavLink></MenuItem>
                    <MenuItem onClick={handleClick} >Logout</MenuItem>
                </Menu>
            </div>
        </div>  
    )
}