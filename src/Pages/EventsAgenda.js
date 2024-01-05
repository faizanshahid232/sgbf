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
  Button,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteEventAgenda, getAllEventAgenda } from '../Redux/Slice/eventAgenda';
import Iconify from '../Components/iconify';
import Scrollbar from '../Components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'agendaDetails', label: 'Agenda Details', alignRight: false },
  { id: 'agendaSummary', label: 'Agenda Summary', alignRight: false },
  { id: 'eventSpeakerName', label: 'Event Speaker Name', alignRight: false },
  { id: 'eventSpeakerTitle', label: 'Event Speaker Title', alignRight: false },
  { id: 'totalTimeDuration', label: 'Total Time Duration', alignRight: false },
  { id: '', label: '', alignRight: false },
  //   { id: '' },
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

export default function EventsAgenda() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [refetch, setRefetch] = useState(false);

  const dispatch = useDispatch();

  const eventAgenda = useSelector((s) => s.eventAgenda?.data?.data);
  console.log('organization==>', eventAgenda);

  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = eventAgenda?.map((n) => n.studentName);
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


  const filteredUsers = applySortFilter(eventAgenda, getComparator(order, orderBy), filterName);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredUsers?.length - page * rowsPerPage);

  const isNotFound = !filteredUsers?.length && !!filterName;
  const getEventsAgend = async () => {
    const res = await dispatch(getAllEventAgenda());
    if (res) {
      setRefetch(true);
    }
  };
  const handleDelete = async (id) => {
    const res = await dispatch(deleteEventAgenda(id));
    if (res.payload) {
      setRefetch(!refetch);
    }
  };

  useEffect(() => {
    getEventsAgend();
  }, [refetch, dispatch]);

  return (
    <>
      <Helmet>
        <title> Event Agenda | Saudi Green Building Forum </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" gutterBottom>
            Event Agenda
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('new-eventagenda')}
          >
            New Event Agenda
          </Button>
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
                    const {
                      _id,
                      agendaDetails,
                      agendaSummary,
                      eventSpeakerName,
                      eventSpeakerTitle,
                      totalTimeDuration,
                    } = row;
                    const selectedUser = selected.indexOf(agendaDetails) !== -1;

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

                        <TableCell>{!agendaDetails ? "N/A" : agendaDetails.slice(1, 100)}{"..."}</TableCell>

                        <TableCell>{!agendaSummary ? "N/A" : agendaSummary.slice(1, 100)}{"..."}</TableCell>
                        <TableCell>{!eventSpeakerName ? "N/A" : eventSpeakerName}</TableCell>

                        <TableCell>{!eventSpeakerTitle ? "N/A" : eventSpeakerTitle}</TableCell>
                        <TableCell>{!totalTimeDuration ? "N/A" : totalTimeDuration}</TableCell>

                        <TableCell>
                          <Stack direction={'row'}>
                            <MenuItem onClick={() => navigate(`/dashboard/events_agenda_details/${_id}`, { state: { item: row } })}>
                              <Iconify icon={'carbon:view'} sx={{ mr: 2 }} />
                              View
                            </MenuItem>
                            <MenuItem onClick={() => navigate('edit-eventagenda', { state: { item: row } })}>
                              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                              Edit
                            </MenuItem>

                            <MenuItem sx={{ color: 'error.main' }} onClick={() => handleDelete(_id)}>
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
      </Container>
    </>
  );
}
