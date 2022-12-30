import {
    Box,  Container, Grid, Button, Typography,
    CircularProgress,
    Paper
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

// import { properties } from "../../config/constants.js";
import { baseUrl } from "../../config/api-config.js";
import { useEffect } from "react";
import { useUserContext } from "../../components/UserContext.js";
import {  useNavigate } from "react-router-dom";

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
        margin: 'auto'
    }
}

async function getPlots (token, username) {
    try {
        const { data } = await axios.get(`${baseUrl}/citizen_portal/bidding/plot/mybid?username=${username}`, {
            headers: {
                authorization: "Bearer "+token
            }
        });
        return { error: false, data }
    } catch (error) {
        return { error }
    }
}


export default function UserBidPlotList () {

    const userContext = useUserContext();
    const userData = userContext.useUser();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    function loadData () {
        getPlots(userData.token, userData.username).then((res) => {
            if(res.error) {
                console.log(res.error);
                alert("Error While fetching plot data.")
            } else {
                setProperties(res.data.slice(0, 100));
            } setLoading(false);
        })
    }

    useEffect(() => {
        if(!userData.token) return;
        loadData();
    }, [userData.token])
    
    return (
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="center" pb={5} >
                <Box sx={{...styles.boxButtons, backgroundColor: "#C60F2D"}}>
                    <Typography fontWeight={500} sx={{textTransform: "none", width: "250px"}}>
                        My Bidding Plots
                    </Typography>
                </Box>
            </Box>
            <Box>
                {
                    loading ? <CircularProgress/> : <></>
                }
                <Box display="flex" flexWrap="wrap"> 
                    <Grid container  spacing={3} mt={2}>
                        { properties.map((p, i) => <Grid item md={10} lg={6} key={i} >
                             <PropertyCard data={p} key={i} />
                        </Grid>
                        )}
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

function PropertyCard ({ data }) {

    return(
            <Paper elevation={1}>
        <Grid container sx={styles.propertyBox}>
            {/* <Grid item md={3}>
                <BgImage src={data.plot_img || defaultPropertyImageUrl} borderRadius="50px" overflow="hidden" width="100%" height="100%"/>
            </Grid> */}
            
            <Grid item md={7}>
            <Grid container px={3} rowGap="3px" sx={{fontSize: "0.9rem"}}>
                <Grid item xs={12} sm={6} md={6}>
                    <span className="text-secondary">Bidding Property : </span> {data.biding_property}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <span className="text-secondary">RDA Amount : </span> {data.rda_amount}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <span className="text-secondary">Status : </span> {data.status}
                </Grid>
            </Grid>
            </Grid>
            
            {/* <Grid item md={2} display="grid" placeItems='center'>
                    <Button variant="contained" sx={styles.knowProperty}
                        onClick={() => navigate(`${data.plot_id}`)} 
                    color="primary">Know More</Button>
            </Grid> */}
        </Grid>
        </Paper>

    )
}