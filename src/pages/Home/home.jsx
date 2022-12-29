import React, { useState, useEffect } from 'react';

import { Box, Paper, Container, Grid, Button, Typography, Link, Alert, TextField, MenuItem } from "@mui/material";

import BgImage from "../../components/bgImage.jsx";
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../components/UserContext.js';
import axios from 'axios';
import { baseUrl } from '../../config/api-config.js';
import CustomSnackbar from '../../components/CustomSnackbar.jsx';

const styles = {
    boxButtons: {
        color: "#fff",
        textAlign: "center",
        py: 1
    },
    userInfo: {
        py: 1,
        px: 2,
        border: "1px solid rgba(0, 0, 0, 0.5)",
        borderRadius: "3px"
    },
    alertBox: {
        borderRadius: "3px",
        color: "#C60F2D",
        border: "1px solid #c60f2d",
        textAlign: "center",
        background: "rgba(198, 15, 45, 0.04)",
        display: "flex",
        flexDirection: "column",
        gap: 2
    },
    dueBox: {
        backgroundColor: "#fff",
        border: "1px solid #C60F2D",
        padding: "4px 8px",
        borderRadius: "5px",
        fontSize: "0.8rem",
        width: "fit-content",
        margin: "auto"
    },
    addProperty: {
        border: "2px dashed #6C6C6C",
        px: 2,
        fontFamily: "inherit",
        fontSize: "0.9rem",
        fontWeight: 500,
        color: "#6C6C6C",
        display: "flex",
        columnGap: "3px",
        textTransform: "none",
        marginLeft: "auto"
    },
    propertyBox: {
        padding: 3,
        borderRadius: "50px",
        backgroundColor: "#fff",
        mt: 3,
        boxShadow: "2px 2px 170px rgba(0, 0, 0, 0.1);",
    },
    knowProperty: {
        borderRadius: "50px",
        margin: "auto",
        textTransform: "none",
        py: 1,
        px: 2
    }
}

export default function Home() {

    const userContext = useUserContext();
    const userData = userContext.useUser();
    const [alert, setAlert] = useState({msg: "", type: ""});

    if (!userData.verified) {
        return <Container maxWidth="xl">
            <Paper elevation={3}>
                <Box textAlign='center' sx={{ px: 3, py: 4 }}>
                    Your Document Verification is Under Progress. You can use the portal once it is Verified.
                    <Box textAlign='center' pt={2}>
                        <RouteLink to="documents/list">
                            <Button variant='contained'>See Documents</Button>
                        </RouteLink>
                    </Box>
                </Box>
            </Paper>
        </Container>
    }


    return (
        <Container maxWidth="xl">
            <Paper elevation={3} sx={{ px: 3, py: 4 }}>
                <Grid container>
                    <Grid item md={4} lg={4} xl={3}>
                        <LeftPart setAlert={setAlert} />
                    </Grid>
                    <Grid item md={8} lg={8} xl={9}>
                        <RightPart setAlert={setAlert}  />
                    </Grid>
                </Grid>
            </Paper>
            <CustomSnackbar {...alert} onClose={() => setAlert({msg: "", type: ""})} />
        </Container>
    )
}

async function getProperties (token, username, type) {
    try {
        const { data } = await axios.get(`${baseUrl}/citizen_portal/property/${type}?username=${username}`, {
            headers: {
                authorization: "Bearer "+token
            }
        });
        return { error: false, data }
    } catch (error) {
        return { error }
    }
}


function LeftPart() {

    const userContext = useUserContext();
    const userData = userContext.useUser();

    return (
        <Box sx={{ px: 2 }} >
            <Box sx={{ ...styles.boxButtons, backgroundColor: "#C60F2D" }}>User Profile</Box>
            <Grid container rowSpacing={2} py={2}>
                <Grid item xs={12} md={12}>
                    <Box sx={styles.userInfo}>
                        <span style={{ color: "#6c6c6c" }}>Name :</span> {userData.first_name} {userData.last_name}
                    </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Box sx={styles.userInfo}>
                        <span style={{ color: "#6c6c6c" }}>Mobile :</span> {userData.mobile_number}
                    </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Box sx={styles.userInfo}>
                        <span style={{ color: "#6c6c6c" }}>Address :</span> {userData.address}
                    </Box>
                </Grid>
            </Grid>
            <Link href="#" underline="none">
                <Box sx={{ ...styles.boxButtons, backgroundColor: "var(--dark-blue)", borderRadius: "3px" }}
                >Know More</Box>
            </Link>
            <br />
            <Box sx={styles.alertBox} py={2} >
                <Typography fontFamily="inherit">
                    <b>Your Payment Is Due</b>
                </Typography>
                <Box sx={styles.dueBox}>
                    <span >Due Type : </span> <span style={{ fontWeight: 500 }}>Water Bill</span>
                </Box>
                <Box sx={styles.dueBox}>
                    <span>Due Date : </span> <span style={{ fontWeight: 500 }}>02.03.2022</span>
                </Box>
                <Link href="#" color="inherit">Know More</Link>
            </Box>
        </Box>
    )
}

