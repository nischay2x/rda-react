import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import {
	Box, Paper, Container, Grid, Button, Typography,
	TextField, LinearProgress, IconButton, InputAdornment
} from "@mui/material";
import { AccountCircle, Search } from "@mui/icons-material";


export default function UploadList() {
    const [tempQuery, setTempQuery] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    
    function onSearchSubmit (e) {
        e.preventDefault();
        setSearchQuery(tempQuery);
    }

	return (
		<Container maxWidth="xl">
			<Paper elevation={3}>
				<Box display="flex" justifyContent="space-between" p={2}>
                    <Typography variant="h6" textAlign="center">
                        All Documents
                    </Typography>
                    <form onSubmit={onSearchSubmit}>
                    <TextField 
                        id="input-with-icon-textfield"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        value={tempQuery}
                        onChange={(e) => { setTempQuery(e.target.value) }}
                        size="small"
                        placeholder="Search ..."
                        variant="outlined"
                    />
                    </form>
                </Box>
				<StickyHeadTable search={searchQuery} />
			</Paper>
		</Container>

	);
}

const columns = [
	{ id: 'first_name', label: 'First Name', minWidth: 170 },
	{ id: 'last_name', label: 'Last Name', minWidth: 170 },
	{ id: 'email', label: 'Email', minWidth: 170 },
];

function StickyHeadTable({ search }) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [rows, setRows] = useState([]);
	const [totalRows, setTotalRows] = useState(0);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

    // search query
	const getRows = useCallback(() => {
		return axios.get(`https://reqres.in/api/users?page=${page ? page + 1 : page}&per_page=${rowsPerPage}&delay=1`)
	}, [page, rowsPerPage]);

    // search query
	useEffect(() => {
		getRows().then((res) => {
			setRows(res.data.data);
			setTotalRows(res.data.total);
		})
	}, [page, rowsPerPage])

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
		setPage(0);
	};

	return (
		// <Paper sx={{ width: '100%', overflow: 'hidden' }}>
		<>
			<TableContainer sx={{ maxHeight: 460 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow style={{backgroundColor: "#C60F2D"}}>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth, backgroundColor: "transparent", color: "#fff" }}
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
									<TableRow hover role="checkbox" tabIndex={-1} key={i}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.format && typeof value === 'number'
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
