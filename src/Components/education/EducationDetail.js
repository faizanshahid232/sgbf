import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Container, Typography, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { IMAGE_BASEURL } from '../../Redux/API/http-common';
import EducationService from '../../Redux/API/EducationService';

export default function EducationDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    await EducationService.getbyId(id)
      .then((item) => {
        setData(item.data.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  return (
    <>
      <Helmet>
        <title> Education Detail | Saudi Green Building Forum </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" gutterBottom>
            Education Detail
          </Typography>
        </Stack>
        <Card>
          <Grid container spacing={2} p={4}>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Title</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {!data?.title ? 'N/A' : data?.title}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Program</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {!data?.program ? 'N/A' : data?.program}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Continuing Education</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {!data?.continuingEducation ? 'N/A' : data?.continuingEducation}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Level</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {!data?.level ? 'N/A' : data?.level}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Introduction</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              {!data?.introduction ? 'N/A' :
                <div dangerouslySetInnerHTML={{ __html: data?.introduction }} />}
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">About</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              {!data?.about ? 'N/A' :
                <div dangerouslySetInnerHTML={{ __html: data?.about }} />}
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Objective</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              {!data?.objective ? 'N/A' :
                <div dangerouslySetInnerHTML={{ __html: data?.objective }} />}
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">CreatedBy</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {!data?.createdBy ? "N/A" : data?.createdBy?.firstName}{" "}{!data?.createdBy ? "" : data?.createdBy?.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">CreatedAt</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {!data?.createdAt ? 'N/A' : new Date(data?.createdAt).toDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              {!data?.image ? null : <img src={IMAGE_BASEURL + data?.image} alt={data?.title} height={'100vh'} />}
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
