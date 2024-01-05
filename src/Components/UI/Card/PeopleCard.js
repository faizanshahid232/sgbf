import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { IMAGE_BASEURL } from '../../../Redux/API/http-common';
import Default from '../../../src/Assets/user.png';

const PeopleCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Grid
      p={2}
      sx={{ backgroundColor: '#fff', cursor: 'pointer',borderRadius:'10px' }}
      height={325}
      onClick={() => navigate(`/members-info/${item?._id}`)}
      
    >
      <Grid item xs={12} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Box width={'150px'} height={'150px'}>
          <img
            src={
              (!item && item?.profilePic === null) || item?.profilePic === undefined
                ? Default
                : item?.profilePic?.indexOf('http') !== -1
                  ? item?.profilePic
                  : IMAGE_BASEURL + item?.profilePic
            }
            alt="photoURL"
            width="100%"
            height="100%"
          />
        </Box>
      </Grid>
      <Grid item xs={12} my={2}>
        {' '}
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: 'bold', color: 'black', textDecoration: 'inherit' }}>
            {!item?.firstName?"":item?.firstName.slice(0,10)}{" "}{!item?.lastName?"":item?.lastName.slice(0,10)}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'gray' }}>
            {item?.companyName}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" sx={{ color: 'gray' }}>
            {!item?.jobTitle ? "" : item?.jobTitle.slice(0, 20)}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" sx={{ color: 'gray' }}>
            {item?.country_code}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PeopleCard;
