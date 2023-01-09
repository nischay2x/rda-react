import {
    Box, Paper, Container, Grid, Button, Typography,
    TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../components/CustomSnackbar";
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

async function getWaterBill (token, username) {
    try {
        const { data } = await axios.get(`${baseUrl}/citizen_portal/bill/waterbill?username=${username}`, {
            headers: {
                "content-type": "multipart/form-data",
                'authorization': 'Bearer ' + token
            }
        })
        return { error: false, data }
    } catch (error) {
        return { error }
    }
}

export default function NewPayment() {

    const userContext = useUserContext();
    const userData = userContext.useUser();
    const navigate = useNavigate();

    const [alert, setAlert] = useState({ msg: "", type: "" });

    const [bills, setBills] = useState([]);
    useEffect(() => {
        if(!userData.token) return;
        getWaterBill(userData.token, userData.username).then(res => {
            if(res.error) {
                setAlert({ msg: "Error while fetching bill detail", type: "error" });
            } else {
                setBills(res.data);
            }
        })
    }, [userData.token]);


    return (
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="center" pb={5} >
                <Box sx={{ ...styles.boxButtons, backgroundColor: "#C60F2D" }}>
                    <Typography fontWeight={500} sx={{ textTransform: "none", width: "250px" }}>
                        Bills
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
                <Paper elevation={3} sx={{ px: 3, py: 4 }}>
                    {
                        bills.map((b, i) => <Box key={i}>
                            <Box display='flex' flexWrap='wrap' justifyContent='space-between' columnGap={3} alignItems='center' px={2} py={1} m={1} sx={{ border: '1px solid lightgray' }}>
                                <Typography variant="h5">&#8377; {b.total_amount}</Typography>
                                <Box>
                                    <Typography>{b.bill_type}</Typography>
                                    <Typography>{b.month}</Typography>
                                </Box>
                                <Typography>Due: {new Date(b.end_date).toLocaleDateString()}</Typography>
                                <Button ml='auto' variant="contained" onClick={() => navigate(`${b.id}`)}>
                                    Pay Now
                                </Button>
                            </Box>
                        </Box>)
                    }
                </Paper>
            </Box>
            <CustomSnackbar {...alert} onClose={() => setAlert({ msg: "", type: "" })} />
        </Container>
    )
}
