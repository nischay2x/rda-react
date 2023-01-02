import React, { useEffect } from 'react';

import {
    Box, Paper, Container, Grid, Button, Typography,
    TextField, LinearProgress, IconButton, MenuItem
} from "@mui/material";
import {
    FileUpload as FileUploadIcon,
    InsertDriveFileOutlined,
    Delete as DeleteIcon
} from '@mui/icons-material';

import { FileUploader } from 'react-drag-drop-files';
import { allowedFileTypes, recentUploads } from '../../config/constants';
import { useRef } from 'react';
import { useState } from 'react';

import axios from 'axios';
import { useUserContext } from '../../components/UserContext';
import { baseUrl } from '../../config/api-config';
import CustomSnackbar from '../../components/CustomSnackbar';

const styles = {
    boxButtons: {
        color: "#fff",
        textAlign: "center",
        py: 1
    },
}

export default function Upload() {

    const [alert, setAlert] = useState({ msg: "", type: "" });

    return (
        <Container maxWidth="xl">
            <Paper elevation={3} sx={{ px: 3, py: 4 }}>
                <Grid container columnGap={0}>
                    <Grid item md={12} lg={12}>
                        <LeftPart setAlert={setAlert} />
                    </Grid>
                    {/* <Grid item md={6} lg={6}>
                        <RightPart />
                    </Grid> */}
                </Grid>
            </Paper>
            <CustomSnackbar {...alert} onClose={() => setAlert({msg: "", type: ""})} />
        </Container>
    )
}

// handle file
function uploadFormData (token, username, formData, controller, progressTracker) {
    return axios.post(`${baseUrl}/citizen_portal/document/add?username=${username}`, formData, {
        headers: {
            "content-type": "multipart/form-data",
            'authorization': 'Bearer '+token
        },
        signal: controller.signal,
        onUploadProgress: progressTracker
    })
}

async function getRecentFiles (token, username) {
    try {
        const { data } = await axios.get(`${baseUrl}/citizen_portal/document/recent?username=${username}`, {
            headers: {
                authorization: 'Bearer '+token
            }
        });
        
        return { error: false, data }
    } catch (error) {
        return { error }
    }
}

