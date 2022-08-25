import React from 'react';

import { AddIcCall, MailOutline, Facebook, Instagram, Twitter, Person, KeyboardArrowDown } from '@mui/icons-material';
import { Box, Link, Typography, Avatar, Button, Menu, MenuItem } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles"

import { tollFree, phone, mail, facebook, instagram, twitter } from '../config/constants';

const styles = {
    infoBar: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "var(--dark-blue)",
        padding: "0.8rem 2rem",
        color: "#fff"
    },
    phoneLink: {
        display: "flex",
        alignItems: "center",
        columnGap: "5px",
        fontSize: "0.8rem"
    },
    appBar: {
        display: "flex",
        justifyContent: "space-between",
        padding: "0.8rem 2rem",
        alignItems: "center",
        borderBottom: "1px solid black"
    },
    siteTitle: {
        display: "flex",
        alignItems: "center",
        columnGap: "10px"
    },
    profileMenu: {

    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#323C5B"
        },
        secondary: {
            main: '#E33E7F'
        }
    }
});

export default function Layout({ children }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={styles.infoBar} >
                <Box display="flex" columnGap={2} >
                    <Link href={`tel:${tollFree}`} color="inherit" underline="none" sx={styles.phoneLink}>
                        <AddIcCall /> Toll Free - {tollFree}
                    </Link>
                    <Link href={`tel:${phone}`} color="inherit" underline="none" sx={styles.phoneLink}>
                        <AddIcCall /> Phone - {phone}
                    </Link>
                </Box>
                <Box display="flex" columnGap={2} >
                    <Link href={`mailto:${mail}`} color="inherit" underline="none" sx={styles.phoneLink}>
                        <MailOutline /> {mail}
                    </Link>
                    <Link href={facebook} color="inherit" underline="none" sx={styles.phoneLink}>
                        <Facebook />
                    </Link>
                    <Link href={instagram} color="inherit" underline="none" sx={styles.phoneLink}>
                        <Instagram />
                    </Link>
                    <Link href={twitter} color="inherit" underline="none" sx={styles.phoneLink}>
                        <Twitter />
                    </Link>
                </Box>
            </Box>
            <Box sx={styles.appBar}>
                <Box sx={styles.siteTitle}>
                    <Avatar alt="Site Logo" sx={{ width: 35, height: 35 }} src="/images/rda_logo.png" variant="square" />
                    <Typography fontWeight="600" fontSize="1.1rem" fontFamily="inherit">
                        RAIPUR DEVELOPMENT AUTHORITY
                    </Typography>
                </Box>
                <Box display="flex" columnGap={2}>
                    <Box>
                        <Button id="profile-button" aria-controls={open ? 'profile-menu' : undefined} aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined} onClick={handleClick} variant="contained" color="primary"
                        > <Person /> <span style={{ padding: "0 3px" }} >Profile</span> <KeyboardArrowDown />
                        </Button>
                        <Menu id="profile-menu" anchorEl={anchorEl} open={open} onClose={handleClose}
                            MenuListProps={{'aria-labelledby': 'profile-button'}}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Box>
            <div>This IS RENDERING</div>
        </ThemeProvider>
    )
}
