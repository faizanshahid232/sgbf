/* eslint-disable import/order */
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
  Alert,
  Box,
} from '@mui/material';
// components
// import NewStudents from 'src/components/students/NewStudents';
// import EditStudents from 'src/components/students/EditStudents';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

import { deleteEvent, getAllEvents } from '../Redux/Slice/events';
import Scrollbar from '../Components/scrollbar';
import Iconify from '../Components/iconify';
import { IMAGE_BASEURL } from '../Redux/API/http-common';
import EventsServices from '../Redux/API/EventsServices';
import DeleteAlertModel from '../Components/UI/AlertModel/DeleteAlertModel';
import Goback from '../Components/UI/Goback';
import { ExportToExcel } from '../Components/ExcelExport/ExcelExportButton';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'eventState', label: 'EventState', alignRight: false },
  { id: 'eventVenu', label: 'EventVenu', alignRight: false },
  { id: 'eventDate', label: 'Event Date', alignRight: false },
  { id: 'eventStartTime', label: 'Event StartTime', alignRight: false },
  { id: 'eventEndTime', label: 'Event EndTime', alignRight: false },
  { id: 'FeatureImage', label: 'Feature Image', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
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
    return filter(array, (_user) => _user?.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function EventsPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [refetch, setRefetch] = useState(false);

  const dispatch = useDispatch();

  const events = useSelector((s) => s.events?.data?.data);

  const userData = useSelector((s) => s?.user?.userData);

  const navigate = useNavigate();

  const [openDelete, setOpenDelete] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const handleOpenDeleteAlert = (id) => {
    setDeleteId(id);
    setOpenDelete(!openDelete);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = events?.map((n) => n.studentName);
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

  const handleStatus = async (id) => {
    await EventsServices.changeStatus(id)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        getAllEvent();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const filteredUsers = applySortFilter(events, getComparator(order, orderBy), filterName);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredUsers?.length - page * rowsPerPage);

  const isNotFound = !filteredUsers?.length && !!filterName;

  const getAllEvent = async () => {
    const res = await dispatch(getAllEvents());
    if (res) {
      setRefetch(true);
    }
  };
  const handleDelete = async () => {
    const res = await dispatch(deleteEvent(deleteId));
    if (res.payload) {
      setOpenDelete(false);
      setDeleteId(null);
      setRefetch(!refetch);
    }
  };

  useEffect(() => {
    getAllEvent();
  }, [refetch, dispatch]);

  return (
    <>
      <Helmet>
        <title> Event | Saudi Green Building Forum </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" gutterBottom>
            Events
          </Typography>
          <Box>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => navigate('newevent')}>
              New Event
            </Button>
            {userData && userData?.role === "admin" ?
              <ExportToExcel apiData={events} fileName={`Events ${new Date()}`} />
              : null}
          </Box>
        </Stack>
        <Alert severity="info">Your Events will be approve by an administrator.</Alert>
        <br />

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
                    const {
                      _id,
                      title,
                      eventState,
                      eventVenue,
                      eventStartTime,
                      eventEndTime,
                      eventDate,
                      eventFeatureImage,
                      approve,
                    } = row;
                    const selectedUser = selected.indexOf(title) !== -1;

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

                        <TableCell>{!title ? 'N/A' : title}</TableCell>

                        <TableCell>{!eventState ? 'N/A' : eventState}</TableCell>
                        <TableCell>{!eventVenue ? 'N/A' : eventVenue}</TableCell>

                        <TableCell>{!eventDate ? 'N/A' : eventDate}</TableCell>

                        <TableCell>{!eventStartTime ? 'N/A' : eventStartTime}</TableCell>
                        <TableCell>{!eventEndTime ? 'N/A' : eventEndTime}</TableCell>
                        <TableCell>
                          <img
                            src={`${IMAGE_BASEURL}${eventFeatureImage}`}
                            alt={!title ? 'N/A' : title}
                            width={'100px'}
                          />
                        </TableCell>
                        <TableCell>{approve === true ? 'Published' : 'Draft'}</TableCell>
                        <TableCell>
                          <Stack direction={'row'}>
                            {userData && userData?.role === 'admin' ? (
                              <MenuItem sx={{ color: 'error.main' }} onClick={() => handleStatus(_id)}>
                                <Iconify icon={'fluent:status-20-regular'} sx={{ mr: 2 }} />
                                {approve === true ? 'Disapproved' : 'Approved'}
                              </MenuItem>
                            ) : null}
                            <MenuItem
                              onClick={() => navigate(`/dashboard/event_details/${_id}`, { state: { item: row } })}
                            >
                              <Iconify icon={'carbon:view'} sx={{ mr: 2 }} />
                              View
                            </MenuItem>
                            <MenuItem onClick={() => navigate('editevent', { state: { item: row } })}>
                              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                              Edit
                            </MenuItem>

                            <MenuItem sx={{ color: 'error.main' }} onClick={() => handleOpenDeleteAlert(_id)}>
                              <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                              Delete
                            </MenuItem>
                          </Stack>
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
