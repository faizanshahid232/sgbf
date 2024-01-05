/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { IMAGE_BASEURL } from 'src/Redux/API/http-common';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function EventTabsView({
  eventAgenda,
  eventSpeakers,
  eventSponsers,
  eventSummary,
  eventFee,
  eventLinkText,
  eventUrl,
}) {
  const [value, setValue] = React.useState(0);

  const handleChanges = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', border: '1px solid #D3D3D3' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChanges} aria-label="basic tabs example">
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Agenda" {...a11yProps(1)} />
          <Tab label="Speakers" {...a11yProps(2)} />
          <Tab label="Sponser" {...a11yProps(3)} />
          <Tab label="Register" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stack sx={{ backgroundColor: 'white', boxShadow: 4, padding: 4 }} spacing={1}>
          <Typography variant="semibold">Event Summary</Typography>
          <Box>
            {!eventSummary ? (
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                N/A
              </Typography>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: eventSummary }} />
            )}
          </Box>
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="semibold">Event Agenda</Typography>
        {eventAgenda?.map((item, index) => (
          <Stack spacing={2} key={item.id}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="subtitle1">Total Time</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                  {!item?.agenda?.totaltime ? 'N/A' : item?.agenda?.totaltime}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="subtitle1">Summary</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                  {!item?.agenda?.summary ? 'N/A' : item?.agenda?.summary}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="subtitle1">Event Details</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                {!item?.agenda?.details ? (
                  <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                    N/A
                  </Typography>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: !item?.agenda?.details }} />
                )}
              </Grid>
            </Grid>
          </Stack>
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="semibold">Event Speakers</Typography>
        {eventSpeakers?.map((item, index) => (
          <Stack spacing={2} key={item.id}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="subtitle1">Title</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                  {!item?.speaker?.eventSpeakerTitle ? 'N/A' : item?.speaker?.eventSpeakerTitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="subtitle1">Name</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                  {!item?.speaker?.eventSpeakerName ? 'N/A' : item?.speaker?.eventSpeakerName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="subtitle1">Event Speaker Bio</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                  {!item?.speaker?.eventSpeakerBio ? 'N/A' : item?.speaker?.eventSpeakerBio}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                {!item?.speaker?.eventSpeakerImage ? (
                  ''
                ) : (
                  <Typography variant="subtitle1">Event Speaker Image</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                {!item?.speaker?.eventSpeakerImage ? (
                  ''
                ) : (
                  <img width={'200px'} src={`${IMAGE_BASEURL}${item?.speaker?.eventSpeakerImage}`} alt="" />
                )}
              </Grid>
            </Grid>
          </Stack>
        ))}{' '}
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography variant="semibold">Event Sponser</Typography>
        {eventSponsers?.map((item, index) => (
          <Stack spacing={2} key={item.id}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="subtitle1">Name</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                  {!item?.sponser?.eventSponserName ? 'N/A' : item?.sponser?.eventSponserName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="subtitle1">Event Sponser Bio</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                  {!item?.sponser?.eventSponserBio ? 'N/A' : item?.sponser?.eventSponserBio}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                {!item?.sponser?.eventSponserImage ? (
                  ''
                ) : (
                  <Typography variant="subtitle1">Event Sponser Image</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                {!item?.sponser?.eventSponserImage ? (
                  ''
                ) : (
                  <img width={'200px'} src={`${IMAGE_BASEURL}${item?.sponser?.eventSponserImage}`} alt="" />
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="subtitle1">URL</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                  {!item?.sponser?.eventSponserUrl ? 'N/A' : item?.sponser?.eventSponserUrl}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="subtitle1">Link Text</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                  {!item?.sponser?.eventLinkTest ? 'N/A' : item?.sponser?.eventLinkTest}
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        ))}{' '}
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="subtitle1">Event Fee</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="subtitle1" sx={{ color: 'gray' }}>
              {!eventFee ? 'N/A' : eventFee}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="subtitle1">URL</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="subtitle1" sx={{ color: 'gray' }}>
              {!eventUrl ? 'N/A' : eventUrl}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="subtitle1">Link Text</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="subtitle1" sx={{ color: 'gray' }}>
              {!eventLinkText ? 'N/A' : eventLinkText}
            </Typography>
          </Grid>
        </Grid>{' '}
      </TabPanel>
    </Box>
  );
}
