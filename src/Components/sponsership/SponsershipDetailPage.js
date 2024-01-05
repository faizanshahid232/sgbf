import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Container, Typography, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import SponsershipServices from '../../Redux/API/SponsershipServices';
import Goback from '../UI/Goback';

export default function SponsershipDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    await SponsershipServices.getSponsershipbyId(id)
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
        <title> Sponsership Detail | Saudi Green Building Forum </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" gutterBottom>
            Sponsership Detail
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
              <Typography variant="subtitle1">Sponsor Name</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.sponsorName ? 'N/A' : data?.sponsorName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Sponsorship Amount</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.sponsorshipAmount ? 'N/A' : data?.sponsorshipAmount}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Sponsorship Email</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.sponsorshipEmail ? 'N/A' : data?.sponsorshipEmail}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Sponsorship Level</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.sponsorshipLevel ? 'N/A' : data?.sponsorshipLevel}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Sponsorship Fee</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.sponsorshipFee ? '' : data?.sponsorshipFee}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
