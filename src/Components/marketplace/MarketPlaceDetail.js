import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Container, Typography, Grid, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import MarketPlaceService from '../../Redux/API/MarketPlaceService';
import { IMAGE_BASEURL } from '../../Redux/API/http-common';
import Goback from '../UI/Goback';

export default function MarketPlaceDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    await MarketPlaceService.getbyId(id)
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
        <title> MarketPlace Detail | Saudi Green Building Forum </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" gutterBottom>
            MarketPlace Detail
          </Typography>
        </Stack>
        <Card>
          <Grid container spacing={2} p={4}>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Name</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {data?.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Email</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {data?.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Brand Name</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {data?.brand_Name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Category</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {data?.category}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Address</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {data?.address}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Website</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {data?.website}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Company Profile</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {data?.company_profile}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Mobile</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {data?.mobile}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">EPD Specification</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {data?.epd_specification}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Price</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {data?.price}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Physical Prop</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {data?.physical_prop}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Note</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {data?.note}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              {!data?.imgUrls || data?.imgUrls.length === 0
                ? null
                : data?.imgUrls.map((items, i) => (
                    <Box key={i} sx={{ margin: '5px', width: '300px', height: '200px' }}>
                      <img src={IMAGE_BASEURL + items} alt={data?.name} className="image-detail" />
                    </Box>
                  ))}
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
