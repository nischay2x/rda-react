import React from "react";
import { Box } from "@mui/material";

export default function BgImage ({ src, children, ...props }) {
    return(
        <Box sx={{ 
            backgroundImage: `url(${src})`, 
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            ...props
        }}>    
        </Box>
    )
}