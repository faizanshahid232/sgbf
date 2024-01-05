/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, TablePagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMarketPlacePublic } from '../../Redux/Slice/marketPlaceSlice';
import MarketCard from '../../Components/UI/Card/MarketCard';
import CustomButton from '../Components/UI/CustomButton';
import CustomInputs from '../Components/UI/CustomInputs';
import PeopleCard from '../../Components/UI/Card/PeopleCard';
import { getAllMembers } from '../../Redux/Slice/memberSlice';

function MarketPlace() {
  const dispatch = useDispatch();
  // const member = useSelector((s) => s?.members?.data?.data);

  const [marketplace, setMarketplace] = useState('');
  const [fetch, setFetch] = useState(false);
  useEffect(() => {
    getMarketPlace();
  }, [dispatch, fetch]);

  const getMarketPlace = async () => {
    try {
      const res = await dispatch(getAllMarketPlacePublic());
      if (res?.payload?.data) {
        setMarketplace(res?.payload?.data);
        setFetch(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [page, setPage] = useState(0);
  const [searchKey, setSearchKey] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(12);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const findSearch = () => {
    const data = marketplace?.filter((item) => item?.name.toLowerCase().includes(searchKey.toLowerCase()));
    setMarketplace(data);
  };
  useEffect(() => {
    if (searchKey === '') {
      getMarketPlace();
    }
  }, [searchKey]);
  const resetSearch = () => {
    setSearchKey('');
    getMarketPlace();
  };
  return (
    <Grid container sx={{ backgroundColor: '#EFEFEF' }}>
      <Box
        display={'flex'}
        width={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{ backgroundColor: '#626262' }}
        padding={12}
      >
        <Typography sx={{ fontSize: 50, fontWeight: 500, color: '#fff' }}> Marketplace</Typography>
      </Box>
      <Grid item xs={12} p={2} pt={4}>
        <Grid container spacing={2} justifyContent={'center'} alignItems={"center"}>
          <Grid item xs={11} sm={8} md={6} lg={4}>
            <CustomInputs
              placeholder="search"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={5} md={3} lg={2} className='space-container'>
            <CustomButton variant="primaryOutlined" width={'auto'} onClick={findSearch}>
              SEARCH
            </CustomButton>
            <CustomButton variant="primaryOutlined" width={'auto'} onClick={resetSearch}>
              RESET
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent={'center'} p={2}>
        <Grid item xs={12} sm={12} md={10}>
          {marketplace?.length !== 0 ? (
            <Grid spacing={2} container my={2}>
              {marketplace?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((item, index) => {
                return (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <MarketCard item={item} />
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Typography>No Data Found</Typography>
            </Box>
          )}
          <Grid item display={'flex'} width={'100%'} alignItems={'center'} justifyContent={'center'}>
            <TablePagination
              rowsPerPageOptions={[12, 24, 36]}
              component="div"
              count={marketplace !== undefined ? marketplace?.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />{' '}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MarketPlace;
