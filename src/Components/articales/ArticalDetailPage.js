import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Container, Typography, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArticalServices from '../../Redux/API/ArticalServices';
import { IMAGE_BASEURL } from '../../Redux/API/http-common';
import Goback from '../UI/Goback';

export default function ArticalDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    await ArticalServices.getArticlebyId(id)
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
        <title> Article Detail | Saudi Green Building Forum </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" gutterBottom>
            Article Detail
          </Typography>
        </Stack>
        <Card>
          <Grid container spacing={2} p={4}>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Title</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {data?.title}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Body</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <div dangerouslySetInnerHTML={{ __html: data?.body }} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Summary</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {data?.summary}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Publish On</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {data?.publishedOn}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Published By</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                {data?.publishedBy?.firstName}&nbsp;{data?.publishedBy?.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              {!data?.image ? null : <img src={IMAGE_BASEURL + data?.image} alt={data?.title} />}
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
