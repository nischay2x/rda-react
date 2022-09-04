import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

import {
	Box, Paper, Container, Grid, Button, Typography,
	TextField, LinearProgress, IconButton
} from "@mui/material";

const columns1 = [
	{
		name: 'First Name',
		selector: row => row.first_name,
	},
	{
		name: 'Email',
		selector: row => row.email,
	},
];

export default function UploadList() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);

	const fetchUsers = async page => {
		setLoading(true);

		const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);

		setData(response.data.data);
		setTotalRows(response.data.total);
		setLoading(false);
	};

	const handlePageChange = page => {
		fetchUsers(page);
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true);

		const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

		setData(response.data.data);
		setPerPage(newPerPage);
		setLoading(false);
	};

	useEffect(() => {
		fetchUsers(1); // fetch page 1 of users

	}, []);

	return (
		<Container maxWidth="xl">
			<Paper elevation={3} sx={{ px: 3, pt: 4 }}>
				{/* <DataTable
					title="Users"
					columns={columns1}
					data={data}
					progressPending={loading}
					pagination
					paginationServer
					paginationTotalRows={totalRows}
					onChangeRowsPerPage={handlePerRowsChange}
					onChangePage={handlePageChange}
				/> */}
				<StickyHeadTable />
			</Paper>
		</Container>

	);
}

/////////
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
	{ id: 'first_name', label: 'First Name', minWidth: 170 },
	{ id: 'last_name', label: 'Last Name', minWidth: 170 },
	{ id: 'email', label: 'Email', minWidth: 170 },
	//   {
	//     id: 'population',
	//     label: 'Population',
	//     minWidth: 170,
	//     align: 'right',
	//     format: (value) => value.toLocaleString('en-US'),
	//   },
	//   {
	//     id: 'size',
	//     label: 'Size\u00a0(km\u00b2)',
	//     minWidth: 170,
	//     align: 'right',
	//     format: (value) => value.toLocaleString('en-US'),
	//   },
	//   {
	//     id: 'density',
	//     label: 'Density',
	//     minWidth: 170,
	//     align: 'right',
	//     format: (value) => value.toFixed(2),
	//   },
];

function createData(name, code, population, size) {
	const density = population / size;
	return { name, code, population, size, density };
}

const fakeRows = [
	createData('India', 'IN', 1324171354, 3287263),
	createData('China', 'CN', 1403500365, 9596961),
	createData('Italy', 'IT', 60483973, 301340),
	createData('United States', 'US', 327167434, 9833520),
	createData('Canada', 'CA', 37602103, 9984670),
	createData('Australia', 'AU', 25475400, 7692024),
	createData('Germany', 'DE', 83019200, 357578),
	createData('Ireland', 'IE', 4857000, 70273),
	createData('Mexico', 'MX', 126577691, 1972550),
	createData('Japan', 'JP', 126317000, 377973),
	createData('France', 'FR', 67022000, 640679),
	createData('United Kingdom', 'GB', 67545757, 242495),
	createData('Russia', 'RU', 146793744, 17098246),
	createData('Nigeria', 'NG', 200962417, 923768),
	createData('Brazil', 'BR', 210147125, 8515767),
];

function StickyHeadTable() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [rows, setRows] = useState([]);
	const [totalRows, setTotalRows] = useState(0);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const getRows = React.useCallback(() => {
		return axios.get(`https://reqres.in/api/users?page=${page ? page + 1 : page}&per_page=${rowsPerPage}&delay=1`)
	}, [page, rowsPerPage]);

	// const getRows = (page, perPage) => {
	// 	return axios.get(`https://reqres.in/api/users?page=${page ? page + 1 : page}&per_page=${perPage}&delay=1`)
	// }

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
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
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
