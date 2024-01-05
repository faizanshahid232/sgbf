/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import { Box, Stack, Typography, useMediaQuery, Grid, TablePagination } from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Default from '../Assets/frontend/assets/img/default.jpg';
import { getAllMarketPlacePublicById } from '../../Redux/Slice/marketPlaceSlice';
import { IMAGE_BASEURL } from '../../Redux/API/http-common';
import BasicTabs from '../Components/MyTabs';
import Conference from '../Assets/frontend/assets/img/conferences.png';
import { getMemberbyId } from '../../Redux/Slice/memberSlice';
import Default from '../Assets/No-Image.png';

function MarketDetails() {
  const params = useParams();
  console.log('params', params);
  const dispatch = useDispatch();
  useEffect(() => {
    getMarketPlaceDescription();
  }, [dispatch]);

  const getMarketPlaceDescription = async () => {
    try {
      const res = await dispatch(getAllMarketPlacePublicById(params.id));
    } catch (error) {
      console.log(error);
    }
  };
  const market = useSelector((s) => s?.market?.marketData?.data);

  // console.log('market____', market);

  return (
    <Grid container p={4}>
      <Grid item xs={12} md={10} marginX={'auto'}>
        <Grid item xs={12} py={2}>
          <Typography fontWeight={'bold'} sx={{ color: '#000' }}>
            {market?.name || market?.nameInAbaric || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item md={3} xs={12}>
              <Box width={'200px'} height={'210px'}>
                <img
                  src={
                    market && market?.imgUrls?.length === 0
                      ? Default
                      : market?.imgUrls[0]?.indexOf('http') !== -1
                      ? market?.imgUrls[0]
                      : IMAGE_BASEURL + market?.imgUrls[0]
                  }
                  alt="photoURL"
                  width="100%"
                  height="100%"
                />
              </Box>
            </Grid>

            <Grid item md={9} xs={12}>
              {' '}
              <Grid container gap={1}>
                <Grid item xs={8}>
                  <Typography variant="semibold" sx={{ color: 'black' }}>
                    Brand Name :
                    <Typography component={'span'}>{market?.brand_Name ? market?.brand_Name : 'N/A'}</Typography>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="semibold" sx={{ color: 'black' }}>
                    Company Profile :
                    <Typography component={'span'}>
                      {' '}
                      {market?.company_profile ? market?.company_profile : 'N/A'}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="semibold" sx={{ color: 'black' }}>
                    Category :<Typography component={'span'}>{market?.category ? market?.category : 'N/A'}</Typography>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="semibold" sx={{ color: 'black' }}>
                    Price :<Typography component={'span'}>{market?.price ? market?.price : 'N/A'}</Typography>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="semibold" sx={{ color: 'black' }}>
                    Website :{' '}
                    {market?.website ? (
                      <a
                        style={{ color: 'blue', fontSize: '12px' }}
                        href={market?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit
                      </a>
                    ) : (
                      ''
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="semibold" sx={{ color: 'black' }}>
                    URL :{' '}
                    {market?.url ? (
                      <a
                        style={{ color: 'blue', fontSize: '12px' }}
                        href={market?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit
                      </a>
                    ) : (
                      ''
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="semibold" sx={{ color: 'black' }}>
                    Company Profile :
                    <Typography component={'span'}>
                      {market?.company_profile ? market?.company_profile : 'N/A'}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="semibold" sx={{ color: 'black' }}>
                    date :<Typography component={'span'}>{market?.date ? market?.date : 'N/A'} </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="semibold" sx={{ color: 'black' }}>
                    Company Profile :
                    <Typography component={'span'}>
                      {market?.company_profile ? market?.company_profile : 'N/A'}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="semibold" sx={{ color: 'black' }}>
                    Earned :<Typography component={'span'}> {market?.earned ? market?.earned : 'N/A'}</Typography>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="semibold" sx={{ color: 'black' }}>
                    Email :<Typography component={'span'}>{market?.email ? market?.email : 'N/A'}</Typography>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="semibold" sx={{ color: 'black' }}>
                    Member Of SGBF :{' '}
                    <Typography component={'span'}>{market?.memberOfSGBF ? market?.memberOfSGBF : 'N/A'}</Typography>
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Typography variant="semibold" sx={{ color: 'black' }}>
                    Physical Prop :{' '}
                    <Typography component={'span'}>{market?.physical_prop ? market?.physical_prop : 'N/A'}</Typography>
                  </Typography>
                </Grid>

                {/* <Grid item xs={8}>
                  <Typography variant="body1" sx={{ color: 'black' }}>
                    url : {market?.url ? market?.url : ''}
                  </Typography>
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid py={4} item xs={12}>
          <Grid container>
            {market &&
              market?.imgUrls?.length !== 0 &&
              market?.imgUrls?.map((item, index, arr) => (
                <Grid item md={3} xs={12} key={index}>
                  <img height={'100px'} src={IMAGE_BASEURL + arr[index + 1]} alt="" />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MarketDetails;
