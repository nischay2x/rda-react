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
import { useNavigate } from "react-router-dom";

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

async function getHouses (token, username) {
    try {
        const { data } = await axios.get(`${baseUrl}/citizen_portal/property/house?username=${username}`, {
            headers: {
                authorization: "Bearer "+token
            }
        });
        return { error: false, data }
    } catch (error) {
        return { error }
    }
}

export default function ViewHouse () {
    
    const [filter, setFilter] = useState({
        location: "",
        type: "",
        budget: 0
    });
    
    function onFilterChange (e) {
        setFilter(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const userContext = useUserContext();
    const userData = userContext.useUser();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!userData.token) return;
        getHouses(userData.token, userData.username).then((res) => {
            if(res.error) {
                console.log(res.error);
                alert("Error While fetching plot data.")
            } else {
                // console.log(res.data);
                // setProperties(res.data.slice(0, 100));
                // this is making the page unresponsive as it has 6,500 + records to show
                // uncomment at your own risk 
                setProperties(res.data)
            } setLoading(false);
        })
    }, [userData.token])
    
    return (
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="center" pb={5} >
                <Box sx={{...styles.boxButtons, backgroundColor: "#C60F2D"}}>
                    <Typography fontWeight={500} sx={{textTransform: "none", width: "250px"}}>
                        House View
                    </Typography>
                </Box>
            </Box>
            {/* <Box sx={{maxWidth: "1000px", mx: "auto"}}>
                <Paper elevation={3} sx={{ px: 3, py: 4 }}>
                    <Grid container columnSpacing={3} justifyContent="center">
                        <Grid item md={3} xl={3}>
                            <TextField size="small" InputProps={{
                                endAdornment: (<InputAdornment position="end"><LocationOn/></InputAdornment>)
                            }}
                            fullWidth
                            placeholder="Location" 
                            value={filter.location}
                            name="location"
                            onChange={onFilterChange}
                            />
                        </Grid>
                        <Grid item md={3} xl={3}>
                            <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">Plot Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={filter.type}
                                IconComponent={() => <AccountBalance sx={{pr: 1}}/>}
                                label="Plot Type"
                                name="type"
                                onChange={onFilterChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={3} xl={3}>
                            <TextField size="small" InputProps={{
                                endAdornment: (<InputAdornment position="end"><CurrencyRupee/></InputAdornment>)
                            }}
                            fullWidth
                            placeholder="Budget" 
                            value={filter.budget}
                            name="budget"
                            onChange={onFilterChange}
                            />
                        </Grid>
                        <Grid item md={3} xl={2}>
                            <Button sx={{textTransform: "none"}} fullWidth variant="contained" color="primary" >Search</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box> */}
            {/* <br/>
            <br/> */}
            <Box>
                {/* <Box sx={{...styles.boxButtons, width: "250px", backgroundColor: "#000"}}>
                        Search Results
                </Box> */}
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
                    onClick={() => navigate(`${data.plot_id}`)} 
                color="primary">Know More</Button>
            </Grid>
        </Grid>
    )
}