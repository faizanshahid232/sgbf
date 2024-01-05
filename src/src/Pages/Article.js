/* eslint-disable import/newline-after-import */
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Stack, useMediaQuery, TablePagination } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import { getAllArticlesPublic } from 'src/Redux/Slice/articales';
// eslint-disable-next-line import/named
import { IMAGE_BASEURL } from '../../Redux/API/http-common';
import CustomButton from '../Components/UI/CustomButton';
import CustomInputs from '../Components/UI/CustomInputs';
import Default from '../Assets/No-Image.png';

function Article() {
  const dispatch = useDispatch();
  const smCard = useMediaQuery('(max-width:600px)');
  const lgCard = useMediaQuery('(max-width:800px)');
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const article = useSelector((s) => s?.articales?.data?.data);
  const [searchKey, setSearchKey] = useState('');
  const [articles, setArticles] = useState(article);
  const [fetch, setFetch] = useState(false);
  useEffect(() => {
    reFetchData();
  }, [dispatch, fetch]);

  const reFetchData = async () => {
    try {
      const res = await dispatch(getAllArticlesPublic());
      if (res?.payload?.data) {
        setArticles(res?.payload?.data);
        setFetch(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const findSearch = () => {
    const data = articles?.filter((item) => item?.title.toLowerCase().includes(searchKey.toLowerCase()));
    setArticles(data);
  };
  const resetSearch = () => {
    setSearchKey('');
    setArticles(article);
  };
  useEffect(() => {
    if (searchKey === '') {
      reFetchData();
    }
  }, [searchKey]);
  return (
    <Grid container sx={{ backgroundColor: '#EFEFEF' }}>
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
      {articles?.length !== 0 ? (
        <Grid sx={{ backgroundColor: '#EFEFEF', width: '100%' }}>
          <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} padding={4}>
            {articles?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((item, index) => {
              return (
                <Grid
                  item
                  key={index}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  flexDirection={smCard ? 'column' : 'row'}
                  width={lgCard ? '90%' : '70%'}
                  height={'auto'}
                  lg={8}
                  sm={12}
                  gap={6}
                  padding={4}
                  sx={{ marginTop: 5, backgroundColor: '#fff', justifyContent: 'center' }}
                >
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    width={smCard ? '70%' : '35%'}
                    height={'auto'}
                  >
                    <img
                      src={item?.image ? IMAGE_BASEURL + item?.image : Default}
                      alt="img"
                      height={'150px'}
                      width={'400px'}
                      style={{ objectFit: 'fill' }}
                    />
                  </Box>

                  <Stack
                    width={smCard ? '100%' : '60%'}
                    spacing={3}
                    textAlign={'justify'}
                    component={'div'}
                    onClick={() => navigate(`/article-details/${item._id}`)}
                    sx={{ cursor: 'pointer', marginY: '5' }}
                  >
                    <Typography color={'#C82334'}>{item?.title}</Typography>
                    <Typography color={'#C82334'}>{item?.publishedOn}</Typography>
                    <Typography color={'#C82334'}>{item?.tags}</Typography>
                  </Stack>
                </Grid>
              );
            })}
          </Stack>
        </Grid>
      ) : (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }} p={2}>
          <Typography>No Data Found</Typography>
        </Box>
      )}
      <Grid item display={'flex'} width={'100%'} alignItems={'center'} justifyContent={'center'}>
        <TablePagination
          rowsPerPageOptions={[12, 124, 36]}
          component="div"
          count={articles !== undefined ? articles?.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />{' '}
      </Grid>
    </Grid>
  );
}

export default Article;
