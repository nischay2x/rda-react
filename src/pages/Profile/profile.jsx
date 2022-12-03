import { 
    Button, Grid, Paper, TextField,
    Box, Dialog, DialogTitle, DialogContent, DialogActions,
    FormControl, RadioGroup, Radio, FormControlLabel, FormLabel
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useUserContext } from "../../components/UserContext";
import { baseUrl } from "../../config/api-config";
import { Container } from "@mui/system";

async function updateProfile(token, username, data) {
    try {
        await axios.post(`${baseUrl}/citizen_portal/edit/profile?username=${username}`, data, {
            headers: {
                authorization: 'Bearer ' + token
            }
        });
        return { error: false, data };
    } catch (error) {
        return { error };
    }
}

async function updatePassword(token, username, newPassword) {
    try {
        const { data } = await axios.post(`${baseUrl}/citizen_portal/edit/password?username=${username}`, { password: newPassword }, {
            headers: {
                authorization: 'Bearer ' + token
            }
        });
        return { error: false, data };
    } catch (error) {
        return { error };
    }
}

export default function Profile() {

    // const [profileData, setProfileData] = useState("");
    // const [loading, setLoading] = useState(true);
    const userContext = useUserContext();
    const userData = userContext.useUser();


    const [profileData, setProfileData] = useState({
        first_name: "", middle_name: "", last_name: "", Ews: "", mobile_number: "",
        aadhar_number: "", Email: "", age: "", gender: "", address: ""
    });

    const [editDisabled, setEditDisabled] = useState(true);
    const onInputChange = ({ target }) => {
        const { value, name } = target;
        setProfileData(prev => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        setProfileData(extractProfileData(userData));
    }, [userData]);

    const onProfileUpdate = async () => {
        const { error, data } = await updateProfile(userData.token, userData.username, profileData);
        if (error) {
            alert("Error in updating profile data.")
        } else {
            alert("Profile Updated");
            let sd = JSON.parse(sessionStorage.getItem('data'));
            sd = { ...sd, ...data };
            sessionStorage.setItem('data', JSON.stringify(sd));
            window.location.reload();
        }
    }

    const [editPasswordOpen, setEditPasswordOpen] = useState(false);

    // useEffect(() => {
    //     getProfileData(profileData.username);
    // }, []);

    // async function getProfileData(username) {
    //     try {
    //         const { data } = await axios.get(`${baseUrl}/citizen_portal/getprofile?username=${username}`, {
    //             headers: {
    //                 // 'x-api-key': 12345,
    //                 // 'token': 'rdawebsite',
    //                 // 'client': 'website',
    //                 'authorization': 'Bearer '+profileData.token
    //             }
    //         });

    //         setProfileData(JSON.stringify(data));
    //     } catch (error) {
    //         console.log(error);
    //         alert("Error Occured, See Console.")
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    return (
        <Container maxWidth="xl">
            <Paper elevation={3} sx={{ p: 2 }}>
                <Box pb={2} display="flex" justifyContent='flex-end' columnGap={2}>
                    <Button variant="contained" size="small" onClick={() => setEditDisabled(prev => !prev)}> {editDisabled ? "Edit" : "Cancel"}</Button>
                    {
                        editDisabled ? <></> :
                            <Button variant="contained" color="info" size="small" onClick={onProfileUpdate}>Save</Button>
                    }
                    <Button variant="contained" color="warning" size="small"
                        onClick={() => setEditPasswordOpen(true)}
                    >
                        Edit Password
                    </Button>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
                        <TextField fullWidth size="small" label="First Name" value={profileData.first_name}
                            disabled={editDisabled} onChange={onInputChange} name="first_name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
                        <TextField fullWidth size="small" label="Middle Name" value={profileData.middle_name}
                            disabled={editDisabled} onChange={onInputChange} name="middle_name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
                        <TextField fullWidth size="small" label="Last Name" value={profileData.last_name}
                            disabled={editDisabled} onChange={onInputChange} name="last_name"
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
                        <TextField fullWidth size="small" label="Mobile" value={profileData.mobile_number}
                            disabled={editDisabled} onChange={onInputChange} name="mobile_number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
                        <TextField fullWidth size="small" label="Adhaar Number" value={profileData.aadhar_number}
                            disabled={editDisabled} onChange={onInputChange} name="aadhar_number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
                        <TextField fullWidth size="small" label="Email" value={profileData.Email}
                            disabled={editDisabled} onChange={onInputChange} name="Email"
                        />
                    </Grid>
                    <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
                        <TextField fullWidth size="small" label="Age" value={profileData.age}
                            disabled={editDisabled} onChange={onInputChange} name="age"
                        />
                    </Grid>
                    <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
                        <TextField fullWidth size="small" label="Gender" value={profileData.gender}
                            disabled={editDisabled} onChange={onInputChange} name="gender"
                        />
                    </Grid>
                    <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
                        <TextField fullWidth size="small" label="Address" value={profileData.address}
                            disabled={editDisabled} onChange={onInputChange} name="address"
                        />
                    </Grid>
                    <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
                        <FormControl disabled={editDisabled}>
                            <FormLabel id="demo-radio-buttons-group-label">Ews</FormLabel>
                            <RadioGroup 
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={profileData.Ews ? "YES": "NO"}
                                name="Ews"
                                onChange={(e) => onInputChange({ target: { name: "Ews", value: e.target.value === "YES" } })}
                            >
                                <FormControlLabel value="YES" control={<Radio />} label="Yes" />
                                <FormControlLabel value="NO" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
            <EditPasswordDialog username={userData.username} token={userData.token} open={editPasswordOpen} setOpen={setEditPasswordOpen} />
        </Container>
    )
}

function EditPasswordDialog({ token, open, setOpen, username }) {

    const [password, setPassword] = useState("");
    async function onNewPasswordSave() {
        if (!password) alert("Nothing To Update.");
        else {
            const { error } = await updatePassword(token, username, password);
            if (error) {
                alert("Error while updating password");
                setOpen(false)
            } else {
                alert("Password Updated");
                setOpen(false)
            }
        }
    }

    return <Dialog open={open} onClose={() => { }} >
        <DialogTitle>Edit Password</DialogTitle>
        <DialogContent>
            <Box pt={1}>

                <TextField label="New Password" fullWidth size="small" value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpen(false)} variant="contained" color="warning" size="small" >Cancel</Button>
            <Button onClick={onNewPasswordSave} variant="contained" size="small" >Change</Button>
        </DialogActions>
    </Dialog>
}

// first_name: "", last_name: "", Ews: "", mobile_number: "",
// aadhar_number: "", Email: "", age: "", gender: "", address: ""

function extractProfileData(data) {
    return {
        first_name: data.first_name || "",
        middle_name: data.middle_name || "",
        last_name: data.last_name || "",
        Ews: data.Ews || "",
        mobile_number: data.mobile_number || "",
        aadhar_number: data.aadhar_number || "",
        Email: data.Email || "",
        age: data.age || "",
        gender: data.gender || "",
        address: data.address || ""
    }
}

function feedProfileData(data) {
    return {
        first_name: data.first,
        last_name: data.last,
        Ews: data.ews,
        mobile_number: data.phone_no,
        aadhar_number: data.aadhar_no,
        email: data.email,
        age: data.age,
        gender: data.gender,
        address: data.address
    }
}