import React, { useState } from "react";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import {
  AddIcCall, MailOutline, Facebook, Instagram, Twitter, Person,
  KeyboardArrowDown, CurrencyRupee, Comment, ListAlt, Description,
} from "@mui/icons-material";
import {
  Box, Link, Typography, Avatar, Button, Menu, MenuItem,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import {
  tollFree, phone, mail, facebook, instagram, twitter,
} from "../config/constants";

const styles = {
  infoBar: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "var(--dark-blue)",
    padding: "0.8rem 2rem",
    color: "#fff",
  },
  phoneLink: {
    display: "flex",
    alignItems: "center",
    columnGap: "5px",
    fontSize: "0.8rem",
  },
  appBar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.8rem 2rem",
    alignItems: "center",
    borderBottom: "1px solid black",
  },
  siteTitle: {
    display: "flex",
    alignItems: "center",
    columnGap: "10px",
  },
  mainHold: {
    py: 4,
    px: 2,
    zIndex: 2,
  },
};

const theme = createTheme({
  typography: {
    fontFamily: [
      "Poppins",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: {
      main: "#323C5B",
    },
    secondary: {
      main: "#C60F2D",
    },
  },
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

  const navigate = useNavigate()

  return (
    <ThemeProvider theme={theme}>
      <Box sx={styles.infoBar}>
        <Box display="flex" columnGap={2}>
          <Link
            href={`tel:${tollFree}`}
            color="inherit"
            underline="none"
            sx={styles.phoneLink}
          >
            <AddIcCall /> Toll Free - {tollFree}
          </Link>
          <Link
            href={`tel:${phone}`}
            color="inherit"
            underline="none"
            sx={styles.phoneLink}
          >
            <AddIcCall /> Phone - {phone}
          </Link>
        </Box>
        <Box display="flex" columnGap={2}>
          <Link
            href={`mailto:${mail}`}
            color="inherit"
            underline="none"
            sx={styles.phoneLink}
          >
            <MailOutline /> {mail}
          </Link>
          <Link
            href={facebook}
            color="inherit"
            underline="none"
            sx={styles.phoneLink}
          >
            <Facebook />
          </Link>
          <Link
            href={instagram}
            color="inherit"
            underline="none"
            sx={styles.phoneLink}
          >
            <Instagram />
          </Link>
          <Link
            href={twitter}
            color="inherit"
            underline="none"
            sx={styles.phoneLink}
          >
            <Twitter />
          </Link>
        </Box>
      </Box>
      <Box sx={styles.appBar}>
        <Box sx={styles.siteTitle}>
          <Avatar
            alt="Site Logo"
            sx={{ width: 35, height: 35 }}
            src="/images/rda_logo.png"
            variant="square"
          />
          <Typography fontWeight="600" fontSize="1.1rem" fontFamily="inherit">
            RAIPUR DEVELOPMENT AUTHORITY
          </Typography>
        </Box>
        <Box display="flex"
          style={{ postion: "sticky", top: 0, zIndex: 3, backgroundColor: "#fff" }}
        >
          <DropDownMenu icon={<Description/>} mainText="Documents" 
            listItems={[
              { text: "Upload", to: "/documents" },
              { text: "View", to: "/documents/list" },
            ]} 
          />

          <DropDownMenu icon={<ListAlt />} mainText="Services" 
            listItems={[
              { text: "Search Plot", to: "/services/plot-search" },
              { text: "Bid Plot", to: "/services/plot-bid" },
            ]} 
          />

          <DropDownMenu icon={<Comment />} mainText="Complaints" 
            listItems={[
              { text: "New Complaint", to: "/complaint" },
              { text: "Track Complaint", to: "/complaint/track" },
            ]} 
          />

          <DropDownMenu icon={<CurrencyRupee />} mainText="Payments" 
            listItems={[
              { text: "New Complaint", to: "/complaint" },
              { text: "Track Complaint", to: "/complaint/track" },
            ]} 
          />

          <DropDownMenu icon={<Person />} mainText="Profile" variant="contained"
            listItems={[
              { text: "New Complaint", to: "/complaint" },
              { text: "Track Complaint", to: "/complaint/track" },
            ]} 
          />
          
        </Box>
      </Box>
      <Box sx={styles.mainHold}>{children}</Box>
    </ThemeProvider>
  );
}

function DropDownMenu({ mainText, listItems = [], icon, variant = "standard" }) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        id={`${mainText}-button`}
        aria-controls={open ? `${mainText}-menu` : undefined}
        aria-haspopup="true"
        variant={variant}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {icon}
        <span style={{ padding: "0 3px" }}>{mainText}</span>
        <KeyboardArrowDown />
      </Button>
      <Menu
        className="nav-links"
        id={`${mainText}-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": `${mainText}-button` }}
      >
        {
          listItems.map((l, i) => <MenuItem key={i}>
            <RouteLink to={l.to}>{l.text}</RouteLink>
          </MenuItem>)
        }
      </Menu>
    </Box>
  )
}