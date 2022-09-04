import React from 'react';

import {
    Box, Paper, Container, Grid, Button, Typography,
    TextField, LinearProgress, IconButton
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

const styles = {
    boxButtons: {
        color: "#fff",
        textAlign: "center",
        py: 1
    },
}

export default function Upload() {
    return (
        <Container maxWidth="xl">
            <Paper elevation={3} sx={{ px: 3, py: 4 }}>
                <Grid container columnGap={0}>
                    <Grid item md={6} lg={6}>
                        <LeftPart />
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <RightPart />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

// handle file
// function uploadFile (file, controller, progressTracker) {
//     return axios.post('', {}, {
//         headers: {
//             "content-type": "multipart/form-data"
//         },
//         signal: controller.signal,
//         onUploadProgress: progressTracker
//     })
// }

function LeftPart() {

    const uploaderRef = useRef();
    const [file, setFile] = useState(null);
    const [uploadProgess, setUploadProgress] = useState(0);
    const [docText, setDocText] = useState("");

    const controller = new AbortController();
    // const progressTracker = (event) => {
    //     setUploadProgress(Math.round((100 * event.loaded) / event.total))
    // } 

    const handleFileChange = (file) => {
        setFile(file);
        // uploadFile(file, controller, progressTracker).then().catch()
    }

    const onCurrentFileDelete = () => {
        if(uploadProgess) controller.abort();
        setFile(null);
    }

    return (
        <Box sx={{ px: 2 }} >
            <Box sx={{ ...styles.boxButtons, 
                backgroundColor: "#C60F2D", maxWidth: 350, mx: 'auto' 
            }}>
                Upload Document
            </Box>
            <br />
            <Box sx={{ pr: 4, pt: 2 }}>
                <Grid container rowSpacing={4} justifyContent='center'>
                    <Grid item xl={9} lg={10} md={11}>
                        <TextField size='small' fullWidth
                            placeholder='Enter details about the document'
                            value={docText}
                            onChange={(e) => { setDocText(e.target.value) }}
                        />
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
                            onClick={() => { uploaderRef.current.click() }}
                        >
                            Select File
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

function RightPart () {

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
                            <FilesBox file={f}/>
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