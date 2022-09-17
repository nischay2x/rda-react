import { AccountBalance, CurrencyRuble, CurrencyRupee, LocationOn } from "@mui/icons-material";
import {
    Box, Paper, Container, Grid, Button, Typography,
    TextField, LinearProgress, IconButton, InputAdornment, 
    MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import { useState } from "react";
import BgImage from "../../components/bgImage.jsx";

import { properties } from "../../config/constants.js"

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

export default function ViewPlot () {
    
    const [filter, setFilter] = useState({
        location: "",
        type: "",
        budget: 0
    });
    
    function onFilterChange (e) {
        setFilter(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    
    return (
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="center" pb={5} >
                <Box sx={{...styles.boxButtons, backgroundColor: "#C60F2D"}}>
                    <Typography fontWeight={500} sx={{textTransform: "none", width: "250px"}}>
                        Plot Search
                    </Typography>
                </Box>
            </Box>
            <Box sx={{maxWidth: "1000px", mx: "auto"}}>
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
            </Box>
            <br/>
            <br/>
            <Box>
                <Box sx={{...styles.boxButtons, width: "250px", backgroundColor: "#000"}}>
                        Search Results
                </Box>
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
        <Grid container sx={styles.propertyBox}>
            <Grid item md={3}>
                <BgImage src={data.image} borderRadius="50px" overflow="hidden" width="100%" height="100%"/>
            </Grid>
            
            <Grid item md={7}>
            <Grid container px={3} rowGap="3px" sx={{fontSize: "0.9rem"}}>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Plot Number : </span> {data.plot}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Allotment Date : </span> {data.plot}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Sector : </span> {data.sector}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Value : </span> {data.value}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Owner : </span> {data.owner}
                </Grid>
            </Grid>
            </Grid>
            
            <Grid item md={2} display="flex">
                <Button variant="contained" sx={styles.knowProperty} color="primary">Bid Plot</Button>
            </Grid>
        </Grid>
    )
}