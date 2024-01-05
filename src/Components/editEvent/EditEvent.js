/* eslint-disable import/extensions */
/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable func-names */
/* eslint-disable no-return-assign */
/* eslint-disable react/button-has-type */
/* eslint-disable no-multi-str */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, Divider, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from 'moment/moment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';
import { parse } from 'date-fns';
import { CreateEvent, editEvent } from '../../Redux/Slice/events';
import RichTextEditor from '../UI/TextField/RichTextEditor';
import EventTabs from '../events/EventTabs';
import Goback from '../UI/Goback';

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
  eventUrl: '',
  eventLinkTest: '',
};

const EditEvent = () => {
  const { state } = useLocation();
  const [values, setValues] = useState({
    title: state.item.title,
    eventTerms: state.item.eventTerms,
    eventFee: state.item.eventFee,
    eventUrl: state.item.eventUrl,
    eventAddress: state.item.eventAddress,
    eventAddress2: state.item.eventAddress2,
    eventCity: state.item.eventCity,
    eventAddressPostalCode: state.item.eventAddressPostalCode,
    eventHeadline: state.item.eventHeadline,
    eventVenue: state.item.eventVenue,
  });
  console.log(values);
  const [country, setCountry] = useState(state.item.eventCountry);
  const [body, setBody] = useState(state.item.eventSummary);

  const [region, setRegion] = useState(state.item.eventState);

  const [startDateString, endDateString] = state.item.eventDate.split(' - ');

  const [errors] = useState({});
  const [img, setImg] = useState(null);
  const [logo, setLogo] = useState(null);
  const [startDate, setStartDate] = useState(moment(startDateString).toDate());
  const [endDate, setEndDate] = useState(moment(endDateString).toDate());
  const [startDate1, setStartDate1] = useState();
  const [endDate1, setEndDate1] = useState();
  const [isUpdate, setIsUpdate] = useState(null);

  const [startTime, setStartTime] = useState(parse(state.item.eventStartTime, 'h:mm a', new Date()));
  const [endTime, setEndTime] = useState(parse(state.item.eventEndTime, 'h:mm a', new Date()));

  // console.log('state_______', state);
  // console.log('startTime', startTime);

  function isDateFormatValid(dateString) {
    const dateFormatRegex =
      /^([A-Za-z]{3}) ([A-Za-z]{3}) (\d{2}) (\d{4}) (\d{2}):(\d{2}):(\d{2}) (GMT[+-]\d{4}) \(([A-Za-z\s]+)\)$/;

    return dateFormatRegex.test(dateString);
  }

  function isValidTimeFormat(dateString) {
    const dateFormatRegex = /^[A-Za-z]{3} [A-Za-z]{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} (GMT[+-]\d{4}) \([A-Za-z\s]+\)$/;

    return dateFormatRegex.test(dateString);
  }
  // const department = useSelector((s)=> s.department?.data)
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [agendas, setAgendas] = useState(state.item.eventAgenda);

  const [speakers, setSpeakers] = useState(state.item.eventSpeakers);

  const [sponsers, setSponsers] = useState(state.item.eventSponsers);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdate(true);
    try {
      const res = await dispatch(
        editEvent({
          id: state.item._id,
          data: {
            ...values,
            eventDate: `${isDateFormatValid(startDate) ? moment(startDate).format('YYYY-MM-DD') : startDate1} - ${
              isDateFormatValid(startDate) ? moment(endDate).format('YYYY-MM-DD') : endDate1
            }`,
            eventStartTime: isValidTimeFormat(startTime) ? moment(startTime).format('h:mm a') : startTime,
            eventCountry: country,
            eventState: region,
            eventSummary: body,
            eventEndTime: isValidTimeFormat(endTime) ? moment(endTime).format('h:mm a') : endTime,
            eventMainSponserLogo: logo,
            eventFeatureImage: img,
            eventAgenda: agendas,
            eventSpeakers: speakers,
            eventSponsers: sponsers,
          },
        })
      );
      if (res.payload.success) {
        setValues(initialValues);
        setSpeakers([
          {
            id: uuidv4(),
            speaker: {
              eventSpeakerName: '',
              eventSpeakerTitle: '',
              eventSpeakerBio: '',
              eventSpeakerImage: null,
            },
          },
        ]);
        setAgendas([
          {
            id: uuidv4(),
            agenda: {
              totaltime: '',
              summary: '',
              details: '',
            },
          },
        ]);
        setSponsers([
          {
            id: uuidv4(),
            sponser: {
              eventSponserName: '',
              eventSponserBio: '',
              eventSponserLogo: '',
              eventSponserUrl: '',
              eventLinkTest: '',
            },
          },
        ]);
        setImg(null);
        setLogo(null);
        setStartDate();
        setEndDate();
        setStartTime();
        setEndTime();
        setIsUpdate(false);
        navigate('/dashboard/events');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleTermsChange = (e) => {
    const { name, checked } = e.target;
  
    setValues((prevValues) => ({
      ...prevValues,
      eventTerms: checked
        ? [...prevValues.eventTerms, name]
        : prevValues.eventTerms.filter((term) => term !== name),
    }));
  };

  const handleFileLogoChange = (e) => {
    const file = e.target.files[0];

    const fileType = file.type;
    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      toast.error('Please select a valid image (JPEG, PNG)');
      return;
    }

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 3) {
      toast.error('File size exceeds the maximum limit of 3 MB.');

      return;
    }
    setLogo(file);
  };

  const handleFileFeacherImageChange = (e) => {
    const file = e.target.files[0];

    const fileType = file.type;
    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      toast.error('Please select a valid image (JPEG, PNG)');
      return;
    }

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 3) {
      toast.error('File size exceeds the maximum limit of 3 MB.');

      return;
    }
    setImg(file);
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
    <>
      <Stack spacing={2}>
        <Typography variant="h6">Edit Event</Typography>
        <Grid
          sx={{ overflowX: 'hidden', backgroundColor: 'white' }}
          px={4}
          rowSpacing={4}
          container
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant="semibold">Date & Time</Typography>
              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid sx={{ pl: 0 }} item md={6} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DemoContainer sx={{ pt: 0 }} components={['DatePicker']}>
                      <DatePicker
                        slotProps={{ textField: { fullWidth: true } }}
                        onChange={handleStartDateChange}
                        value={startDate}
                        label="Start date "
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item md={6} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DemoContainer sx={{ pt: 0 }} components={['DatePicker']}>
                      <DatePicker
                        value={endDate}
                        slotProps={{ textField: { fullWidth: true } }}
                        onChange={handleEndDateChange}
                        label="End date "
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item md={6} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DemoContainer sx={{ width: '100%', pt: 0 }} components={['TimePicker']}>
                      <TimePicker
                        value={startTime}
                        slotProps={{ textField: { fullWidth: true } }}
                        onChange={handleStartTime}
                        label="Start time"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item md={6} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DemoContainer sx={{ width: '100%', pt: 0 }} components={['TimePicker']}>
                      <TimePicker
                        value={endTime}
                        slotProps={{ textField: { fullWidth: true } }}
                        onChange={handleEndTime}
                        label="End time"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Divider />

          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant="semibold">Details</Typography>
              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item md={6} xs={12}>
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
                </Grid>

                <Grid item md={6} xs={12}>
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
                </Grid>
                <Grid item md={12} xs={12}>
                  <Stack spacing={1}>
                    <Typography variant="semibold">Event Terms</Typography>
                    <Stack>
                      <FormControlLabel
                        sx={{ marginBottom: 0 }}
                        control={<Checkbox name="Conference" onChange={handleTermsChange} />}
                        checked={values.eventTerms.includes('Conference')}
                        label="Conference"
                      />
                      <FormControlLabel
                        sx={{ marginBottom: 0 }}
                        control={<Checkbox name="Training" onChange={handleTermsChange} />}
                        checked={values.eventTerms.includes('Training')}
                        label="Training"
                      />
                      <FormControlLabel
                        sx={{ marginBottom: 0 }}
                        control={<Checkbox name="Workshop" onChange={handleTermsChange} />}
                        checked={values.eventTerms.includes('Workshop')}
                        label="Workshop"
                      />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item md={12} xs={12}>
                  <EventTabs
                    speakers={speakers}
                    setSpeakers={setSpeakers}
                    setAgendas={setAgendas}
                    body={body}
                    setBody={setBody}
                    agendas={agendas}
                    sponsers={sponsers}
                    setSponsers={setSponsers}
                    values={values}
                    handleChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant="semibold">Country & Region</Typography>
              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item md={6} xs={12}>
                  <CountryDropdown
                    style={{ padding: '15px', width: '100%', borderRadius: '4px', borderColor: 'gray' }}
                    required
                    value={country}
                    onChange={setCountry}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <RegionDropdown
                    style={{ padding: '15px', width: '100%', borderRadius: '4px', borderColor: 'gray' }}
                    required
                    classes={{ width: '50vw' }}
                    country={country}
                    value={region}
                    onChange={setRegion}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
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
                </Grid>
                <Grid item md={6} xs={12}>
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
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant="semibold">Address</Typography>
              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item md={6} xs={12}>
                  <TextField
                    helperText={errors.eventAddress}
                    fullWidth
                    name="eventAddress"
                    multiline
                    rows={3}
                    type="text"
                    value={values.eventAddress}
                    label="Event Address"
                    onChange={handleChange}
                    error={errors.eventAddress}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    helperText={errors.eventAddress2}
                    fullWidth
                    multiline
                    rows={3}
                    name="eventAddress2"
                    type="text"
                    label="Event Address2"
                    value={values.eventAddress2}
                    onChange={handleChange}
                    error={errors.eventAddress2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    helperText={errors.eventAddressPostalCode}
                    sx={{ width: '100%' }}
                    name="eventAddressPostalCode"
                    type="text"
                    value={values.eventAddressPostalCode}
                    label="Postal Code"
                    onChange={handleChange}
                    error={errors.eventAddressPostalCode}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant="semibold">Images</Typography>
              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item md={6} xs={12}>
                  <Stack spacing={1}>
                    <Typography>Event Main Sponser Logo</Typography>
                    <input
                      accept="image/png, image/gif, image/jpeg"
                      type="file"
                      onChange={handleFileLogoChange}
                    />
                  </Stack>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Stack spacing={1}>
                    <Typography>Event Feature Img</Typography>
                    <input
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={handleFileFeacherImageChange}
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Box display={'flex'} justifyContent="flex-end">
                <Button disabled={isUpdate} type="submit" variant="contained">
                  {isUpdate ? 'Loading....' : 'Update'}
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default EditEvent;
