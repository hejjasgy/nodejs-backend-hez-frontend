import React, {useState, useEffect} from "react";
import axios from "axios";
import {
    Backdrop,
    Box,
    Button,
    Card,
    CardContent, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Grid, Modal,
    Typography
} from "@mui/material";

function Home(){
    const [szallasok, setSzallasok] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [szallas, setSzallas] = useState({});

    useEffect(() => {
        axios.get("https://nodejs.sulla.hu/data").then((response) => {
            setSzallasok(response.data);
        });
    }, []);

    const handleGetById = (szallasId) => {
        axios.get(`https://nodejs.sulla.hu/data/${szallasId}`).then((response) => {
            setSzallas(response.data);
            setOpenDialog(true);
        });
    };

    if(szallasok.length == 0) return(
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );

    return(
        <Box>
            <Grid container spacing={3}>
                {szallasok.map((szallas) => (
                    <Grid item xs={4} sm={4} md={3} key={szallas.id}>
                        <Card sx={{textAlign:"center"}}>
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
            </Grid>

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {szallas.name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {szallas.hostname} / {szallas.location} <br/>
                        Ár: {szallas.price} pizza <br/>
                        Minimum éjszakát: {szallas.minimum_nights}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Bezárás</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Home;
