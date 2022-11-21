import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserContext } from "./UserContext";
import axios from "axios";
import { baseUrl } from "../config/api-config";

function getQueryValues(query) {
    const accessKey = query.get("accesskey");
    const refreshKey = query.get("refreshkey");
    const username = query.get("username");
    const status = query.get("status");

    const noQuery = [status, accessKey, refreshKey, username].every(i => !i);
    return { noQuery, status, accessKey, refreshKey, username }
}

async function getUserProfile (token, username) {
    try {
        const { data } = await axios.get(`${baseUrl}/citizen_portal/getprofile?username=${username}`, {
            headers: {
                // 'x-api-key': 12345,
                // 'token': 'rdawebsite',
                // 'client': 'website',
                'authorization': 'Bearer '+token
            }
        });

        return { error: false, data };
    } catch (error) {
        return { error }
    }
}

function setToSessionStorage (data) {
    sessionStorage.setItem('data', JSON.stringify(data));
}

export default function LoginHandler() {

    const [loading, setLoading] = useState(true);
    const [screenMsg, setScreenMsg] = useState("Logging In ...");
    const navigate = useNavigate();
    const [query] = useSearchParams();
    const { noQuery, status, accessKey, refreshKey, username } = getQueryValues(query);

    const userContext = useUserContext();
    const userData = userContext.useUser();
    const updateUser = userContext.useUserUpdate();


    useEffect(() => {
        if (noQuery) {
            setScreenMsg("Some Error Occured. Please Try again later.");
            setLoading(false);
        } else {
            localStorage.setItem("refresh", refreshKey);
            sessionStorage.setItem('access', accessKey);
            sessionStorage.setItem('verified', /^true$/gi.test(status));
            sessionStorage.setItem('username', username);
            getUserProfile(accessKey, username).then((res) => {
                if(res.error) {
                    setScreenMsg("Error Occured while fetching User Profile");
                    setLoading(false);
                } else {
                    setToSessionStorage(res.data);
                    updateUser({...res.data, verified: /^true$/gi.test(status), token: accessKey, username});
                    navigate("/citizen_portal", { replace: true });
                    setLoading(false);
                }
            })
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