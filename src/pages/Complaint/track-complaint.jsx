import {
    Box, Paper, Container, Grid, Button, Typography,
    TextField
} from "@mui/material";
import { useState } from "react";
import BgImage from "../../components/bgImage.jsx";

import { complaints } from "../../config/constants.js"

const styles = {
    boxButtons: {
        color: "#fff",
        textAlign: "center",
        py: 1
    },
    complaintBox: {
        px: 3,
        py: 2,
        backgroundColor: "#fff",
        boxShadow: "2px 2px 170px rgba(0, 0, 0, 0.1);",
    }
}

export default function TrackComplaint () {
    
    const [query, setQuery] = useState({
        name: "",
        aadhaar: "",
        id: ""
    });
    
    function onQueryChange (e) {
        setQuery(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    
    return (
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="center" pb={5} >
                <Box sx={{...styles.boxButtons, backgroundColor: "#C60F2D"}}>
                    <Typography fontWeight={500} sx={{textTransform: "none", width: "250px"}}>
                        Track Complaint
                    </Typography>
                </Box>
            </Box>
            <Box sx={{maxWidth: "1000px", mx: "auto"}}>
                <Paper elevation={3} sx={{ px: 3, py: 4 }}>
                    <Grid container columnSpacing={3} justifyContent="center">
                        <Grid item md={3} xl={3}>
                            <TextField size="small" 
                            fullWidth
                            placeholder="Your Name" 
                            value={query.name}
                            name="name"
                            onChange={onQueryChange}
                            />
                        </Grid>
                        <Grid item md={3} xl={3}>
                            <TextField size="small" 
                            fullWidth
                            placeholder="Your ID" 
                            value={query.id}
                            name="id"
                            onChange={onQueryChange}
                            />
                        </Grid>
                        <Grid item md={3} xl={3}>
                            <TextField size="small" 
                            fullWidth
                            placeholder="Your Aadhaar" 
                            value={query.aadhaar}
                            name="aadhaar"
                            onChange={onQueryChange}
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
                        { complaints.map((c, i) => <Grid item md={10} lg={6} key={i} >
                             <ComplaintCard data={c} />
                        </Grid>
                        )}
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

function ComplaintCard ({ data }) {
    return(
        <Grid container rowSpacing={2} sx={styles.complaintBox}>
            <Grid item xs={12} md={12} lg={12} display="flex" justifyContent='space-between' >
                <Typography color="secondary.main">Complaint No. : {data.number}</Typography>
                <Typography>Complaint Date : {data.date}</Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Typography>
                    Subject : {data.subject}
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Typography>
                    Description : {data.description}
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Button 
                    variant="contained" 
                    sx={{ 
                        textTransform: 'capitalize',
                        borderRadius: 0,
                        color: "#fff",
                        backgroundColor: data.status === 'PENDING' ? '#C60F2D' : "#323C5B"
                     }}
                >Status : {data.status}</Button>
            </Grid>
        </Grid>
    )
}