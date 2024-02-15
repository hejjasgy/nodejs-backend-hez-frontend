import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Backdrop,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Modal, Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {DeleteOutline, SaveOutlined} from "@mui/icons-material";
import {Alert} from "@mui/lab";

export default function AdminHome(){
    const [szallasok, setSzallasok] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [update, setUpdate] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get("https://nodejs.sulla.hu/data").then((response) => {
            setSzallasok(response.data);
        }).catch((error) => {
            setMessage(error)
            setSnackbarOpen(true)
        });
    }, [update]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOpen = () => {
        setFormData({
            id:0,
            name: "",
            hostname: "",
            location: "",
            price: 2000,
            minimum_nights: 1
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleGetById = (szallasId) => {
        axios.get(`https://nodejs.sulla.hu/data/${szallasId}`).then((response) => {
            setFormData(response.data);
            setOpenDialog(true);
        });
    };

    const handleDelete = () => {
        axios.delete(`https://nodejs.sulla.hu/data/${formData.id}`).then(() => {
            setSzallasok(szallasok.filter((s) => s.id !== formData.id));
        }).then(() => {
            setMessage("Sikeres törlés!");
            setSnackbarOpen(true);
            setUpdate(prev => prev + 1);
        }).catch((error) => {
            console.error(error.message);
            setSnackbarOpen(true);
        }).finally(() => {
            setIsLoading(false)
            setFormData(false)
            setOpenDialog(false);
        });
    }

    const handleSubmit = () => {
        setIsLoading(true);

        axios.post("https://nodejs.sulla.hu/data", formData)
            .then((response) => {
                setMessage("Sikeres mentés!");
                setSnackbarOpen(true);
                setUpdate(prev => prev + 1);
            })
            .catch((error) => {
                console.error(error.message);
                setSnackbarOpen(true);
            }).finally(()=>{
            setIsLoading(false)
            setOpen(false)
        });
    };

    const handleEdit = (szallas) => {
        setFormData(szallas);
    };

    const handleSave = () => {
        setIsLoading(true);

        axios.put("https://nodejs.sulla.hu/data/"+formData.id, formData)
            .then((response) => {
                setMessage("Sikeres mentés!");
                setSnackbarOpen(true);
                setUpdate(prev=>prev+1);
            })
            .catch((error) => {
                console.error(error.message);
                setSnackbarOpen(true);
            }).finally(()=>{
            setIsLoading(false)
            setFormData(false)
            setOpenDialog(false)
        });
    };

    const handleDialogClose = () => {
        setOpenDialog(false);

    };

    if (szallasok.length === 0)
        return (
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );

    return (
        <Box>
            <Grid container spacing={3}>
                {szallasok.map((szallas) => (
                    <Grid item xs={4} sm={4} md={3} key={szallas.id}>
                        <Card sx={{ textAlign: "center" }}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {szallas.name}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {szallas.price} / alkalom
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleGetById(szallas.id)}
                                >
                                    Részletek
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                ))}
                <Grid item xs={4} sm={4} md={3} key={"new"}>
                    <Card sx={{ textAlign: "center" }}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Van új valami?
                            </Typography>
                            <Typography variant="body2" component="p">
                                Itt hozzáadhatja
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleOpen()}
                            >
                                Új hozzáadása
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>{formData.id} Szerkesztés</DialogTitle>
                <DialogContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Név"
                                variant="outlined"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Szolgáltató"
                                variant="outlined"
                                multiline
                                name="hostname"
                                value={formData.hostname}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Ár"
                                variant="outlined"
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Hely"
                                variant="outlined"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Minimum tartózkodás"
                                variant="outlined"
                                type="number"
                                name="minimum_nights"
                                value={formData.minimum_nights}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={handleDialogClose}>
                        Mégsem
                    </Button>
                    <LoadingButton
                        loading={isLoading}
                        loadingPosition="start"
                        startIcon={<DeleteOutline />}
                        variant="outlined"
                        onClick={handleDelete}
                        disabled={isLoading}
                        color={"error"}
                    >
                        Törlés
                    </LoadingButton>

                    <LoadingButton
                        loading={isLoading}
                        loadingPosition="start"
                        startIcon={<SaveOutlined />}
                        variant="outlined"
                        onClick={handleSave}
                        disabled={isLoading}
                    >
                        Mentés
                    </LoadingButton>
                </DialogActions>
            </Dialog>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Új szállás hozzáadása</DialogTitle>
                <DialogContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Név"
                                variant="outlined"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Szolgáltató"
                                variant="outlined"
                                multiline
                                name="hostname"
                                value={formData.hostname}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Ár"
                                variant="outlined"
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Hely"
                                variant="outlined"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Minimum tartózkodás"
                                variant="outlined"
                                type="number"
                                name="minimum_nights"
                                value={formData.minimum_nights}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={handleClose} sx={{ margin: "10px" }}>
                        Mégsem
                    </Button>
                    <LoadingButton
                        loading={isLoading}
                        loadingPosition="start"
                        startIcon={<SaveOutlined />}
                        variant="outlined"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        Mentés
                    </LoadingButton>
                </DialogActions>
            </Dialog>


            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert severity={message.startsWith("Sikeres") ? "success" : "error"}>{message}</Alert>
            </Snackbar>
        </Box>
    );
};
