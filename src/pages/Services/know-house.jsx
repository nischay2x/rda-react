import { AccountBalance, CurrencyRuble, CurrencyRupee, LocationOn } from "@mui/icons-material";
import {
    Box, Paper, Container, Grid, Button, Typography,
    TextField, LinearProgress, IconButton, InputAdornment,
    MenuItem, Select, FormControl, InputLabel, CircularProgress
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import BgImage from "../../components/bgImage.jsx";

// import { properties } from "../../config/constants.js";
import { baseUrl } from "../../config/api-config.js";
import { useEffect } from "react";
import { useUserContext } from "../../components/UserContext.js";
import { Link, useParams } from "react-router-dom";
import CustomSnackbar from "../../components/CustomSnackbar.jsx";

const defaultPropertyImageUrl = 'https://images.pexels.com/photos/60638/namibia-africa-landscape-nature-60638.jpeg?auto=compress&cs=tinysrgb&w=480&h=285&dpr=1';

const styles = {
    boxButtons: {
        color: "#fff",
        textAlign: "center",
        py: 1
    },
    propertyBox: {
        padding: 2,
        borderRadius: "50px",
        backgroundColor: "#fff",
        boxShadow: "2px 2px 170px rgba(0, 0, 0, 0.1);",
    },
    knowProperty: {
        borderRadius: "50px",
        margin: "auto 0 auto auto",
        textTransform: "none",
        py: 1,
        pl: 2
    }
}

async function getHouseDetail(token, id) {
    try {
        const { data } = await axios.get(`${baseUrl}/citizen_portal/property/house/details?Id=${id}`, {
            headers: {
                authorization: "Bearer " + token
            }
        });
        return { error: false, data }
    } catch (error) {
        return { error }
    }
}

async function sendHouseRequest(token, username, id) {
    try {
        const { data } = await axios.post(`${baseUrl}/citizen_portal/get/house/sendreq/`, {
            username, plot_id: id
        }, {
            headers: {
                authorization: "Bearer " + token
            }
        });
        return { error: false, data }
    } catch (error) {
        return { error }
    }
}

export default function KnowHouse() {

    const params = useParams();
    const userContext = useUserContext();
    const userData = userContext.useUser();
    const [loading, setLoading] = useState(true);
    const [houseData, setHouseData] = useState({});
    const formatted = autoFormatObject(houseData);
    const [alert, setAlert] = useState({ msg: "", type: "" });

    useEffect(() => {
        if (!userData.token) return;
        getHouseDetail(userData.token, params.id).then((res) => {
            if (res.error) {
                console.log(res.error);
                setAlert({ msg: "Error While fetching plot data.", type: "error" });
            } else {
                setHouseData(res.data);
            } setLoading(false);
        })
    }, [userData.token])

    async function onSendRequestClick(e) {
        const { error } = await sendHouseRequest(userData.token, userData.username, params.id);
        if (error) {
            setAlert({ msg: "Error while sending request.", type: "error" })
        } else {
            alert('Request Sent.');
            e.target.style.visibility = false;
        }
    }

    return (
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="center" pb={5} >
                <Box sx={{ ...styles.boxButtons, backgroundColor: "#C60F2D" }}>
                    <Typography fontWeight={500} sx={{ textTransform: "none", width: "250px" }}>
                        Know House {params.id}
                    </Typography>
                </Box>
            </Box>
            <Box display='flex' justifyContent='flex-end' >
                {
                    houseData.user ? <></> :
                        <Button variant="contained" color="primary" onClick={onSendRequestClick}>
                            Send Request
                        </Button>
                }
            </Box>
            {
                houseData.plot_img ?
                    <Box p={2} mx="auto" maxWidth={400}>
                        <img src={houseData.plot_img} style={{ objectFit: 'contain' }} width="100%" alt="property -image" />
                    </Box>
                    : <></>
            }
            <Box>
                {
                    loading ? <CircularProgress /> : <></>
                }
                <Paper elevation={2} sx={{ pl: 1 }}>
                    <Grid container spacing={1}>
                        {
                            Object.keys(formatted).map((k, i) => <Grid item sx={{ border: '0.2px solid gray', pb: 1 }}
                                key={i} xs={12} md={6} lg={4} xl={3}>
                                {k}: {formatted[k]}
                            </Grid>)
                        }
                    </Grid>
                </Paper>
            </Box>
            <CustomSnackbar {...alert} onClose={() => setAlert({ msg: "", type: "" })} />
        </Container>
    )
}

function autoFormatObject(a) {
    let obj = {};
    Object.keys(a).forEach(k => {
        let f = k;
        if (/_+/g.test(f)) {
            f = f.replaceAll('_', ' ').trim();
            f = f.split(" ").map(w => {
                if (/[a-z]/.test(w[0])) {
                    return w[0].toUpperCase() + w.slice(1, w.length)
                }
                return w
            }).join(" ")
        }

        if (/[a-z]/.test(f[0])) {
            f = f[0].toUpperCase() + f.slice(1, f.length)
        }

        obj[f] = a[k];
    })
    return obj;
}