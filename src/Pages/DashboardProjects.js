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
import { deleteProjects, getAllProjects } from '../Redux/Slice/projects';
import Iconify from '../Components/iconify';
import Scrollbar from '../Components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import DeleteAlertModel from '../Components/UI/AlertModel/DeleteAlertModel';
import { ExportToExcel } from '../Components/ExcelExport/ExcelExportButton';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'country_code', label: 'Country Code', alignRight: false },
  { id: 'locality', label: 'Locality', alignRight: false },
  { id: 'dateCertified', label: 'Date Certified', alignRight: false },
  { id: 'certificationLevel', label: 'Certification Level', alignRight: false },
  { id: 'ratingSystem', label: 'Rating System', alignRight: false },
  { id: 'projectAreaSquareMeters', label: 'Project Area Square Meters', alignRight: false },
  { id: '', label: '', alignRight: false },
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
    return filter(array, (_user) => _user?.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function DashboardProjects() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [newStudentOpen, setNewStudentOpen] = useState(false);

  const [refetch, setRefetch] = useState(false);

  const [editStudentOpen, setEditStudentOpen] = useState();

  const dispatch = useDispatch();

  const articales = useSelector((s) => s.projects?.data?.data);

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
    const res = await dispatch(getAllProjects());
    if (res) {
      setRefetch(true);
    }
  };

  const handleDelete = async () => {
    const res = await dispatch(deleteProjects(deleteId));
    if (res.payload) {
      setOpenDelete(false);
      setDeleteId(null);
      setRefetch(!refetch);
    }
  };

  useEffect(() => {
    getAllData();
  }, [refetch, dispatch]);

  return (
    <>
      <Helmet>
        <title> Projects | Saudi Green Building Forum</title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" gutterBottom>
            Projects
          </Typography>
          <Box>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => navigate('add_projects')}
            >
              New Project
            </Button>
            {userData && userData?.role === "admin" ?
              <ExportToExcel apiData={articales} fileName={`Project ${new Date()}`} />
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
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row) => {
                    const { _id, title } = row;
                    return (
                      <TableRow hover key={_id} tabIndex={-1}>
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, studentName)} /> */}
                        </TableCell>

                        <TableCell>{!title ? 'N/A' : title}</TableCell>

                        <TableCell>{!row?.country_code ? 'N/A' : row?.country_code}</TableCell>
                        <TableCell>{!row?.locality ? 'N/A' : row?.locality}</TableCell>

                        <TableCell>{!row?.dateCertified ? 'N/A' : row?.dateCertified}</TableCell>
                        <TableCell>{!row?.certificationLevel ? 'N/A' : row?.certificationLevel}</TableCell>
                        <TableCell>{!row?.ratingSystem ? 'N/A' : row?.ratingSystem}</TableCell>
                        <TableCell>{!row?.projectAreaSquareMeters ? 'N/A' : row?.projectAreaSquareMeters}</TableCell>

                        <TableCell sx={{ display: 'flex', fontSize: '12px' }} align="right">
                          <MenuItem onClick={() => navigate('edit_projects', { state: { item: row } })}>
                            <Iconify icon={'eva:edit-fill'} sx={{ mr: 1 }} />
                            Edit
                          </MenuItem>

                          <MenuItem sx={{ color: 'error.main' }} onClick={() => handleOpenDeleteAlert(_id)}>
                            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 1 }} />
                            Delete
                          </MenuItem>
                          <MenuItem
                            onClick={() => navigate(`/dashboard/projects_details/${_id}`, { state: { item: row } })}
                          >
                            <Iconify icon={'carbon:view'} sx={{ mr: 2 }} />
                            View
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
      </Container>
      <DeleteAlertModel openDelete={openDelete} setOpenDelete={setOpenDelete} handleDelete={handleDelete} />

      <CustomizedDialogs title="Add New Artical" open={newStudentOpen} setOpen={setNewStudentOpen} />
      <CustomizedDialogs title="Edit Artical" open={editStudentOpen} setOpen={setEditStudentOpen} />
    </>
  );
}
