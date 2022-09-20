import {
    Box, Paper, Container, Grid, Button, Typography,
    TextField
} from "@mui/material";
import { useState } from "react";


const styles = {
    boxButtons: {
        color: "#fff",
        textAlign: "center",
        py: 1
    }
}

export default function NewComplaint () {
    
    const [data, setData] = useState({
        name: "", id: "", subject: "",
        aadhaar: "", description: ""
    });
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    }
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
    }
    
    return (
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="center" pb={5} >
                <Box sx={{...styles.boxButtons, backgroundColor: "#C60F2D"}}>
                    <Typography fontWeight={500} sx={{textTransform: "none", width: "250px"}}>
                        New Complaint
                    </Typography>
                </Box>
            </Box>
            <Box component='form' onSubmit={handleFormSubmit} sx={{maxWidth: "1200px", mx: "auto"}}>
                <Paper elevation={3} sx={{px: 3, py: 4}}>
                    <Box textAlign="center">
                        <Typography variant="h6">Complaint Details</Typography>
                    </Box>
                    <br/>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4} xl={4}>
                            <TextField size="small" 
                            fullWidth
                            label="Your Name" 
                            value={data.name}
                            name="name"
                            required
                            onChange={handleDataChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} xl={4}>
                            <TextField size="small" 
                            fullWidth
                            label="Your ID" 
                            value={data.id}
                            name="id"
                            required
                            onChange={handleDataChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} xl={4}>
                            <TextField size="small" 
                            fullWidth
                            label="Your Aadhaar No" 
                            value={data.aadhaar}
                            required
                            name="aadhaar"
                            onChange={handleDataChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={12}>
                            <TextField size="small" 
                            fullWidth
                            label="Complaint Subject" 
                            value={data.subject}
                            required
                            name="subject"
                            onChange={handleDataChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={12}>
                            <TextField size="small" 
                            fullWidth
                            multiline={true}
                            rows={4}
                            label="Complaint Description" 
                            value={data.description}
                            required
                            name="description"
                            onChange={handleDataChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={12} textAlign='center'>
                            <Button type="submit" variant="contained" color="primary">Submit</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Container>
    )
}
