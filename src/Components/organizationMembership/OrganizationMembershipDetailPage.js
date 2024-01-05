import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Container, Typography, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import OrganizationMembershipServices from '../../Redux/API/OrganizationMembershipServices';
import Goback from '../UI/Goback';

export default function OrganizationMembershipDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    await OrganizationMembershipServices.getOrganizationMembershipbyId(id)
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
        <title> Organization Membership Detail | Saudi Green Building Forum </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" gutterBottom>
            Organization Membership Detail
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
              <Typography variant="subtitle1">Establishment Name</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.establishmentName ? 'N/A' : data?.establishmentName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Payment Status</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.paymentStatus ? 'N/A' : data?.paymentStatus}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Expiry Date</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.expiryDate ? 'N/A' : data?.expiryDate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Industry Category</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.industryCategory ? 'N/A' : data?.industryCategory}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Membership Fee</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.membershipFee ? '' : data?.membershipFee}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Membership Start Date</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.membershipStartDate ? 'N/A' : data?.membershipStartDate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Membership Term</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.membershipTerm ? 'N/A' : data?.membershipTerm}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Authored By</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.authoredBy ? 'N/A' : data?.authoredBy}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Terms And Conditions</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.termsAndConditions ? 'N/A' : data?.termsAndConditions}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
