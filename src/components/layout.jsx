import React from "react";
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
        <Box
          display="flex"
          columnGap={2}
          style={{
            postion: "sticky",
            top: 0,
            zIndex: 3,
            backgroundColor: "#fff",
          }}
        >
          <Box>
            <Button
              id="documents-button"
              aria-controls={open ? "documents-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              // onClick={handleClick}
              onClick={() => { navigate("/documents", { replace: true }) }}
            >
              <Description />
              <span style={{ padding: "0 3px" }}>Documents</span>
              <KeyboardArrowDown />
            </Button>
            <Menu
              id="documents-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "documents-button" }}
            >
              <MenuItem>
                <RouteLink to="documents">Upload</RouteLink>
              </MenuItem>
              <MenuItem>
                <RouteLink to="documents/list">View</RouteLink>
              </MenuItem>
            </Menu>
          </Box>
          <Box>
            <Button
              id="services-button"
              aria-controls={open ? "services-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              // onClick={handleClick}
              onClick={() => { navigate("/services/plot-search", { replace: true }) }}
            >
              <ListAlt /> <span style={{ padding: "0 3px" }}>Services</span>
              <KeyboardArrowDown />
            </Button>
            <Menu
              id="services-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "services-button" }}
            >
              <MenuItem>
                <RouteLink to="services/plot-search">Search Plot</RouteLink>
              </MenuItem>
              <MenuItem>
                <RouteLink to="services/plot-bid">Bid Plot</RouteLink>
              </MenuItem>
            </Menu>
          </Box>
          <Box>
            <Button
              id="complaints-button"
              aria-controls={open ? "complaints-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              // onClick={handleClick}
              onClick={() => { navigate("/complaint", { replace: true }) }}
            >
              <Comment /> <span style={{ padding: "0 3px" }}>Complaints</span>
              <KeyboardArrowDown />
            </Button>
            <Menu
              id="complaints-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "complaints-button" }}
            >
              <MenuItem>
                <RouteLink to="complaint">New Complaint</RouteLink>
              </MenuItem>
              <MenuItem>
                <RouteLink to="complaint/track">Track Complaint</RouteLink>
              </MenuItem>
            </Menu>
          </Box>
          <Box>
            <Button
              id="payments-button"
              aria-controls={open ? "payments-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <CurrencyRupee />
              <span style={{ padding: "0 3px" }}>Payments</span>
              <KeyboardArrowDown />
            </Button>
            <Menu
              id="payments-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "payments-button" }}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Box>
          <Box>
            <Button
              id="profile-button"
              aria-controls={open ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="contained"
              color="primary"
            >
              <Person /> <span style={{ padding: "0 3px" }}>Profile</span>
              <KeyboardArrowDown />
            </Button>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "profile-button" }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
      <Box sx={styles.mainHold}>{children}</Box>
    </ThemeProvider>
  );
}
