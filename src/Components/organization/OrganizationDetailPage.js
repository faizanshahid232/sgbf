import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Container, Typography, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import OrganizationServices from '../../Redux/API/OrganizationServices';
import { IMAGE_BASEURL } from '../../Redux/API/http-common';
import Goback from '../UI/Goback';

export default function OrganizationDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    await OrganizationServices.getOrganizationbyId(id)
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
        <title> Organization Detail | Saudi Green Building Forum </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" gutterBottom>
            Organization Detail
          </Typography>
        </Stack>
        <Card>
          <Grid container spacing={2} p={4}>
            <Grid item xs={12} sm={12} md={10}>
              {!data?.organizationLogo ? (
                ''
              ) : (
                <img
                  src={`${IMAGE_BASEURL}${data?.organizationLogo}`}
                  alt={!data?.title ? 'N/A' : data?.title}
                  width={'100px'}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Title</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.title ? 'N/A' : data?.title}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Organization Email</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.organizationEmail ? 'N/A' : data?.organizationEmail}
              </Typography>
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4}>
                            <Typography variant='subtitle1'>Organization Membership</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8}>
                            <Typography variant='subtitle1' sx={{ color: 'gray' }}>{!data?.organizationMembership ? "N/A" : data?.organizationMembership}</Typography>
                        </Grid> */}
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Organization Mission</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.organizationMission ? (
                  'N/A'
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: data?.organizationMission }} />
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Group</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.group ? 'N/A' : data?.group}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Address</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.address_line1 ? '' : data?.address_line1} {!data?.address_line2 ? '' : data?.address_line2}
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
              <Typography variant="subtitle1">Country</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.country_code ? 'N/A' : data?.country_code}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              {!data?.organizationHeaderImage ? (
                ''
              ) : (
                <img src={`${IMAGE_BASEURL}${data?.organizationHeaderImage}`} alt="" />
              )}
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
