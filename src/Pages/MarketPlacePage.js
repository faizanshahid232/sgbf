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
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Goback from '../Components/UI/Goback';
import Iconify from '../Components/iconify';
import Scrollbar from '../Components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

import { deleteMarketPlace, getAllMarketPlace } from '../Redux/Slice/marketPlaceSlice';
import { IMAGE_BASEURL } from '../Redux/API/http-common';
import { ExportToExcel } from '../Components/ExcelExport/ExcelExportButton';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'brand_Name', label: 'Brand Name', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'website', label: 'Website', alignRight: false },
  { id: 'company_profile', label: 'Company Profile', alignRight: false },
  { id: 'mobile', label: 'Mobile', alignRight: false },
  { id: 'epd_specification', label: 'EPD Specification', alignRight: false },
  { id: 'earned', label: 'Earned', alignRight: false },
  { id: 'physical_prop', label: 'Physical Prop', alignRight: false },
  { id: 'note', label: 'Note', alignRight: false },
  { id: 'imgUrls', label: 'Picture', alignRight: false },
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
    return filter(array, (_user) => _user?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function MarketPlacePage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [refetch, setRefetch] = useState(false);

  const dispatch = useDispatch();

  const articales = useSelector((s) => s.market?.data?.data);

  const userData = useSelector((s) => s?.user?.userData);

  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = articales?.map((n) => n.studentName);
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

  const filteredUsers = applySortFilter(articales, getComparator(order, orderBy), filterName);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredUsers?.length - page * rowsPerPage);

  const isNotFound = !filteredUsers?.length && !!filterName;
  const getAllArtical = async () => {
    const res = await dispatch(getAllMarketPlace());
    if (res) {
      setRefetch(true);
    }
  };
  const handleDelete = async (id) => {
    const res = await dispatch(deleteMarketPlace(id));
    if (res.payload) {
      setRefetch(!refetch);
      getAllArtical();
    }
  };

  useEffect(() => {
    getAllArtical();
  }, [refetch, dispatch]);

  return (
    <>
      <Helmet>
        <title> Marketplaces | Saudi Green Building Forum </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" gutterBottom>
            Marketplaces
          </Typography>
          <Box>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => navigate('new-marketplace')}
            >
              New Marketplace
            </Button>
            {userData && userData?.role === "admin" ?
              <ExportToExcel apiData={articales} fileName={`Marketplace ${new Date()}`} />
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
                    const { _id } = row;
                    const selectedUser = selected.indexOf(_id) !== -1;

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
                        <TableCell>{!row?.name ? 'N/A' : row?.name}</TableCell>
                        <TableCell>{!row?.email ? 'N/A' : row?.email}</TableCell>
                        <TableCell>{!row?.brand_Name ? 'N/A' : row?.brand_Name}</TableCell>
                        <TableCell>{!row?.category ? 'N/A' : row?.category}</TableCell>
                        <TableCell>
                          {!row?.address ? 'N/A' : row?.address?.substring(0, 40)}
                          {!row?.address ? '' : '...'}
                        </TableCell>
                        <TableCell>{!row?.website ? 'N/A' : row?.website}</TableCell>
                        <TableCell>
                          {!row?.company_profile ? 'N/A' : row?.company_profile.slice(0, 50)}
                          {!row?.company_profile ? '' : '...'}
                        </TableCell>
                        <TableCell>{!row?.mobile ? 'N/A' : row?.mobile}</TableCell>
                        <TableCell>
                          {!row?.epd_specification ? 'N/A' : row?.epd_specification?.substring(0, 40)}
                          {!row?.epd_specification ? '' : '...'}
                        </TableCell>
                        <TableCell>{!row?.earned ? 'N/A' : row?.earned}</TableCell>
                        <TableCell>
                          {!row?.physical_prop ? 'N/A' : row?.physical_prop?.substring(0, 40)}
                          {!row?.physical_prop ? '' : '...'}
                        </TableCell>
                        <TableCell>
                          {!row?.note ? 'N/A' : row?.note?.substring(0, 40)}
                          {!row?.note ? '' : '...'}
                        </TableCell>
                        <TableCell>
                          {!row?.imgUrls || row?.imgUrls.length === 0 ? (
                            <img
                              src="/assets/images/avatars/avatar_default.jpg"
                              alt={!row?.name ? 'N/A' : row?.name}
                              width={'100px'}
                            />
                          ) : (
                            <img src={IMAGE_BASEURL + row?.imgUrls[0]} alt={row?.name} width={'100px'} />
                          )}
                        </TableCell>
                        <TableCell>
                          <Stack direction={'row'}>
                            <MenuItem
                              onClick={() =>
                                navigate(`/dashboard/marketplace_details/${_id}`, { state: { item: row } })
                              }
                            >
                              <Iconify icon={'carbon:view'} sx={{ mr: 2 }} />
                              View
                            </MenuItem>
                            <MenuItem onClick={() => navigate('edit-marketplace', { state: { item: row } })}>
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
