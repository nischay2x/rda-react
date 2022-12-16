import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackbar({ msg = "", type = "info", onClose = () => { } }) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        onClose();
    };

    return (
        <Snackbar open={Boolean(msg)} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {msg}
            </Alert>
        </Snackbar>
    );
}