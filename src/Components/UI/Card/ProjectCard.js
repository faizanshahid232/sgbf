/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Default from '../../../src/Assets/No-Image.png';
import { IMAGE_BASEURL } from '../../../Redux/API/http-common';

function ProjectCard({ item }) {
  const navigate = useNavigate();
  return (
    <Grid
      container
      onClick={() => {
        navigate(`/project-details/${item?._id}`);
      }}
    >
      <Grid item xs={12} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Grid
          container
          m={1}
          sx={{ backgroundColor: '#fff', cursor: 'pointer', padding: '20px', borderRadius: '10px' }}
          height={400}
        >
          <Grid item xs={12} className="flex-space">
            <img
              src={
                (!item && item?.featureImage === null) || item?.featureImage === undefined
                  ? Default
                  : item?.featureImage?.indexOf('http') !== -1
                  ? item?.featureImage
                  : IMAGE_BASEURL + item?.featureImage
              }
              alt="photoURL"
              style={{ width: '70%', height: '100%', objectFit: '100%' }}
            />
          </Grid>
          <Grid item xs={12} pt={1}>
            <Typography sx={{ fontWeight: 'bold', color: 'black', textDecoration: 'inherit' }}>
              {item?.title.slice(0, 20)}
              {!item?.title ? '' : ' ...'}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" sx={{ color: 'gray' }}>
              {item?.ratingSystem}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" sx={{ color: 'gray' }}>
              {item?.country_code}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'gray' }}>
              {item?.dateCertified ? item?.dateCertified : ''}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProjectCard;
