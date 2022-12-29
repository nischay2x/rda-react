import React, { useState } from "react";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import {
  AddIcCall, MailOutline, Facebook, Instagram, Twitter, Person,
  KeyboardArrowDown, CurrencyRupee, Comment, ListAlt, Description, Logout,
} from "@mui/icons-material";
import {
  Box, Link, Typography, Avatar, Button, Menu, MenuItem, IconButton,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import {
  tollFree, phone, mail, facebook, instagram, twitter,
} from "../config/constants";
import { useUserContext } from "./UserContext";
import CustomizedSnackbars from "./CustomSnackbar"

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

  const userContext = useUserContext();
  const userData = userContext.useUser();
  const logout = userContext.userLogout();

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
          <RouteLink to='/citizen_portal'>

            <Typography fontWeight="600" fontSize="1.1rem" fontFamily="inherit">
              RAIPUR DEVELOPMENT AUTHORITY
            </Typography>
          </RouteLink>
        </Box>
        <Box display="flex"
          style={{ postion: "sticky", top: 0, zIndex: 3, backgroundColor: "#fff" }}
        >
          <DropDownMenu icon={<Description />} mainText="Documents"
            listItems={[
              { text: "Upload", to: "/citizen_portal/documents" },
              { text: "View", to: "/citizen_portal/documents/list" },
            ]}
          />

          {
            userData.verified ? <>
              <DropDownMenu icon={<ListAlt />} mainText="Services"
                listItems={[
                  { text: "Search Plot", to: "/citizen_portal/services/search-plot" },
                  { text: "View Plot", to: "/citizen_portal/services/view-plot" },
                  { text: "View House", to: "/citizen_portal/services/view-house" },
                  { text: "Bid Plot", to: "/citizen_portal/services/plot-bid" }
                ]}
              />

              <DropDownMenu icon={<Comment />} mainText="Complaints"
                listItems={[
                  { text: "New Complaint", to: "/citizen_portal/complaint" },
                  { text: "Track Complaint", to: "/citizen_portal/complaint/track" },
                ]}
              />

              <DropDownMenu icon={<CurrencyRupee />} mainText="Payments"
                listItems={[
                  { text: "New Payment", to: "/citizen_portal/payment" },
                  // { text: "Track Complaint", to: "/citizen_portal/payment/track" },
                ]}
              />
            </> : <></>
          }


          <RouteLink to='/citizen_portal/profile'>
            <Button variant="contained">
              <Person />
              <span style={{ padding: "0 3px" }}>Profile</span>
            </Button>
          </RouteLink>

          <IconButton sx={{ ml: 1 }} color="error" title="Log Out" onClick={() => logout()}>
            <Logout />
          </IconButton>

        </Box>
      </Box>
      <Box sx={styles.mainHold}>{children}</Box>
      <CustomizedSnackbars/>
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