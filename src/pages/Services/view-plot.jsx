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
import { Link, useNavigate } from "react-router-dom";

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
        const { data } = await axios.get(`${baseUrl}/citizen_portal/get/plot/`, {
            headers: {
                authorization: "Bearer "+token
            }
        });
        return { error: false, data }
    } catch (error) {
        return { error }
    }
}

async function getPlotsByPlotNo (token, plotNo) {
    try {
        const { data } = await axios.get(`${baseUrl}/citizen_portal/get/plot/plot_no?plot_no=${plotNo}`, {
            headers: {
                authorization: "Bearer "+token
            }
        });
        return { error: false, data }
    } catch (error) {
        return { error }
    }
}


export default function ViewPlot () {

    const userContext = useUserContext();
    const userData = userContext.useUser();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [filter, setFilter] = useState({
        plot_no: "",
        // type: "",
        // budget: 0
    });
    
    function onFilterChange (e) {
        setFilter(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    function onSearchSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if (filter.plot_no) {
            getPlotsByPlotNo(userData.token, filter.plot_no).then((res) => {
                if (res.error) {
                    console.log(res.error);
                    alert("Error While fetching plot data.")
                } else {
                    setProperties([res.data])
                } setLoading(false);
            }).finally(() => { setLoading(false); });
        } else {
            loadData()
        }
    }

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
    }, [userData.token])
    
    return (
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="center" pb={5} >
                <Box sx={{...styles.boxButtons, backgroundColor: "#C60F2D"}}>
                    <Typography fontWeight={500} sx={{textTransform: "none", width: "250px"}}>
                        Plot View
                    </Typography>
                </Box>
            </Box>
            <Box component='form' onSubmit={onSearchSubmit} sx={{maxWidth: "1000px", mx: "auto"}}>
                <Paper elevation={3} sx={{ px: 3, py: 4 }}>
                    <Grid container columnSpacing={3} justifyContent="center">
                        <Grid item md={3} xl={3}>
                            <TextField size="small" InputProps={{
                                endAdornment: (<InputAdornment position="end"><LocationOn/></InputAdornment>)
                            }}
                            fullWidth
                            placeholder="Plot Number" 
                            value={filter.plot_no}
                            name="plot_no"
                            onChange={onFilterChange}
                            />
                        </Grid>
                        {/* <Grid item md={3} xl={3}>
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
                        </Grid> */}
                        <Grid item md={3} xl={2}>
                            <Button 
                                sx={{textTransform: "none"}} 
                                fullWidth variant="contained" color="primary" 
                                type="submit"
                            >Search</Button>
                        </Grid>
                    </Grid>
                </Paper>
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
                        onClick={() => navigate(`${data.plot_id}`)} 
                    color="primary">Know More</Button>
                {/* </Link> */}
            </Grid>
        </Grid>
    )
}