import {
    Box,  Container, Grid, Button, Typography,
    CircularProgress
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import BgImage from "../../components/bgImage.jsx";

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

async function getPlots (token) {
    try {
        const { data } = await axios.get(`${baseUrl}/citizen_portal/lottery/plot/`, {
            headers: {
                authorization: "Bearer "+token
            }
        });
        return { error: false, data }
    } catch (error) {
        return { error }
    }
}


export default function LotteryPlotList () {

    const userContext = useUserContext();
    const userData = userContext.useUser();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    function loadData () {
        getPlots(userData.token).then((res) => {
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
    }, [userData.token]);

    if (!userData.Ews) return (
        <Container maxWidth="xl">
            <Typography textAlign='center'>You are not eligible for Lottery.</Typography>
        </Container>
    )
    
    return (
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="center" pb={5} >
                <Box sx={{...styles.boxButtons, backgroundColor: "#C60F2D"}}>
                    <Typography fontWeight={500} sx={{textTransform: "none", width: "250px"}}>
                        Lottery Plots
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

    const navigate = useNavigate();

    return(
        <Grid container sx={styles.propertyBox}>
            <Grid item md={3}>
                <BgImage src={data.plot_img || defaultPropertyImageUrl} borderRadius="50px" overflow="hidden" width="100%" height="100%"/>
            </Grid>
            
            <Grid item md={7}>
            <Grid container px={3} rowGap="3px" sx={{fontSize: "0.9rem"}}>
                <Grid item xs={12} sm={6} md={6}>
                    <span className="text-secondary">Project : </span> {data.Project}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <span className="text-secondary">Scheme : </span> {data.Scheme_Name}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <span className="text-secondary">Plot Id: </span> {data.plot_id}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <span className="text-secondary">Sector : </span> {data.Sector}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <span className="text-secondary">Status : </span> {data.property_status}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <span className="text-secondary">Property Type : </span> {data.property_type}
                </Grid>
            </Grid>
            </Grid>
            
            <Grid item md={2} display="grid" placeItems='center'>
                {/* <Link to={`${data.plot_id}`}> */}
                    <Button variant="contained" sx={styles.knowProperty}
                        onClick={() => navigate(`${data.id}`)} 
                    color="primary">Know More</Button>
                {/* </Link> */}
            </Grid>
        </Grid>
    )
}