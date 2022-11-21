import {
    Box, Paper, Container, Grid, Button, Typography,
    TextField
} from "@mui/material";
import { useEffect, useCallback, useState } from "react";
import BgImage from "../../components/bgImage.jsx";
import { useUserContext } from "../../components/UserContext.js";
import axios from "axios";
import { baseUrl } from "../../config/api-config.js";
import { complaints } from "../../config/constants.js"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const styles = {
    boxButtons: {
        color: "#fff",
        textAlign: "center",
        py: 1
    },
    complaintBox: {
        px: 3,
        py: 2,
        backgroundColor: "#fff",
        boxShadow: "2px 2px 170px rgba(0, 0, 0, 0.1);",
    }
}

async function getComplaints(token, username) {
    try {
        const { data } = await axios.get(`${baseUrl}/citizen_portal/complaint/view?username=${username}`, {
            headers: {
                'authorization': 'Bearer '+token
            }
        }) 
        return { error: false, data }
    } catch (error) {
        return { error }
    }
}

export default function TrackComplaint () {
    
    // const [query, setQuery] = useState({
    //     name: "",
    //     aadhaar: "",
    //     id: ""
    // });
    
    // function onQueryChange (e) {
    //     setQuery(prev => ({...prev, [e.target.name]: e.target.value}))
    // }
    // const userContext = useUserContext();
    // const userData = userContext.useUser();

    // useEffect(() => {
    //     if(!userData.token || !userData.username) return;
    //     getComplaints(userData.token, userData.username).then(({error, data}) => {

    //         if(error) {
    //             console.log(error);
    //             alert("Error Occured While Fetching Complaints.")
    //         } else {
    //             console.log(data);
    //         }
    //     });
    // }, [userData.token, userData.username]);
    
    return (
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="center" pb={5} >
                <Box sx={{...styles.boxButtons, backgroundColor: "#C60F2D"}}>
                    <Typography fontWeight={500} sx={{textTransform: "none", width: "250px"}}>
                        Track Complaint
                    </Typography>
                </Box>
            </Box>
            {/* <Box sx={{maxWidth: "1000px", mx: "auto"}}>
                <Paper elevation={3} sx={{ px: 3, py: 4 }}>
                    <Grid container columnSpacing={3} justifyContent="center">
                        <Grid item md={3} xl={3}>
                            <TextField size="small" 
                            fullWidth
                            placeholder="Your Name" 
                            value={query.name}
                            name="name"
                            onChange={onQueryChange}
                            />
                        </Grid>
                        <Grid item md={3} xl={3}>
                            <TextField size="small" 
                            fullWidth
                            placeholder="Your ID" 
                            value={query.id}
                            name="id"
                            onChange={onQueryChange}
                            />
                        </Grid>
                        <Grid item md={3} xl={3}>
                            <TextField size="small" 
                            fullWidth
                            placeholder="Your Aadhaar" 
                            value={query.aadhaar}
                            name="aadhaar"
                            onChange={onQueryChange}
                            />
                        </Grid>
                        <Grid item md={3} xl={2}>
                            <Button sx={{textTransform: "none"}} fullWidth variant="contained" color="primary" >Search</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
            <br/>
            <br/>
            <Box>
                <Box sx={{...styles.boxButtons, width: "250px", backgroundColor: "#000"}}>
                        Search Results
                </Box>
                <Box display="flex" flexWrap="wrap"> 
                    <Grid container  spacing={3} mt={2}>
                        { complaints.map((c, i) => <Grid item md={10} lg={6} key={i} >
                             <ComplaintCard data={c} />
                        </Grid>
                        )}
                    </Grid>
                </Box>
            </Box> */}
            <StickyHeadTable />
        </Container>
    )
}

function ComplaintCard ({ data }) {
    return(
        <Grid container rowSpacing={2} sx={styles.complaintBox}>
            <Grid item xs={12} md={12} lg={12} display="flex" justifyContent='space-between' >
                <Typography color="secondary.main">Complaint No. : {data.number}</Typography>
                <Typography>Complaint Date : {data.date}</Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Typography>
                    Subject : {data.subject}
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Typography>
                    Description : {data.description}
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Button 
                    variant="contained" 
                    sx={{ 
                        textTransform: 'capitalize',
                        borderRadius: 0,
                        color: "#fff",
                        backgroundColor: data.status === 'PENDING' ? '#C60F2D' : "#323C5B"
                     }}
                >Status : {data.status}</Button>
            </Grid>
        </Grid>
    )
}

const columns = [
	{ id: 'subject', label: 'Type', minWidth: 170 },
	{ id: 'description', label: 'Name', minWidth: 170 },
	{ id: 'status', label: 'Status', minWidth: 170 },
	{ id: 'date', label: 'Date', minWidth: 170, format: (value) => new Date(value).toLocaleString() },

];

function StickyHeadTable({ search = "" }) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [rows, setRows] = useState([]);
	const [totalRows, setTotalRows] = useState(0);

	const userContext = useUserContext();
    const userData = userContext.useUser();

    
	const [refreshCount, setRefreshCount] = useState(0);
	function refreshTable () {
		setRefreshCount(prev => prev + 1);
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

    // search query
	const getRows = useCallback(() => {
		return getComplaints(userData.token, userData.username); // axios.get(`https://reqres.in/api/users?page=${page ? page + 1 : page}&per_page=${rowsPerPage}&delay=1`)
	}, [page, rowsPerPage]);

    // search query
	useEffect(() => {
		getRows().then((res) => {
			// console.log(res.data);
			setRows(res.data);
			setTotalRows(res.data.length);
		})
	}, [refreshCount])

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
		setPage(0);
	};

    const [selectedRow, setSelectedRow] = useState({ index: "", rowId: "" });
    const onRowClick = (index) => {
        setSelectedRow({ rowId: rows[index].id, index });
    }

    async function deleteDocument () {
        try {
            await axios.post(`${baseUrl}/citizen_portal/complaint/delete?username=${userData.username}`, {
                "Id": selectedRow.rowId
            }, {
                headers: {
                    authorization: 'Bearer '+userData.token
                }
            });

            alert('Deleted');
            refreshTable();
        } catch (error) {
            alert("Error Occured");
        }
    }

	return (
		// <Paper sx={{ width: '100%', overflow: 'hidden' }}>
		<>
            {
                selectedRow.rowId ? <Button 
                    variant="contained"
                    color="error"
                    onClick={deleteDocument}
                >Delete Selected</Button> : <></>
            }
            
			<TableContainer sx={{ maxHeight: 470, mt: 1 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow >
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth, backgroundColor: "#C60F2D", color: "#fff" }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.map((row, i) => {
								return (
									<TableRow onClick={() => onRowClick(i)} 
                                        sx={{ backgroundColor: selectedRow.index === i ? "lightcyan" : "initial" }}
                                        hover role="checkbox" tabIndex={-1} key={i}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.format
														? column.format(value)
														: value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})
						}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25, 100]}
				component="div"
				count={totalRows}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
			{/* </Paper> */}
		</>
	);
}
