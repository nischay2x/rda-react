import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function getQueryValues(query) {
    const status = query.get("status");
    const code = query.get("code");
    const error = query.get("error");
    const verified = query.get("verified");

    const noQuery = [status, code, error, verified].every(i => !i);
    return { noQuery, status, code, error, verified }
}

export default function LoginHandler() {

    const [loading, setLoading] = useState(true);
    const [screenMsg, setScreenMsg] = useState("Logging In ...");
    const navigate = useNavigate();
    const [query] = useSearchParams();
    const { noQuery, status, error, verified, code } = getQueryValues(query);


    useEffect(() => {
        if (noQuery || error) {
            setScreenMsg("Some Error Occured. Please Try again later.");
            setLoading(false);
        } else {
            if (!verified || verified === 'false') {
                setScreenMsg("Your Account is not Verified Yet. You cannot access the portal at this time.")
            } else if (code) {
                sessionStorage.setItem('token', code);
                setScreenMsg("Welcome.");
                navigate("/citizen_portal", { replace: true });
            }
            setLoading(false);
        }
    }, [noQuery])

    return (
        <Box sx={{ width: "100%", height: "97vh", display: 'grid', placeItems: 'center' }}>
            <Box display='flex' flexDirection='column' alignItems='center' rowGap={2}>
                {
                    loading ? <CircularProgress /> : <></>
                }

                <Typography variant="h4" >{screenMsg}</Typography>
            </Box>
        </Box>
    )
}