function LeftPart({ setAlert }) {

    const uploaderRef = useRef();
    const [file, setFile] = useState(null);
    const [uploadProgess, setUploadProgress] = useState(0);
    const [docText, setDocText] = useState("");
    const [docType, setDocType] = useState("");
    const userContext = useUserContext();
    const userData = userContext.useUser();


    const controller = new AbortController();
    const progressTracker = (event) => {
        setUploadProgress(Math.round((100 * event.loaded) / event.total))
    } 

    const handleFileChange = (file) => {
        setFile(file);
        // uploadFile(file, controller, progressTracker).then().catch()
    }

    const onCurrentFileDelete = () => {
        if (uploadProgess) controller.abort();
        setFile(null);
    }

    const onSubmit = async () => {
        try {
            let formData = new FormData();
            formData.append("name", file.name);
            formData.append("doc_type", docType)
            // formData.append("users", docUsers.join(","));
            formData.append("file", file);
            // for (const key of Object.keys(files)) {
            //     formData.append('files', files[key])
            // }

            await uploadFormData(userData.token, userData.username, formData, controller, progressTracker);
            setAlert({msg: "Success", type: "success"});
            setFile(null);
        } catch (error) {
            console.log(error);
            setAlert({msg: "Error Occured", type: "error"});
        }
    }

    return (
        <Box sx={{ px: 2 }} >
            <Box sx={{
                ...styles.boxButtons,
                backgroundColor: "#C60F2D", maxWidth: 350, mx: 'auto'
            }}>
                Upload Document
            </Box>
            <br />
            <Box sx={{ pr: 4, pt: 2 }}>
                <Grid container rowSpacing={4} justifyContent='center'>
                    {/* <Grid item xl={8} lg={10} md={8}>
                        <TextField size='small' fullWidth
                            placeholder='Enter details about the document'
                            value={docText}
                            onChange={(e) => { setDocText(e.target.value) }}
                        />
                    </Grid> */}
                    <Grid item xl={4} lg={10} md={4}>
                        <TextField size='small' fullWidth
                            value={docType}
                            required
                            label="Document Type"
                            select
                            onChange={(e) => { setDocType(e.target.value) }}
                        >
                            <MenuItem value="">- Select -</MenuItem>
                            <MenuItem value="Identification">Identification</MenuItem>
                            <MenuItem value="Home">Home</MenuItem>
                            <MenuItem value="EWS">EWS</MenuItem>
                            <MenuItem value="NOC">NOC</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xl={9} lg={10} md={11}>
                        <FileUploader
                            handleChange={handleFileChange}
                            name="file"
                            types={allowedFileTypes}
                        >
                            <Box ref={uploaderRef} py={4} border="1px dashed #454545" borderRadius={2}
                                display="flex" alignItems="center" columnGap={2} justifyContent='center'
                            >
                                <FileUploadIcon /> Drag and Drop here
                            </Box>
                        </FileUploader>
                    </Grid>
                    <Grid item textAlign='center' xl={9} lg={10} md={11}>
                        <Button variant='contained' sx={{ textTransform: "none", px: 4 }} color="primary"
                            onClick={onSubmit}
                        >
                            Upload File
                        </Button>
                    </Grid>
                    <Grid item xl={9} lg={10} md={11}>
                        {
                            Boolean(file) ?
                                <Box p={2} border="1px solid #D5DDD5" borderRadius={2} backgroundColor="#D8E9F0"
                                    display="flex" alignItems="center"
                                >
                                    <InsertDriveFileOutlined fontSize='large' />
                                    <Box px={1} width="100%">
                                        <Typography mb={1} fontSize='small'>
                                            {file?.name} ({formatFileSize(file?.size)})
                                        </Typography>
                                        <LinearProgress variant="determinate" value={uploadProgess} />
                                    </Box>
                                    <IconButton color='error' onClick={onCurrentFileDelete}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                                : <></>
                        }
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

function RightPart({ setAlert }) {

    const userContext = useUserContext();
    const userData = userContext.useUser();

    useEffect(() => {
        if(!userData.token || !userData.username) return;
        getRecentFiles(userData.token, userData.username).then(res => {
            if(res.error) {
                alert("Error Occured while fetching recent files")
            } else {
                console.log(res.data);
            }
        })
    }, [userData.token, userData.username])

    return (
        <Box sx={{ px: 2 }} >
            <Box sx={{
                ...styles.boxButtons,
                backgroundColor: "#C60F2D", maxWidth: 350, mx: 'auto'
            }}>
                Recent Uploads
            </Box>
            <br />
            <Box sx={{ pl: 4, pt: 2, borderLeft: "1px solid #ddd" }}>
                <Grid container rowSpacing={3} justifyContent='center'>
                    {
                        recentUploads.map((f, i) =>
                            <Grid item xl={9} lg={10} md={11} key={i}>
                                <FilesBox file={f} />
                            </Grid>
                        )
                    }
                    <Grid item textAlign='center' xl={9} lg={10} md={11}>
                        <Button variant='contained' sx={{ textTransform: "none", px: 4 }} color="primary"
                            onClick={() => { }}
                        >
                            View All
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

function FilesBox({ file }) {
    return (
        <Box p={2} border="1px solid #D5DDD5" borderRadius={2}
            display="flex" alignItems="center"
        >
            <InsertDriveFileOutlined fontSize='large' />
            <Box px={1} width="100%">
                <Typography mb={1} fontSize='small'>
                    {file?.name} ({formatFileSize(file?.size)})
                </Typography>
                <LinearProgress variant="determinate" value={100} />
            </Box>
            <IconButton color='error' >
                <DeleteIcon />
            </IconButton>
        </Box>
    )
}

function formatFileSize(bytes = 0, decimalPoint) {
    if (bytes == 0) return '0 Bytes';
    var k = 1000,
        dm = decimalPoint || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}