import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Container, Typography, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ProjectServices from '../../Redux/API/ProjectServices';
import { IMAGE_BASEURL } from '../../Redux/API/http-common';
import Goback from '../UI/Goback';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    getData();
  }, [id]);

  const navigate = useNavigate();
  const getData = async () => {
    await ProjectServices.getProjectbyId(id)
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
        <title> Project Detail | Saudi Green Building Forum </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" gutterBottom>
            Project Detail
          </Typography>
        </Stack>
        <Card>
          <Grid container spacing={2} p={4}>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Title</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.title ? 'N/A' : data?.title}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Country Code</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.country_code ? 'N/A' : data?.country_code}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Postal Code</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.postal_code ? 'N/A' : data?.postal_code}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Locality</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.locality ? 'N/A' : data?.locality}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Date Certified</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.dateCertified ? 'N/A' : data?.dateCertified}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Certification Level</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.certificationLevel ? 'N/A' : data?.certificationLevel}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Rating System</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.ratingSystem ? 'N/A' : data?.ratingSystem}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Project Area Square Meters</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.projectAreaSquareMeters ? 'N/A' : data?.projectAreaSquareMeters}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Date Certified</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.dateCertified ? 'N/A' : data?.dateCertified}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Registeration Date</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.registerationDate ? 'N/A' : data?.registerationDate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Gross Sq Foot</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.GrossSqFoot ? 'N/A' : data?.GrossSqFoot}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Is Certified</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.IsCertified ? 'N/A' : data?.IsCertified}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">state</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.state ? 'N/A' : data?.state}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">city</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.city ? 'N/A' : data?.city}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">address_line1</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.address_line1 ? 'N/A' : data?.address_line1}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">latitude</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.latitude ? 'N/A' : data?.latitude}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">longitude</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.longitude ? 'N/A' : data?.longitude}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Feature Image</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              {!data?.featureImage ? (
                ''
              ) : (
                <img
                  height={'350px'}
                  src={`${IMAGE_BASEURL}${data?.featureImage}`}
                  alt={!data?.title ? 'N/A' : data?.title}
                />
              )}
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
