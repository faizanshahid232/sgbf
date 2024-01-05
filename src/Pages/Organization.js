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
  Box,
} from '@mui/material';
// components
// import NewStudents from 'src/components/students/NewStudents';
import { useDispatch, useSelector } from 'react-redux';
// import EditStudents from 'src/components/students/EditStudents';
import { useNavigate } from 'react-router-dom';
import { deleteOrganization, getAllOrganization } from '../Redux/Slice/organization';
import Goback from '../Components/UI/Goback';
import Iconify from '../Components/iconify';
import Scrollbar from '../Components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import DeleteAlertModel from '../Components/UI/AlertModel/DeleteAlertModel';
import { ExportToExcel } from '../Components/ExcelExport/ExcelExportButton';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  // { id: 'organizationMembership', label: 'Organization Membership', alignRight: false },
  { id: 'organizationMission', label: 'Organization Mission', alignRight: false },
  { id: 'group', label: 'Group', alignRight: false },
  { id: 'country', label: 'Country', alignRight: false },
  { id: 'organizationEmail', label: 'Organization Email', alignRight: false },
  { id: 'pay_status', label: 'Status', alignRight: false },
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

export default function Organization() {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [refetch, setRefetch] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [openDelete, setOpenDelete] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const organization = useSelector((s) => s.organization?.data?.data);
  const user = useSelector((s) => s.user?.userData);

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
      const newSelecteds = organization?.map((n) => n.studentName);
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

  const filteredUsers = applySortFilter(organization, getComparator(order, orderBy), filterName);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredUsers?.length - page * rowsPerPage);

  const isNotFound = !filteredUsers?.length && !!filterName;
  const getOrganization = async () => {
    const res = await dispatch(getAllOrganization());
    if (res) {
      setRefetch(true);
    }
  };
  const handleDelete = async () => {
    const res = await dispatch(deleteOrganization(deleteId));
    if (res.payload) {
      setOpenDelete(false);
      setDeleteId(null);
      setRefetch(!refetch);
    }
  };

  useEffect(() => {
    getOrganization();
  }, [refetch, dispatch]);

  return (
    <>
      <Helmet>
        <title> Organizations | Saudi Green Building Forum </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" gutterBottom>
            Organizations
          </Typography>
          <Box>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => navigate('neworganization')}
            >
              New Organization
            </Button>
            {user && user?.role === "admin" ?
              <ExportToExcel apiData={organization} fileName={`Organization ${new Date()}`} />
              : null}
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
                  headLabel={TABLE_HEAD}
                  rowCount={filteredUsers?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row) => {
                    const { _id, title, organizationMission, group, country_code, organizationEmail, authoredBy } = row;
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

                        {/* <TableCell>{!organizationMembership ? "N/A" : organizationMembership}</TableCell> */}
                        <TableCell>
                          {!organizationMission ? (
                            'N/A'
                          ) : (
                            <div dangerouslySetInnerHTML={{ __html: organizationMission.slice(0, 120) }} />
                          )}
                          {!organizationMission ? null : '...'}
                        </TableCell>

                        <TableCell>{!group ? 'N/A' : group}</TableCell>
                        <TableCell>{!country_code ? 'N/A' : country_code}</TableCell>
                        <TableCell>{!organizationEmail ? 'N/A' : organizationEmail}</TableCell>

                        <TableCell>
                          {!row?.pay_status ? (
                            'N/A'
                          ) : (
                            <Button
                              onClick={() => {
                                navigate(`/payment/organization/${_id}`);
                              }}
                              variant="contained"
                              sx={{ fontSize: '10px', backgroundColor: 'red' }}
                              disabled={row?.pay_status !== 'unpaid'}
                            >
                              {row?.pay_status === 'unpaid' ? 'Not Paid' : 'Paid'}
                            </Button>
                          )}
                        </TableCell>
                        {user.role === 'admin' ? (
                          <TableCell>
                            <Stack direction={'row'}>
                              <MenuItem
                                onClick={() =>
                                  navigate(`/dashboard/organization_details/${_id}`, { state: { item: row } })
                                }
                              >
                                <Iconify icon={'carbon:view'} sx={{ mr: 2 }} />
                                View
                              </MenuItem>
                              <MenuItem onClick={() => navigate('editorganization', { state: { item: row } })}>
                                <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                                Edit
                              </MenuItem>

                              <MenuItem sx={{ color: 'error.main' }} onClick={() => handleOpenDeleteAlert(_id)}>
                                <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                                Delete
                              </MenuItem>
                            </Stack>
                          </TableCell>
                        ) : user?._id?.toString() === authoredBy?.toString() ? (
                          <TableCell>
                            <Stack direction={'row'}>
                              <MenuItem
                                onClick={() =>
                                  navigate(`/dashboard/organization_details/${_id}`, { state: { item: row } })
                                }
                              >
                                <Iconify icon={'carbon:view'} sx={{ mr: 2 }} />
                                View
                              </MenuItem>
                              <MenuItem onClick={() => navigate('editorganization', { state: { item: row } })}>
                                <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                                Edit
                              </MenuItem>

                              <MenuItem sx={{ color: 'error.main' }} onClick={() => handleOpenDeleteAlert(_id)}>
                                <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                                Delete
                              </MenuItem>
                            </Stack>
                          </TableCell>
                        ) : null}
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
