import {
    Box, Paper, Container, Grid, Button, Typography,
    TextField, LinearProgress, IconButton
} from "@mui/material";

const styles = {
    boxButtons: {
        color: "#fff",
        textAlign: "center",
        py: 1
    }
}

export default function ViewPlot () {
    return (
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="center" pb={5} >
                <Box sx={{...styles.boxButtons, backgroundColor: "#C60F2D"}}>
                    <Typography fontWeight={500} sx={{textTransform: "none", width: "250px"}}>
                        Plot Search
                    </Typography>
                </Box>
            </Box>
            <Box sx={{maxWidth: "900px"}}>
                <Paper elevation={3} sx={{ px: 3, py: 4 }}>
                
            </Paper>
            </Box>
        </Container>
    )
}