function RightPart({ setAlert }) {

    const userContext = useUserContext();
    const userData = userContext.useUser();

    const [propType, setPropType] = useState("plot");
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        if(!userData.token) return;
        getProperties(userData.token, userData.username, propType).then((res) => {
            if(res.error) {
                console.log(res.error);
                setAlert({msg: "Error While fetching plot data.", type: "error"}); 
            } else {
                // console.log(res.data);
                // setProperties(res.data.slice(0, 100));
                // this is making the page unresponsive as it has 6,500 + records to show
                // uncomment at your own risk 
                setProperties(res.data)
            }
        })
    }, [userData.token, propType])

    return (
        <Box sx={{ px: 2 }}>
            <Grid container justifyContent="space-between" pl={3}>
                <Grid item md={4} lg={3} xl={2}>
                    <Box sx={{ ...styles.boxButtons, backgroundColor: "#C60F2D" }}>Properties</Box>
                </Grid>
                <Grid item md={4} lg={3} xl={2}>
                    <TextField
                        label="Property Type"
                        select
                        fullWidth
                        size='small'
                        value={propType}
                        onChange={(e) => setPropType(e.target.value)}
                    >
                        <MenuItem value="house">House</MenuItem>
                        <MenuItem value="plot">Plot</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
            <Box sx={{ borderLeft: "1px solid #dddddd", pl: 3 }}>
                {
                    properties.length ?
                    properties.map((p, i) => <PropertyCard data={p} type={propType} key={i} />) : 
                    <Alert severity='info'>
                        You have no properties listed.
                    </Alert>
                }
            </Box>
        </Box>
    )
}

const defaultPropertyImageUrl = 'https://images.pexels.com/photos/60638/namibia-africa-landscape-nature-60638.jpeg?auto=compress&cs=tinysrgb&w=480&h=285&dpr=1';

function PropertyCard ({ data, type }) {

    const navigate = useNavigate();

    return type === "plot" ? (
        <Grid container sx={styles.propertyBox}>
            <Grid item md={3}>
                <BgImage src={defaultPropertyImageUrl} borderRadius="50px" overflow="hidden" width="100%" height="100%"/>
            </Grid>
            
            <Grid item md={7}>
            <Grid container px={3} rowGap="3px" sx={{fontSize: "0.9rem"}}>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Extra Land : </span> {data.Extra_land}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Final Allot : </span> {data.Final_allot}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Project : </span> {data.Project}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Sector : </span> {data.Sector}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Status : </span> {data.Status}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Plot Id : </span> {data.plot_id}
                </Grid>
            </Grid>
            </Grid>
            
            <Grid item md={2} display="grid" placeItems='center'>
                {/* <Link to={`${data.plot_id}`}> */}
                    <Button variant="contained" sx={styles.knowProperty}
                        onClick={() => navigate(`services/plot-search/${data.plot_id}`)} 
                    color="primary">Know More</Button>
                {/* </Link> */}
            </Grid>
        </Grid>
    ) : (
        <Grid container sx={styles.propertyBox}>
            <Grid item md={3}>
                <BgImage src={defaultPropertyImageUrl} borderRadius="50px" overflow="hidden" width="100%" height="100%"/>
            </Grid>
            
            <Grid item md={7}>
            <Grid container px={3} rowGap="3px" sx={{fontSize: "0.9rem"}}>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Allot Type : </span> {data.Allot_type}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Allotment : </span> {data.Allotment}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Block : </span> {data.Block_no}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Project : </span> {data.Allotment_Date}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Sector : </span> {data.Sector}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Status : </span> {data.Scheme_Name}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Plot Id : </span> {data.plot_id}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Serial : </span> {data.Sr_no}
                </Grid>
            </Grid>
            </Grid>
            
            <Grid item md={2} display="grid" placeItems="center">
                <Button variant="contained" sx={styles.knowProperty} 
                    onClick={() => navigate(`services/view-house/${data.plot_id}`, { replace: true })} 
                color="primary">Know More</Button>
            </Grid>
        </Grid>
    )
}