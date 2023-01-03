import { 
    Button, Grid, Paper, TextField,
    Box, Dialog, DialogTitle, DialogContent, DialogActions,
    FormControl, RadioGroup, Radio, FormControlLabel, FormLabel, MenuItem
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../../components/UserContext";
import { baseUrl } from "../../config/api-config";
import { Container } from "@mui/system";
import CustomSnackbar from "../../components/CustomSnackbar";
import { FileUploader } from "react-drag-drop-files";
import { FileUpload } from "@mui/icons-material";

const defaultProfilePic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';

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

async function updateProfileImage(token, username, newImage) {
    try {
        const { data } = await axios.post(`${baseUrl}/citizen_portal/edit/profile_image?username=${username}`, { image: newImage }, {
            headers: {
                'content-type': 'multipart/form-data',
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
    const [alert, setAlert] = useState({ msg: "", type: "" });
    const [profilePic, setProfilePic] = useState(JSON.parse(sessionStorage.getItem('data')).image || defaultProfilePic)

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
            setAlert({ msg: "Error in updating profile data.", type: "error"})
        } else {
            setAlert({ msg: "Profile Updated", type: "success" });
            let sd = JSON.parse(sessionStorage.getItem('data'));
            sd = { ...sd, ...data };
            sessionStorage.setItem('data', JSON.stringify(sd));
            setEditDisabled(true)
            // window.location.reload();
        }
    }

    const [editPasswordOpen, setEditPasswordOpen] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);

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
                <Box pb={2} display="flex" alignItems='center' justifyContent='space-between' columnGap={2}>
                    <Box sx={{ width: '5rem', height: '5rem', borderRadius: '50%', overflow: 'hidden' }}>
                        <img src={profilePic} alt="profile pic" width='100%' />
                    </Box>
                    <Box display='flex' columnGap={2}>
                        <Button variant="contained" size="small" onClick={() => setEditDisabled(prev => !prev)}> {editDisabled ? "Edit Data" : "Cancel"}</Button>
                        {
                            editDisabled ? <></> :
                                <Button variant="contained" color="info" size="small" onClick={onProfileUpdate}>Save</Button>
                        }
                        <Button variant="contained" color="warning" size="small"
                            onClick={() => setEditPasswordOpen(true)}
                        >
                            Edit Password
                        </Button>
                        <Button variant="contained" color="warning" size="small" component="label"
                            onClick={() => setEditProfileOpen(true)}
                        >
                            Change Image
                        </Button>
                    </Box>
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
                            select
                        >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>
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
            <CustomSnackbar {...alert} onClose={() => setAlert({ msg: "", type: "" })} />
            <EditPasswordDialog setAlert={setAlert} username={userData.username} token={userData.token} open={editPasswordOpen} setOpen={setEditPasswordOpen} />
            <ChangeImageDialog  setAlert={setAlert} username={userData.username} token={userData.token} open={editProfileOpen} setOpen={setEditProfileOpen} onDone={(url) => setProfilePic(url)} />
        </Container>
    )
}

function EditPasswordDialog({ token, open, setOpen, username, setAlert }) {

    const [password, setPassword] = useState("");
    async function onNewPasswordSave() {
        if (!password) alert("Nothing To Update.");
        else {
            const { error } = await updatePassword(token, username, password);
            if (error) {
                setAlert({ msg: "Error while updating password", type: "error"});
                setOpen(false)
            } else {
                setAlert({ msg: "Password Updated", type: "success"});
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

function ChangeImageDialog({ token, open, setOpen, username, setAlert, onDone }) {

    const [newImage, setNewImage] = useState("");
    async function onNewPasswordSave() {
        if (!newImage) alert("Nothing To Update.");
        else {
            const { error, data } = await updateProfileImage(token, username, newImage);
            if (error) {
                setAlert({ msg: "Error while updating image", type: "error"});
                setOpen(false)
            } else {
                let temp = JSON.parse(sessionStorage.getItem('data'));
                temp.image = baseUrl + data.image;
                sessionStorage.setItem('data', JSON.stringify(temp));
                onDone(baseUrl + data.image);
                setAlert({ msg: "Image Updated", type: "success"});
                setOpen(false)
            }
        }
    }

    function handleFileChange (file) {
        setNewImage(file)
    }


    return <Dialog open={open} onClose={() => { }} >
        <DialogTitle>Change Profile Image</DialogTitle>
        <DialogContent>
            <Box pt={1}>
                <FileUploader
                    handleChange={handleFileChange}
                    name="file"
                >
                    <Box p={2} border="1px dashed #454545" borderRadius={2}
                        display="flex" alignItems="center" columnGap={2} justifyContent='center'
                    >
                        <FileUpload/>  Click / Drag to Upload
                    </Box>
                </FileUploader>
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