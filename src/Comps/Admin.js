import React, {useEffect, useState} from "react";
import {Box, Button, Card, CardContent, CircularProgress, Grid, TextField, Typography} from "@mui/material";
import PostSzallas from "./PostSzallas";
import {LoginOutlined} from "@mui/icons-material";
import LoadingButton from '@mui/lab/LoadingButton';
import AdminHome from "./AdminHome";

function Admin() {
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("admin123");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{

    }, [isLoggedIn])

    const handleLogin = () => {
        setIsLoading(true);

        setTimeout(() => {
            if(username === "admin" && password === "admin123") {
              setLoggedIn(true);
            }else{
                setErrorMessage("Hibás felhasználónév vagy jelszó!");
                setIsLoading(false);
            }
        }, 1000);
    };

    if(!isLoggedIn)
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4} sx={{margin:"auto"}}>
                    <Card>
                        <CardContent sx={{textAlign:"center"}}>
                            <Typography variant="h5" component="h2">
                                Bejelentkezés
                            </Typography>
                            {errorMessage && (
                                <Typography variant="body2" color="error">
                                    {errorMessage}
                                </Typography>
                            )}
                            <div style={{height:"10px"}}></div>

                            <TextField
                                label="Felhasználónév"
                                variant="outlined"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <div style={{height:"10px"}}></div>
                            <TextField
                                label="Jelszó"
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <br/>
                            <br/>
                            <LoadingButton
                                loading={isLoading}
                                loadingPosition="start"
                                startIcon={<LoginOutlined />}
                                variant="outlined"
                                onClick={handleLogin}
                                disabled={isLoading}
                            >
                                Bejelentkezés
                            </LoadingButton>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );

    return(
        <Box>
            <AdminHome/>
        </Box>

    )
}

export default Admin;
