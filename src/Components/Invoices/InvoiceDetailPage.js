import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Container, Typography, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import InvoiceServices from '../../Redux/API/InvoiceServices';
import Goback from '../UI/Goback';

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    await InvoiceServices.getInvoicebyId(id)
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
        <title> Invoice Detail | Saudi Green Building Forum </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" gutterBottom>
            Invoice Detail
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
              <Typography variant="subtitle1">Full Name</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.fullName ? 'N/A' : data?.fullName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Email</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.emailAddress ? 'N/A' : data?.emailAddress}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Related User</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.relatedUser ? 'N/A' : data?.relatedUser}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Related Node</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.relatedNode ? 'N/A' : data?.relatedNode}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Invoice ID</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.invoiceID ? 'N/A' : data?.invoiceID}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Invoice Amount</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.invoiceAmount ? 'N/A' : data?.invoiceAmount}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Invoice Date</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.invoiceDate ? 'N/A' : data?.invoiceDate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Invoice Status</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.invoiceStatus ? 'N/A' : data?.invoiceStatus}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Payment Mode</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.paymentMode ? 'N/A' : data?.paymentMode}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Payment Date</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.paymentDate ? 'N/A' : data?.paymentDate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Stripe Token</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.stripeToken ? 'N/A' : data?.stripeToken}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Invoice Description</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.invoiceDescription ? 'N/A' : data?.invoiceDescription}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
