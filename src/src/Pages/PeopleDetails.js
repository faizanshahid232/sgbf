import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import { Box, Stack, Typography, useMediaQuery, Grid, TablePagination } from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Default from '../Assets/frontend/assets/img/default.jpg';
import { IMAGE_BASEURL } from '../../Redux/API/http-common';
import BasicTabs from '../Components/MyTabs';
import Conference from '../Assets/frontend/assets/img/conferences.png';
import { getMemberbyId } from '../../Redux/Slice/memberSlice';
import Default from '../Assets/man.png';

function PeopleDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchDescription();
  }, [dispatch]);

  const fetchDescription = async () => {
    try {
      const res = await dispatch(getMemberbyId(params.id));
    } catch (error) {
      console.log(error);
    }
  };
  const memberByID = useSelector((s) => s?.members?.data?.data);

  return (
    <Grid container p={4}>
      <Grid item xs={12} md={10} marginX={'auto'}>
        <Grid item xs={12} py={2}>
          <Typography fontWeight={'bold'} sx={{ color: '#000' }}>{`${memberByID?.firstName || ''}  ${memberByID?.lastName || ''
            }`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item md={3} xs={12}>
              <Box width={'200px'} height={'210px'}>
                <img
                  src={
                    (!memberByID && memberByID?.profilePic === null) || memberByID?.profilePic === undefined
                      ? Default
                      : memberByID?.profilePic?.indexOf('http') !== -1
                        ? memberByID?.profilePic
                        : IMAGE_BASEURL + memberByID?.profilePic
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
                <Grid memberByID xs={8}>
                  <Typography variant="body1" fontWeight={'bold'} sx={{ color: '#000' }}>
                    {"Company Name: "}{memberByID?.companyName ? memberByID?.companyName : 'N/A'}
                  </Typography>
                </Grid>
                <Grid memberByID xs={8}>
                  <Typography variant="body1" sx={{ color: '#00929f' }}>
                  {"Job Title: "} {memberByID?.jobTitle ? memberByID?.jobTitle : 'N/A'}
                  </Typography>
                </Grid>
                <Grid memberByID xs={8}>
                  <Typography variant="body1" sx={{ color: 'black' }}>
                  {"Country: "}{memberByID?.country_code ? memberByID?.country_code : 'N/A'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PeopleDetails;
