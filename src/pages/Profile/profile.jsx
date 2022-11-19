import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

export default function Profile() {

    const [profileData, setProfileData] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProfileData('admin');
    }, []);

    async function getProfileData(username) {
        try {
            const { data } = await axios.get(`http://127.0.0.1:8000/citizen_portal/getprofile/?username=${username}`, {
                headers: {
                    'x-api-key': 12345,
                    'token': 'rdawebsite',
                    'client': 'website',
                    'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY4NjE5NzYwLCJpYXQiOjE2Njg2MTg0ODksImp0aSI6IjdkMGE3MDM1Zjg0NzRkNGJhZjIxM2Y2YjI5N2Q1NWUxIiwidXNlcl9pZCI6MX0.T7w0LK0to-lBa7PtV56TJ4GTbUJlAS_NgIEAznRLXac'
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