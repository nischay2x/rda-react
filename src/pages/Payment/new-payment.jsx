import {
    Box, Paper, Container, Grid, Button, Typography,
    TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
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

    const [alert, setAlert] = useState({ msg: "", type: "" });

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
            setAlert({ msg: "Error Occured while posting complaint.", type: "error" });
        } else {
            setAlert({ msg: "Complaint Posted.", type: "success" });
        }
    }

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

    function onBillPay (index) {
        setAlert({ msg: "Bill Payment Successfull", type: "success" });
        setBills(prev => prev.filter((b, i) => i !== index));
    }

    return (
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="center" pb={5} >
                <Box sx={{ ...styles.boxButtons, backgroundColor: "#C60F2D" }}>
                    <Typography fontWeight={500} sx={{ textTransform: "none", width: "250px" }}>
                        Bills
                    </Typography>
                </Box>
            </Box>
            <Box component='form' onSubmit={handleFormSubmit} sx={{ maxWidth: "1200px", mx: "auto" }}>
                <Paper elevation={3} sx={{ px: 3, py: 4 }}>
                    {
                        bills.map((b, i) => <Box key={i}>
                            <Box display='flex' flexWrap='wrap' justifyContent='space-between' columnGap={3} alignItems='center' px={2} py={1} m={1} sx={{ border: '1px solid lightgray' }}>
                                <Typography variant="h5">&#8377; {b.total_amount}</Typography>
                                <Box>
                                    <Typography>{b.remark}</Typography>
                                    <Typography>{b.month}</Typography>
                                </Box>
                                <Typography>Due: {new Date(b.end_date).toLocaleDateString()}</Typography>
                                <Button ml='auto' variant="contained" onClick={() => onBillPay(i)}>
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
