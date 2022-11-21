import {
    Box, Paper, Container, Grid, Button, Typography,
    TextField,
    Input
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useUserContext } from "../../components/UserContext";
import { baseUrl } from "../../config/api-config";
import { allowedFileTypes } from "../../config/constants";

const styles = {
    boxButtons: {
        color: "#fff",
        textAlign: "center",
        py: 1
    }
}

async function uploadComplaint(token, username, formData) {
    try {
        await axios.post(`${baseUrl}/citizen_portal/complaint/add?username=${username}`, formData, {
            headers: {
                "content-type": "multipart/form-data",
                'authorization': 'Bearer ' + token
            }
        })
        return { error: false }
    } catch (error) {
        return { error }
    }
}

export default function NewComplaint() {

    const userContext = useUserContext();
    const userData = userContext.useUser();

    const [data, setData] = useState({
        name: `${userData.first_name} ${userData.last_name}`, file: "", subject: "",
        aadhaar: "", description: ""
    });
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    }

    const handleFileChange = (file) => {
        setData(prev => ({ ...prev, file: file }));
        // uploadFile(file, controller, progressTracker).then().catch()
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('file', data.file);
        formData.append('subject', data.subject);
        formData.append('description', data.description);

        const { error } = await uploadComplaint(userData.token, userData.username, formData);
        if (error) {
            alert("Error Occured while posting complaint.")
        } else {
            alert("Complaint Posted.")
        }
    }

    return (
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="center" pb={5} >
                <Box sx={{ ...styles.boxButtons, backgroundColor: "#C60F2D" }}>
                    <Typography fontWeight={500} sx={{ textTransform: "none", width: "250px" }}>
                        New Complaint
                    </Typography>
                </Box>
            </Box>
            <Box component='form' onSubmit={handleFormSubmit} sx={{ maxWidth: "1200px", mx: "auto" }}>
                <Paper elevation={3} sx={{ px: 3, py: 4 }}>
                    <Box textAlign="center">
                        <Typography variant="h6">Complaint Details</Typography>
                    </Box>
                    <br />
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
                        {/* <Grid item xs={12} md={4} xl={4}>
                            <TextField size="small" 
                            fullWidth
                            label="Your ID" 
                            value={data.id}
                            name="id"
                            required
                            onChange={handleDataChange}
                            />
                        </Grid> */}
                        {/* <Grid item xs={12} md={4} xl={4}>
                            
                            <TextField size="small" 
                            fullWidth
                            label="Your Aadhaar No" 
                            value={data.aadhaar}
                            required
                            name="aadhaar"
                            onChange={handleDataChange}
                            type='file'
                            />
                        </Grid> */}
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
                        <Grid item>
                        <FileUploader
                                handleChange={handleFileChange}
                                name="file"
                                types={allowedFileTypes}
                            >
                            </FileUploader>
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
