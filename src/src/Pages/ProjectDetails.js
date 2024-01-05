import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import { Box, Stack, Typography, Grid, Divider } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// import Default from '../Assets/frontend/assets/img/default.jpg';
import { IMAGE_BASEURL } from '../../Redux/API/http-common';
import CustomButton from '../Components/UI/CustomButton';
import Default from '../Assets/No-Image.png';
import { getProjectsbyId } from '../../Redux/Slice/projects';

function ProjectDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchDescription();
  }, [dispatch]);

  const fetchDescription = async () => {
    try {
      const res = await dispatch(getProjectsbyId(params.id));
    } catch (error) {
      console.log(error);
    }
  };
  const projectByID = useSelector((s) => s?.projects?.projectDetails?.data);
  return (
    <Grid container xs={8} marginX={'auto'} gap={2} p={3}>
      <Grid item xs={12} py={2}>
        <Typography fontWeight={'bold'} sx={{ color: '#000' }}>{`${projectByID?.title}`}</Typography>
      </Grid>
      <Grid container xs={12} gap={2}>
        <Grid item md={4} xs={12}>
          <Box width={'100%'}>
            <img
              src={
                (!projectByID && projectByID?.featureImage === null) || projectByID?.featureImage === undefined
                  ? Default
                  : projectByID?.featureImage?.indexOf('http') !== -1
                  ? projectByID?.featureImage
                  : IMAGE_BASEURL + projectByID?.featureImage
              }
              alt="photoURL"
              width="100%"
              height="100%"
            />
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container rowSpacing={2}>
            <Grid item xs={8} display={'flex'} gap={1}>
              <Typography variant="body1" fontWeight={'bold'} sx={{ color: '#000' }}>
                Address:
              </Typography>
              <Link to="" style={{ textDecoration: 'none' }}>
                {' '}
                <Typography variant="body1" sx={{ color: '#00929f' }}>
                  {projectByID?.locality ? projectByID?.locality : 'N/A'}
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={8} display={'flex'} gap={1}>
              <Typography variant="body1" fontWeight={'bold'} sx={{ color: '#000' }}>
                Rating System:
              </Typography>
              <Typography variant="body1" sx={{ color: '#00929f' }}>
                {projectByID?.ratingSystem ? projectByID?.ratingSystem : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={8} display={'flex'} gap={1}>
              <Typography variant="body1" fontWeight={'bold'} sx={{ color: '#000' }}>
                Last Certified on:
              </Typography>
              <Typography variant="body1" sx={{ color: 'black' }}>
                {projectByID?.dateCertified ? projectByID?.dateCertified : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={8} display={'flex'} gap={1}>
              <Typography variant="body2" fontWeight={'bold'} sx={{ color: '#000' }}>
                Certification Level :
              </Typography>
              <Typography variant="body1" sx={{ color: 'black' }}>
                {projectByID?.certificationLevel ? projectByID?.certificationLevel : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={8} display={'flex'} gap={1}>
              <Typography variant="body2" fontWeight={'bold'} sx={{ color: '#000' }}>
                Rating System :
              </Typography>
              <Typography variant="body1" sx={{ color: 'black' }}>
                {projectByID?.ratingSystem ? projectByID?.ratingSystem : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={8} display={'flex'} gap={1}>
              <Typography variant="body2" fontWeight={'bold'} sx={{ color: '#000' }}>
                Registeration Date :
              </Typography>
              <Typography variant="body1" sx={{ color: 'black' }}>
                {projectByID?.registerationDate ? projectByID?.registerationDate : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={8} display={'flex'} gap={1}>
              <Typography variant="body2" fontWeight={'bold'} sx={{ color: '#000' }}>
                Gross Sq Foot :
              </Typography>
              <Typography variant="body1" sx={{ color: 'black' }}>
                {projectByID?.GrossSqFoot ? projectByID?.GrossSqFoot : 'N/A'}
              </Typography>
            </Grid>

            <Grid item xs={8} display={'flex'} gap={1}>
              <Typography variant="body2" fontWeight={'bold'} sx={{ color: '#000' }}>
                Is Certified :
              </Typography>
              <Typography variant="body1" sx={{ color: 'black' }}>
                {projectByID?.IsCertified ? projectByID?.IsCertified : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={8} display={'flex'} gap={1}>
              <Typography variant="body2" fontWeight={'bold'} sx={{ color: '#000' }}>
                State :
              </Typography>
              <Typography variant="body1" sx={{ color: 'black' }}>
                {projectByID?.state ? projectByID?.state : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={8} display={'flex'} gap={1}>
              <Typography variant="body2" fontWeight={'bold'} sx={{ color: '#000' }}>
                City :
              </Typography>
              <Typography variant="body1" sx={{ color: 'black' }}>
                {projectByID?.city ? projectByID?.city : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={8} display={'flex'} gap={1}>
              <Typography variant="body2" fontWeight={'bold'} sx={{ color: '#000' }}>
                Address Line :
              </Typography>
              <Typography variant="body1" sx={{ color: 'black' }}>
                {projectByID?.address_line1 ? projectByID?.address_line1 : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={8} display={'flex'} gap={1}>
              <Typography variant="body2" fontWeight={'bold'} sx={{ color: '#000' }}>
                Latitude :
              </Typography>
              <Typography variant="body1" sx={{ color: 'black' }}>
                {projectByID?.latitude ? projectByID?.latitude : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={8} display={'flex'} gap={1}>
              <Typography variant="body2" fontWeight={'bold'} sx={{ color: '#000' }}>
                Longitude :
              </Typography>
              <Typography variant="body1" sx={{ color: 'black' }}>
                {projectByID?.longitude ? projectByID?.longitude : 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {/* <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Certification Level</TableCell>
                <TableCell align="left">Level</TableCell>
                <TableCell align="right">Certification date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {projectByID?.ratingSystem}
                </TableCell>
                <TableCell align="left"> {projectByID?.certificationLevel}</TableCell>
                <TableCell align="right">{projectByID?.dateCertified}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer> */}
      </Grid>
      <Grid item>
        <Grid item>
          {' '}
          <Typography fontWeight={'900'} color={'black'} fontSize={20}>
            Project Info
          </Typography>
        </Grid>
        <Grid item display={'flex'} gap={4} color={'black'}>
          <Typography fontWeight={'bold'} color={'black'}>
            Size
          </Typography>
          <Typography color={'black'}>
            {projectByID?.projectAreaSquareMeters ? `${projectByID?.projectAreaSquareMeters} sq ft` : 'N/A'}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProjectDetails;
