/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable func-names */
/* eslint-disable no-return-assign */
/* eslint-disable react/button-has-type */
/* eslint-disable no-multi-str */
/* eslint-disable import/no-unresolved */
import React, { useRef, useState } from 'react';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from 'moment/moment';
import { useLocation } from 'react-router-dom';
import { parse } from 'date-fns';
import { CreateEvent, editEvent } from '../../Redux/Slice/events';
import { CreateArticle } from '../../Redux/Slice/articales';

const initialValues = {
  title: '',
  eventTerms: '',
  eventSummary: '',
  eventFee: '',
  eventRegistrationURL: '',
  eventCountry: '',
  eventAddress: '',
  eventAddress2: '',
  eventCity: '',
  eventState: '',
  eventAddressPostalCode: '',
  eventHeadline: '',
  eventVenue: '',
};

const EditEvent = () => {
  const { state } = useLocation();
  const [values, setValues] = useState({
    title: state.item.title,
    eventTerms: state.item.eventTerms,
    eventSummary: state.item.eventSummary,
    eventFee: state.item.eventFee,
    eventRegistrationURL: state.item.eventRegistrationURL,
    eventCountry: state.item.eventCountry,
    eventAddress: state.item.eventAddress,
    eventAddress2: state.item.eventAddress2,
    eventCity: state.item.eventCity,
    eventState: state.item.eventState,
    eventAddressPostalCode: state.item.eventAddressPostalCode,
    eventHeadline: state.item.eventHeadline,
    eventVenue: state.item.eventVenue,
  });

  const [startDateString, endDateString] = state.item.eventDate.split(' - ');

  const [errors, setErrors] = useState({});
  const [img, setImg] = useState(null);
  const [logo, setLogo] = useState(null);
  const [startDate, setStartDate] = useState(moment(startDateString).toDate());
  const [endDate, setEndDate] = useState(moment(endDateString).toDate());
  const [startDate1, setStartDate1] = useState();
  const [endDate1, setEndDate1] = useState();

  const [startTime, setStartTime] = useState(parse(state.item.eventStartTime, 'h:mm a', new Date()));
  const [endTime, setEndTime] = useState(parse(state.item.eventEndTime, 'h:mm a', new Date()));
  // const department = useSelector((s)=> s.department?.data)

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        editEvent({
          id: state.item._id,
          data: {
            ...values,
            eventDate: `${startDate1} - ${endDate1}`,
            eventStartTime: startTime,
            eventEndTime: endTime,
            eventMainSponserLogo: logo,
            eventFeatureImage: img,
          },
        })
      );
      // if (res.payload.success) {
      //   setValues(initialValues);
      // }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleStartDateChange = (date) => {
    console.log('date', moment(date).format('YYYY-MM-DD'));
    setStartDate1(moment(date).format('YYYY-MM-DD'));
  };
  const handleEndDateChange = (date) => {
    console.log('date', moment(date).format('YYYY-MM-DD'));
    setEndDate1(moment(date).format('YYYY-MM-DD'));
  };

  const handleStartTime = (time) => {
    console.log('start time', moment(time).format('h:mm a'));
    setStartTime(moment(time).format('h:mm a'));
  };
  const handleEndTime = (time) => {
    console.log('start time', moment(time).format('h:mm a'));
    setEndTime(moment(time).format('h:mm a'));
  };
  return (
    <Stack spacing={2}>
      <Typography variant="h6">Edit Events</Typography>
      <Grid
        sx={{ overflowX: 'hidden', backgroundColor: 'white' }}
        px={4}
        spacing={2}
        container
        component="form"
        onSubmit={handleSubmit}
      >
        <Grid item xs={12}>
          <Grid container>
            <Grid item md={3} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer sx={{ width: '100%', pt: 0 }} components={['DatePicker']}>
                  <DatePicker value={startDate} onChange={handleStartDateChange} label="Date" />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item md={3} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer sx={{ width: '100%', pt: 0 }} components={['DatePicker']}>
                  <DatePicker value={endDate} onChange={handleEndDateChange} label="Date" />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item md={3} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer sx={{ width: '100%', pt: 0 }} components={['TimePicker']}>
                  <TimePicker value={startTime} onChange={handleStartTime} label="Start time" />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item md={3} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer sx={{ width: '100%', pt: 0 }} components={['TimePicker']}>
                  <TimePicker value={endTime} onChange={handleEndTime} label="End time" />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display={'flex'} flexDirection="column" gap={2}>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.title}
                fullWidth
                name="title"
                type="text"
                value={values.title}
                label="Title"
                onChange={handleChange}
                error={errors.title}
              />
              <TextField
                helperText={errors.eventTerms}
                fullWidth
                name="eventTerms"
                type="text"
                label="Event Terms"
                value={values.eventTerms}
                onChange={handleChange}
                error={errors.eventTerms}
              />
            </Box>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <TextField
                helperText={errors.eventTerms}
                sx={{ width: '100%' }}
                name="eventSummary"
                type="text"
                value={values.eventSummary}
                label="Event Summary"
                onChange={handleChange}
                error={errors.eventTerms}
              />
              <TextField
                helperText={errors.eventFee}
                sx={{ width: '100%' }}
                name="eventFee"
                type="text"
                value={values.eventFee}
                label="Event Fee"
                onChange={handleChange}
                error={errors.eventFee}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display={'flex'} flexDirection="column" gap={2}>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.eventRegistrationURL}
                fullWidth
                name="eventRegistrationURL"
                type="text"
                value={values.eventRegistrationURL}
                label="Event RegistrationURL"
                onChange={handleChange}
                error={errors.eventRegistrationURL}
              />
              <TextField
                helperText={errors.eventCountry}
                fullWidth
                name="eventCountry"
                type="text"
                label="Event Country"
                value={values.eventCountry}
                onChange={handleChange}
                error={errors.eventCountry}
              />
            </Box>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <TextField
                helperText={errors.eventState}
                sx={{ width: '100%' }}
                name="eventState"
                type="text"
                value={values.eventState}
                label="Event State"
                onChange={handleChange}
                error={errors.eventState}
              />
              <TextField
                helperText={errors.eventCity}
                sx={{ width: '100%' }}
                name="eventCity"
                type="text"
                value={values.eventCity}
                label="Event City"
                onChange={handleChange}
                error={errors.eventCity}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display={'flex'} flexDirection="column" gap={2}>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.eventAddress}
                fullWidth
                name="eventAddress"
                type="text"
                value={values.eventAddress}
                label="Event Address"
                onChange={handleChange}
                error={errors.eventAddress}
              />
              <TextField
                helperText={errors.eventAddress2}
                fullWidth
                name="eventAddress2"
                type="text"
                label="Event Address2"
                value={values.eventAddress2}
                onChange={handleChange}
                error={errors.eventAddress2}
              />
            </Box>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <TextField
                helperText={errors.eventAddressPostalCode}
                sx={{ width: '100%' }}
                name="eventAddressPostalCode"
                type="text"
                value={values.eventAddressPostalCode}
                label="Event AddressPostalCode"
                onChange={handleChange}
                error={errors.eventAddressPostalCode}
              />
              <TextField
                helperText={errors.eventHeadline}
                sx={{ width: '100%' }}
                name="eventHeadline"
                type="text"
                value={values.eventHeadline}
                label="Event Headline"
                onChange={handleChange}
                error={errors.eventHeadline}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <TextField
                helperText={errors.eventVenue}
                sx={{ width: '100%' }}
                name="eventVenue"
                type="text"
                value={values.eventVenue}
                label="Event Venue"
                onChange={handleChange}
                error={errors.eventVenue}
              />{' '}
            </Box>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <Stack spacing={1}>
                <Typography>Sponser LOGO</Typography>
                <input type="file" onChange={(e) => setLogo(e.target.files[0])} />
              </Stack>
              <Stack spacing={1}>
                <Typography>Event Feature Img</Typography>
                <input type="file" onChange={(e) => setImg(e.target.files[0])} />
              </Stack>
            </Box>

            <Box display={'flex'} justifyContent="flex-end">
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default EditEvent;
