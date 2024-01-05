/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
} from '@mui/material';
// components
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Goback from '../Components/UI/Goback';
import CustomizedDialogs from '../Components/custom-pop-up';
import Iconify from '../Components/iconify';
import Scrollbar from '../Components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import { deleteInvoice, getAllInvoices, getOrgInvoices, getUserInvoices } from '../Redux/Slice/invoice';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'fullName', label: 'Full Name', alignRight: false },
  { id: 'emailAddress', label: 'Email', alignRight: false },
  { id: 'OrganizationName', label: 'Organization Name', alignRight: false },
  { id: 'Organization Address', label: 'Organization Address', alignRight: false },
  { id: 'for', label: 'Payment', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'currency', label: 'Currency', alignRight: false },
  { id: 'paymentId', label: 'Payment ID', alignRight: false },
  { id: 'createdAt', label: 'Date', alignRight: false },
  { id: '' },
];

const TABLE_USER_HEAD = [
  { id: 'fullName', label: 'Full Name', alignRight: false },
  { id: 'emailAddress', label: 'Email', alignRight: false },
  { id: 'for', label: 'Payment', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'currency', label: 'Currency', alignRight: false },
  { id: 'paymentId', label: 'Payment ID', alignRight: false },
  { id: 'createdAt', label: 'Date', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array && array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user?.userId?.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function Invoice() {
  const [page, setPage] = useState(0);

  const [paymentType, setPaymentType] = useState('All');

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [newStudentOpen, setNewStudentOpen] = useState(false);

  const [refetch, setRefetch] = useState(false);

  const [editStudentOpen, setEditStudentOpen] = useState();

  const dispatch = useDispatch();

  const articales = useSelector((s) => s.invoice?.data?.data);

  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const filteredUsers = applySortFilter(articales, getComparator(order, orderBy), filterName);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredUsers?.length - page * rowsPerPage);

  const isNotFound = !filteredUsers?.length && !!filterName;

  const getAllData = async () => {
    const res = await dispatch(getAllInvoices());
    if (res) {
      setRefetch(true);
    }
  };

  // const handleDelete = async (id) => {
  //   const res = await dispatch(deleteInvoice(id));
  //   if (res.payload) {
  //     setRefetch(!refetch);
  //   }
  // };

  useEffect(() => {
    if (paymentType === 'All') {
      getAllData();
    }
  }, [refetch, dispatch, paymentType]);

  return (
    <>
      <Helmet>
        <title> {paymentType} Payments | Saudi Green Building Forum</title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" gutterBottom>
            {paymentType} Payments
          </Typography>
          <Box>
            <Button
              sx={{ marginRight: '10px' }}
              variant="contained"
              onClick={() => {
                setPaymentType('All');
                dispatch(getAllInvoices());
              }}
            >
              All Payments
            </Button>
            <Button
              sx={{ marginRight: '10px' }}
              variant="contained"
              onClick={() => {
                setPaymentType('User');
                dispatch(getUserInvoices());
              }}
            >
              User Payments
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setPaymentType('Organization');
                dispatch(getOrgInvoices());
              }}
            >
              Organization Payments
            </Button>
          </Box>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={paymentType === 'User' ? TABLE_USER_HEAD : TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row) => {
                    const { _id, amount, company, createdAt, currency, paymentId } = row;
                    return paymentType === 'User' ? (
                      <TableRow hover key={_id} tabIndex={-1}>
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, studentName)} /> */}
                        </TableCell>

                        <TableCell>
                          {!row?.userId && !row?.userId?.firstName ? 'N/A' : row?.userId?.firstName}{' '}
                          {!row?.userId && !row?.userId?.firstName ? 'N/A' : row?.userId?.lastName}
                        </TableCell>

                        <TableCell>{!row?.userId && !row?.userId?.email ? 'N/A' : row?.userId?.email}</TableCell>
                        <TableCell>{!row?.for ? 'N/A' : row?.for}</TableCell>

                        <TableCell>{!amount ? 'N/A' : amount}</TableCell>
                        <TableCell>{!company ? 'N/A' : company}</TableCell>
                        <TableCell>{!currency ? 'N/A' : currency}</TableCell>
                        <TableCell>{!paymentId ? 'N/A' : paymentId}</TableCell>
                        <TableCell>{!createdAt ? 'N/A' : new Date(createdAt).toLocaleDateString()}</TableCell>

                        {/* <TableCell sx={{ display: 'flex', fontSize: '12px' }} align="right">
                          <MenuItem sx={{ color: 'error.main' }} onClick={() => handleDelete(_id)}>
                            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 1 }} />
                            Delete
                          </MenuItem>
                          <MenuItem onClick={() => navigate(`/dashboard/invoice_details/${_id}`, { state: { item: row } })}>
                            <Iconify icon={'carbon:view'} sx={{ mr: 2 }} />
                            View
                          </MenuItem>
                        </TableCell> */}
                      </TableRow>
                    ) : (
                      <TableRow hover key={_id} tabIndex={-1}>
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, studentName)} /> */}
                        </TableCell>

                        <TableCell>
                          {!row?.userId && !row?.userId?.firstName ? 'N/A' : row?.userId?.firstName}{' '}
                          {!row?.userId && !row?.userId?.firstName ? 'N/A' : row?.userId?.lastName}
                        </TableCell>

                        <TableCell>{!row?.userId && !row?.userId?.email ? 'N/A' : row?.userId?.email}</TableCell>
                        <TableCell>{!row?.orgId && !row?.orgId?.title ? 'N/A' : row?.orgId?.title}</TableCell>
                        <TableCell>
                          {!row?.orgId && !row?.orgId?.address_line1 ? 'N/A' : row?.orgId?.address_line1}
                        </TableCell>
                        <TableCell>{!row?.for ? 'N/A' : row?.for}</TableCell>

                        <TableCell>{!amount ? 'N/A' : amount}</TableCell>
                        <TableCell>{!company ? 'N/A' : company}</TableCell>
                        <TableCell>{!currency ? 'N/A' : currency}</TableCell>
                        <TableCell>{!paymentId ? 'N/A' : paymentId}</TableCell>
                        <TableCell>{!createdAt ? 'N/A' : new Date(createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers === undefined ? 0 : filteredUsers?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
