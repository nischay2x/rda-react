import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useUserContext } from "../../components/UserContext";
import { baseUrl } from "../../config/api-config";

export default function Profile() {

    const [profileData, setProfileData] = useState("");
    const [loading, setLoading] = useState(true);
    const userContext = useUserContext();
    const userData = userContext.useUser();

    useEffect(() => {
        getProfileData(userData.username);
    }, []);

    async function getProfileData(username) {
        try {
            const { data } = await axios.get(`${baseUrl}/citizen_portal/getprofile?username=${username}`, {
                headers: {
                    'x-api-key': 12345,
                    'token': 'rdawebsite',
                    'client': 'website',
                    'authorization': 'Bearer '+userData.token
                }
            });

            setProfileData(JSON.stringify(data));
        } catch (error) {
            console.log(error);
            alert("Error Occured, See Console.")
        } finally {
            setLoading(false);
        }
    }

    return (<>
        {
            loading ? <CircularProgress /> : <></>
        }
        <Typography>{profileData}</Typography>
    </>
    )
}