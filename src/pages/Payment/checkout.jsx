import {
    Box, Paper, Container, Grid, Button, Typography,
    TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useUserContext } from "../../components/UserContext";
import { baseUrl } from "../../config/api-config";

const styles = {
    boxButtons: {
        color: "#fff",
        textAlign: "center",
        py: 1
    }
}

async function getPaymentDetails(token, id) {
    try {
        const { data } = await axios.get(`${baseUrl}/citizen_portal/waterbill/create_order?id=${id}`, {
            headers: {
                'authorization': 'Bearer ' + token
            }
        })
        return { error: false, data }
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

async function payBill (payment) {
    try {
        const { data } = await axios.post(`https://api.razorpay.com/v1/checkout/embedded`, {
            "key_id": "rzp_test_8uV3BpCRDDD9Pt",
            "order_id": payment.order_id,
            "amount": payment.amount,
            "name": payment.fullname,
            "description": "RDA Water Bill",
            "prefill[email]": payment.Email,
            "prefill[contact]": payment.mobile_number,
            "callback_url": 'https://api.razorpay.com/v1/callback/razorpay'
        }, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': `Basic cnpwX3Rlc3RfOHVWM0JwQ1JEREQ5UHQ6THRaUVVuMG1ZOXNkOFYzdFA1YVhMQ3hq` 
            }
        })
        return { error: false, data }
    } catch (error) {
        return { error }
    }
}

export default function Checkout() {

    const userContext = useUserContext();
    const userData = userContext.useUser();

    const [alert, setAlert] = useState({ msg: "", type: "" });
    const params = useParams();

    const [payment, setPayment] = useState({ Email: "", amount: 0, fullname: "", id: 0, order_id: "", mobile_number: "" });
    useEffect(() => {
        if(!userData.token || !params.id) return;
        getPaymentDetails(userData.token, params.id).then(res => {
            if(res.error) {
                setAlert({ msg: "Error while fetching Payment detail", type: "error" });
            } else {
                setPayment(res.data);
            }
        })
    }, [userData.token]);

    async function handlePay () {
        const { error, data } = await payBill(payment);
        if(error) {
            console.log(error);
        } else {
            console.log(data);
        }
    }

    return (
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="center" pb={5} >
                <Box sx={{ ...styles.boxButtons, backgroundColor: "#C60F2D" }}>
                    <Typography fontWeight={500} sx={{ textTransform: "none", width: "250px" }}>
                        Checkout
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
                <Paper elevation={3} sx={{ px: 3, py: 4 }}>
                    {/* <form action="https://api.razorpay.com/v1/checkout/embedded" method="post">
                        <input type="hidden" name="key_id" value="rzp_test_8uV3BpCRDDD9Pt" />
                        <input type="hidden" name="order_id" value={payment.order_id} />
                        <input type="hidden" name="amount" value={payment.amount} />
                        <input type="hidden" name="name" value={payment.fullname} />
                        <input type="hidden" name="description" value="RDA Water Bill" />
                        <input type="hidden" name="prefill[email]" value={payment.Email} />
                        <input type="hidden" name="prefill[contact]" value={payment.mobile_number} />
                        <input type="hidden" name="callback_url" value={window.location.origin + '/callback/razorpay'} /> */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={10} md={6}>
                            <b>Email : </b> {payment.Email}
                        </Grid>
                        <Grid item xs={12} sm={10} md={6}>
                            <b>Name : </b> {payment.fullname}
                        </Grid>
                        <Grid item xs={12} sm={10} md={6}>
                            <b>Mobile : </b> {payment.mobile_number}
                        </Grid>
                        <Grid item xs={12} sm={10} md={6}>
                            <b>Amount : </b> {payment.amount}
                        </Grid>
                        <Grid item xs={12} sm={10} md={6}>
                            <b>Order Id : </b> {payment.order_id}
                        </Grid>
                        <Grid item xs={12} sm={10} md={6}>
                            <Button variant="contained" color="error" onClick={handlePay}>Pay</Button>
                        </Grid>
                    </Grid>
                    {/* </form> */}
                </Paper>
            </Box>
            <CustomSnackbar {...alert} onClose={() => setAlert({ msg: "", type: "" })} />
        </Container>
    )
}
