import React from 'react';

import { Box, Paper, Container, Grid, Button, Typography, Link } from "@mui/material";
import { ControlPoint } from '@mui/icons-material';

import BgImage from "../../components/bgImage.jsx";
import { user, properties } from "../../config/constants.js";
import { Link as RouteLink } from 'react-router-dom';

const styles = {
    boxButtons: {
        color: "#fff",
        textAlign: "center",
        py: 1
    },
    userInfo: {
        py: 1,
        px: 2,
        border: "1px solid rgba(0, 0, 0, 0.5)",
        borderRadius: "3px"
    },
    alertBox: {
        borderRadius: "3px",
        color: "#C60F2D", 
        border: "1px solid #c60f2d", 
        textAlign: "center", 
        background: "rgba(198, 15, 45, 0.04)",
        display: "flex",
        flexDirection: "column",
        gap: 2
    },
    dueBox: {
        backgroundColor: "#fff",
        border: "1px solid #C60F2D",
        padding: "4px 8px",
        borderRadius: "5px",
        fontSize: "0.8rem",
        width: "fit-content",
        margin: "auto"
    },
    addProperty: {
        border: "2px dashed #6C6C6C",
        px: 2,
        fontFamily: "inherit",
        fontSize: "0.9rem",
        fontWeight: 500,
        color: "#6C6C6C",
        display: "flex",
        columnGap: "3px",
        textTransform: "none",
        marginLeft: "auto"
    },
    propertyBox: {
        padding: 3,
        borderRadius: "50px",
        backgroundColor: "#fff",
        mt: 3,
        boxShadow: "2px 2px 170px rgba(0, 0, 0, 0.1);",
    },
    knowProperty: {
        borderRadius: "50px",
        margin: "auto",
        textTransform: "none",
        py: 1,
        px: 2
    }
}

export default function Home() {
  return (
      <Container maxWidth="xl">
          <Paper elevation={3} sx={{px: 3, py: 4}}>
              <Grid container>
                  <Grid item md={4} lg={4} xl={3}>  
                    <LeftPart/>
                  </Grid>
                  <Grid item md={8} lg={8} xl={9}>
                      <RightPart/>
                  </Grid>
              </Grid>
          </Paper>
      </Container>
  )
}

function LeftPart () {
    return(
        <Box sx={{ px: 2 }} >  
            <Box sx={{...styles.boxButtons, backgroundColor: "#C60F2D"}}>User Profile</Box>
            <Grid container rowSpacing={2} py={2}>
                <Grid item xs={12} md={12}>
                    <Box sx={styles.userInfo}>
                        <span style={{ color: "#6c6c6c" }}>Name :</span> {user.name}
                    </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Box sx={styles.userInfo}>
                        <span style={{ color: "#6c6c6c" }}>Mobile :</span> {user.mobile}
                    </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Box sx={styles.userInfo}>
                        <span style={{ color: "#6c6c6c" }}>Address :</span> {user.address}
                    </Box>
                </Grid>
            </Grid>
            <Link href="#" underline="none">
                <Box sx={{...styles.boxButtons, backgroundColor: "var(--dark-blue)", borderRadius: "3px"}}
                >Know More</Box>
            </Link>
            <br/>
            <Box sx={styles.alertBox} py={2} >
                <Typography fontFamily="inherit">
                    <b>Your Payment Is Due</b>
                </Typography>
                <Box sx={styles.dueBox}>
                    <span >Due Type : </span> <span style={{fontWeight: 500}}>Water Bill</span>
                </Box>
                <Box sx={styles.dueBox}>
                    <span>Due Date : </span> <span style={{fontWeight: 500}}>02.03.2022</span>
                </Box>
                <Link href="#" color="inherit">Know More</Link>
            </Box>
        </Box>
    )
}

function RightPart () {
    return(
        <Box sx={{px: 2}}>
            <Grid container justifyContent="space-between" pl={3}>
                <Grid item md={4} lg={3} xl={2}>
                    <Box sx={{...styles.boxButtons, backgroundColor: "#C60F2D"}}>Properties</Box>
                </Grid>
                <Grid item md={4} lg={3} xl={2}>
                    {/* <RouteLink to="/add-property">
                        <Button sx={styles.addProperty}>
                            <ControlPoint fontSize="small" /> Add Property
                        </Button>
                    </RouteLink> */}
                </Grid>
            </Grid>
            <Box sx={{ borderLeft: "1px solid #dddddd", pl: 3 }}>
                { properties.map((p, i) => <PropertyCard data={p} key={i} />) }
            </Box>
        </Box>
    )
}

function PropertyCard ({ data }) {
    return(
        <Grid container sx={styles.propertyBox}>
            <Grid item md={3}>
                <BgImage src={data.image} borderRadius="50px" overflow="hidden" width="100%" height="100%"/>
            </Grid>
            
            <Grid item md={7}>
            <Grid container px={3} rowSpacing={1} sx={{fontSize: "0.9rem"}}>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Plot Number : </span> {data.plot}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Allotment Date : </span> {data.plot}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Sector : </span> {data.sector}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Value : </span> {data.value}
                </Grid>
                <Grid item xs={12} md={6}>
                    <span className="text-secondary">Owner : </span> {data.owner}
                </Grid>
            </Grid>
            </Grid>
            
            <Grid item md={2} display="flex">
                <Button variant="contained" sx={styles.knowProperty} color="primary">Know More</Button>
            </Grid>
        </Grid>
    )
}