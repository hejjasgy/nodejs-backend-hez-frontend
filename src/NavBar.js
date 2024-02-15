import React from "react";
import {AppBar, Toolbar, Typography, Button, IconButton} from "@mui/material";
import {Link} from "react-router-dom";
import {AdminPanelSettingsOutlined, HomeOutlined} from "@mui/icons-material";

const NavBar = () => {
    return (
        <AppBar position="static" sx={{backgroundColor: "#2196f3"}}>
            <Toolbar>
            <IconButton component={Link} to="/" aria-label="home">
                <HomeOutlined sx={{ color: "white" }} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "white" }}>
                Szállásfoglalás
            </Typography>
            <Button component={Link} to="/admin" variant="outlined" color="primary">
                Admin felület
                <AdminPanelSettingsOutlined sx={{ marginLeft: 1 }} />
            </Button>
        </Toolbar>
        </AppBar>

    );
};

export default NavBar;
