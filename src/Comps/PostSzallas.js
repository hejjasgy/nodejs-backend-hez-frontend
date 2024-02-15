import React, { useState } from "react";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {LoginOutlined, SaveOutlined} from "@mui/icons-material";
import axios from "axios";
import {Alert} from "@mui/lab";

function PostSzallas() {
    // const [isLoading, setIsLoading] = useState(false);
    //
    // const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    // const [message, setMessage] = useState("");
    //
    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData({ ...formData, [name]: value });
    // };
    //
    //
    //
    // return (
    //     <div>
    //         <Button variant="contained" color="primary" onClick={handleOpen}>
    //             Új szállás hozzáadása
    //         </Button>
    //
    //         <Snackbar
    //             open={isSnackbarOpen}
    //             autoHideDuration={6000}
    //             onClose={() => setSnackbarOpen(false)}
    //         >
    //             <Alert severity={message.startsWith("Sikeres") ? "success" : "error"}>{message}</Alert>
    //         </Snackbar>
    //     </div>
    // );
}

export default PostSzallas;
