import { AccountBalance, CurrencyRuble, CurrencyRupee, LocationOn } from "@mui/icons-material";
import {
    Box, Paper, Container, Grid, Button, Typography,
    TextField, LinearProgress, IconButton, InputAdornment, MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import { useState } from "react";

const styles = {
    boxButtons: {
        color: "#fff",
        textAlign: "center",
        py: 1
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
            <Box sx={{maxWidth: "900px", mx: "auto"}}>
                <Paper elevation={3} sx={{ px: 3, py: 4 }}>
                    <Grid container>
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
                    </Grid>
                </Paper>
            </Box>
        </Container>
    )
}