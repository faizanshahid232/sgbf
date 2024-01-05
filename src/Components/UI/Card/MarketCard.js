import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { IMAGE_BASEURL } from '../../../Redux/API/http-common';
import Default from '../../../src/Assets/No-Image.png';

const MarketCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Grid
      p={2}
      my={1}
      sx={{ backgroundColor: '#fff', cursor: 'pointer',borderRadius:'10px' }}
      onClick={() => navigate(`/market-info/${item?._id}`)}
      height={'350px'}
    >
      <Grid item xs={12} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Box width={'150px'} height={'160px'}>
          <img
            src={
              item && item?.imgUrls?.length === 0
                ? Default
                : item?.imgUrls[0]?.indexOf('http') !== -1
                ? item?.imgUrls[0]
                : IMAGE_BASEURL + item?.imgUrls[0]
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
            {item?.name === '' ? item?.nameInAbaric : item?.name}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'gray' }}>
            {item?.brand_Name}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" sx={{ color: 'gray' }}>
            {item?.earned}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" sx={{ color: 'gray' }}>
            {item?.category}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MarketCard;
