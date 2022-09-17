import { AccountBalance, CurrencyRuble, CurrencyRupee, LocationOn } from "@mui/icons-material";
import {
    Box, Paper, Container, Grid, Button, Typography,
    TextField, LinearProgress, IconButton, InputAdornment, 
    MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import { useState } from "react";
import BgImage from "../../components/bgImage.jsx";

import { properties } from "../../config/constants.js"

const styles = {
    boxButtons: {
        color: "#fff",
        textAlign: "center",
        py: 1
    },
    plotInfo: {
        textAlign: "center",
        backgroundColor: "#D8E9F0",
        border: "1px solid rgba(0, 0, 0, 0.3)",
        borderRadius: "5px",
        p: 1
    }
}

export default function BidPlot () {
    
    const [bidFocus, setBidFocus] = useState(false);
    
    return (
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="center" pb={5} >
                <Box sx={{...styles.boxButtons, backgroundColor: "#C60F2D"}}>
                    <Typography fontWeight={500} sx={{textTransform: "none", width: "250px"}}>
                        Bidding
                    </Typography>
                </Box>
            </Box>
            <Box sx={{maxWidth: "1200px", mx: "auto"}}>
                <Paper elevation={3} sx={{p: 3}}>
                    <Box textAlign="center">
                        <Typography variant="h6">Plot Detail</Typography>
                    </Box>
                    <Box display="flex" mt={3}>
                        <Box width="30%" display="flex" flexDirection="column" rowGap={3} px={3}>
                            <Box sx={{...styles.plotInfo}}>
                                Plot Number: {properties[0].plot}
                            </Box>
                            <Box sx={{...styles.plotInfo}}>
                                Sector: {properties[0].sector}
                            </Box>
                            <Box sx={{...styles.plotInfo}}>
                                Allotment Date: {properties[0].allotmentDate}
                            </Box>
                        </Box>
                        <Box width="40%" px={4}>
                           <BgImage src={properties[0].image} width="100%" height="100%" borderRadius="6px" />
                        </Box>
                        <Box width="30%" display="flex" flexDirection="column" rowGap={3} px={3}>
                            <Box component="div" sx={{...styles.plotInfo, backgroundColor: "#fff", mt: 'auto'}}
                                onClick={() => { setBidFocus(prev => !prev) }}
                            >
                                {
                                    bidFocus? 
                                    <input type="number" style={{ width: "100%", outline: "none", border: "none"}} autoFocus />
                                    : "Enter your Bid Value" 
                                }
                            </Box>
                            <Box sx={{textAlign: 'center'}}>
                                <Button variant="contained" sx={{ px: 4, textTransform: "none"}} color="primary">Submit</Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box display="flex" mt={3}>
                        <Box width="30%" display="flex" flexDirection="column" rowGap={3} px={3}>
                            <Box sx={{...styles.plotInfo}}>
                                Value: {properties[0].value}
                            </Box>
                        </Box>
                        <Box width="40%" px={4}>
                           <BgImage src={properties[0].image} width="100%" height="100%" borderRadius="6px" />
                        </Box>
                        <Box width="30%" display="flex" flexDirection="column" rowGap={3} px={3}>
                           
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}
