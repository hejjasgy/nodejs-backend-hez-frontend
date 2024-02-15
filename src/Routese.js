import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "./Comps/Home";
import Admin from "./Comps/Admin";
import NavBar from "./NavBar";
import {Box} from "@mui/material";

const Routese = () => {
    return (
        <Router>
            <NavBar />

            <Box sx={{padding:"30px 30px"}}>
                <Routes>
                    <Route exact path="*" element={<Home />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </Box>
        </Router>
    );
};

export default Routese;
