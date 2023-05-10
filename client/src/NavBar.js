import { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';



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
        
        <div id="menu">
            <h1 id="title"className="menuItem"><strong>INSPIRED INTERIORS</strong></h1>
            <div id="menuItems">
            <NavLink className="menuItem" to='/' exact >HOME</NavLink>
            <NavLink className="menuItem" to='/explore'>EXPLORE</NavLink>
            <NavLink className="menuItem" to='/pieces' exact>COLLECTION</NavLink>
            <NavLink className="menuItem" to='/designs' exact>DESIGNS</NavLink>
         
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickMenu}
                >
                <Avatar
                style={{background:'#263A29'}}
                >{Array.from(designer.first_name)[0]}</Avatar>
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