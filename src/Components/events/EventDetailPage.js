import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Container, Typography, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import EventsServices from '../../Redux/API/EventsServices';
import { IMAGE_BASEURL } from '../../Redux/API/http-common';
import EventTabs from './EventTabsView';
import Goback from '../UI/Goback';

export default function EventDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    await EventsServices.getEventbyId(id)
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
        <title> Event Detail | Saudi Green Building Forum </title>
      </Helmet>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" gutterBottom>
            Event Detail
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
              <Typography variant="subtitle1">Event State</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.eventState ? 'N/A' : data?.eventState}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Event Venue</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.eventVenue ? 'N/A' : data?.eventVenue}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Event Date</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.eventDate ? 'N/A' : data?.eventDate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Event StartTime</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.eventStartTime ? 'N/A' : data?.eventStartTime}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Event EndTime</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.eventEndTime ? 'N/A' : data?.eventEndTime}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Event Headline</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.eventHeadline ? 'N/A' : data?.eventHeadline}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Event Summary</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              {!data?.eventSummary ? (
                <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                  N/A
                </Typography>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: data?.eventSummary }} />
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Event Terms</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.eventTerms ? 'N/A' : data?.eventTerms}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="subtitle1">Event Address</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                {!data?.eventAddress ? '' : data?.eventAddress} {!data?.eventCity ? '' : data?.eventCity}{' '}
                {!data?.eventCountry ? '' : data?.eventCountry}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              {!data?.eventFeatureImage ? '' : <Typography variant="subtitle1">Event FeatureImage</Typography>}
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              {!data?.eventFeatureImage ? (
                ''
              ) : (
                <img width={'200px'} src={`${IMAGE_BASEURL}${data?.eventFeatureImage}`} alt="" />
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              {!data?.eventMainSponserLogo ? '' : <Typography variant="subtitle1">Event MainSponser Logo</Typography>}
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              {!data?.eventFeatureImage ? (
                ''
              ) : (
                <img width={'200px'} src={`${IMAGE_BASEURL}${data?.eventMainSponserLogo}`} alt="" />
              )}
            </Grid>
            <Grid item xs={12}>
              <EventTabs
                eventAgenda={data?.eventAgenda}
                eventSpeakers={data?.eventSpeakers}
                eventSponsers={data?.eventSponsers}
                eventSummary={data?.eventSummary}
                eventFee={data?.eventFee}
                eventLinkText={data?.eventLinkText}
                eventUrl={data?.eventUrl}
              />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
