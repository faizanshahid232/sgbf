/* eslint-disable camelcase */
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
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  MenuItem,
  Button,
} from '@mui/material';
// components
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Scrollbar from '../Components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import Iconify from '../Components/iconify/Iconify';
import { deleteRegisteredUser, getAllRegisteredUser } from '../Redux/Slice/eventRegisteredUser';
import DeleteAlertModel from '../Components/UI/AlertModel/DeleteAlertModel';
// mock
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'firstName', label: 'FirstName', alignRight: false },
  { id: 'lastName', label: 'LastName', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Phone No.', alignRight: false },
  { id: 'message', label: 'Message', alignRight: false },
  { id: '', label: '', alignRight: false },
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
    return filter(array, (_user) => _user?.firstName?.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function AppliedEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [refetch, setRefetch] = useState(false);

  const dispatch = useDispatch();

  const [openDelete, setOpenDelete] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const users = useSelector((s) => s.eventRegistered?.data?.data);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users?.map((n) => n.studentName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredUsers?.length - page * rowsPerPage);

  const isNotFound = !filteredUsers?.length && !!filterName;
  const getAllUser = async () => {
    const res = await dispatch(getAllRegisteredUser(id));
    if (res) {
      setRefetch(true);
    }
  };

  useEffect(() => {
    getAllUser();
  }, [refetch, dispatch]);

  const handleDelete = async () => {
    const res = await dispatch(deleteRegisteredUser(deleteId));
    if (res.payload) {
      setOpenDelete(false);
      setDeleteId(null);
      setRefetch(!refetch);
    }
  };

  const handleOpenDeleteAlert = (id) => {
    setDeleteId(id);
    setOpenDelete(!openDelete);
  };

  return (
    <>
      <Helmet>
        <title> Registered Event | Saudi Green Building Forum </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" gutterBottom>
            Event Registered User
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredUsers?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row) => {
                    const { _id, name, email, firstName, lastName, phone, message } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        sx={{ alignItems: 'center' }}
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={selectedUser}
                      >
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, studentName)} /> */}
                        </TableCell>

                        <TableCell>{!firstName ? 'N/A' : firstName}</TableCell>
                        <TableCell>{!lastName ? 'N/A' : lastName}</TableCell>

                        <TableCell>{!email ? 'N/A' : email}</TableCell>
                        <TableCell>{!phone ? 'N/A' : phone}</TableCell>
                        <TableCell>{!message ? 'N/A' : message?.substring(0, 40)}</TableCell>
                        <TableCell>
                          <MenuItem sx={{ color: 'error.main' }} onClick={() => handleOpenDeleteAlert(_id)}>
                            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                            Delete
                          </MenuItem>
                        </TableCell>
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
        <DeleteAlertModel openDelete={openDelete} setOpenDelete={setOpenDelete} handleDelete={handleDelete} />
      </Container>
    </>
  );
}
