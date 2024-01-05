/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable func-names */
/* eslint-disable no-return-assign */
/* eslint-disable react/button-has-type */
/* eslint-disable no-multi-str */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllEvents } from '../../Redux/Slice/events';
import { CreateEventAgenda } from '../../Redux/Slice/eventAgenda';
import Timer from './Timer';

const initialValues = {
  eventId: '',
  totalTimeDuration: '',
  agendaSummary: '',
  agendaDetails: '',
  eventSpeakerName: '',
  eventSpeakerTitle: '',
  eventSpeakerBio: '',
};

const NewEventagenda = () => {
  const [values, setValues] = useState(initialValues);
  const [errors] = useState({});
  const [img, setImg] = useState(null);
  const [inputTime, setInputTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  console.log('inputTime: ', inputTime);



  const events = useSelector((s) => s.events?.data?.data);
  console.log('_____membership', events);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { seconds, minutes, hours } = inputTime;
    const totalTime = seconds + minutes * 60 + hours * 3600;
    try {
      const res = await dispatch(
        CreateEventAgenda({
          ...values,
          eventSpeakerImage: img,
          totalTimeDuration: formatTime(totalTime),
        })
      );
      if (res.payload.success) {
        setValues(initialValues);
        toast.success('Event Agenda Created Successfully');
      }
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

  const getAllEventss = async () => {
    try {
      const res = await dispatch(getAllEvents());
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllEventss();
  }, [dispatch]);

  return (
    <Stack spacing={2}>
      <Typography variant="h6">New EventAgenda</Typography>
      <Grid
        sx={{ overflowX: 'hidden', backgroundColor: 'white' }}
        p={6}
        spacing={2}
        container
        component="form"
        onSubmit={handleSubmit}
      >
        <Grid item xs={12} md={6}>
          <Box display={'flex'} flexDirection="column" gap={2}>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.agendaSummary}
                fullWidth
                name="agendaSummary"
                type="text"
                value={values.agendaSummary}
                label="Agenda Summary"
                onChange={handleChange}
                error={errors.agendaSummary}
              />
              <TextField
                helperText={errors.agendaDetails}
                fullWidth
                name="agendaDetails"
                type="text"
                label="Agenda Details"
                value={values.agendaDetails}
                onChange={handleChange}
                error={errors.agendaDetails}
              />
            </Box>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <TextField
                helperText={errors.eventSpeakerName}
                sx={{ width: '100%' }}
                name="eventSpeakerName"
                type="text"
                value={values.eventSpeakerName}
                label="Event Speaker Name"
                onChange={handleChange}
                error={errors.eventSpeakerName}
              />
              <TextField
                helperText={errors.eventSpeakerTitle}
                sx={{ width: '100%' }}
                name="eventSpeakerTitle"
                type="text"
                value={values.eventSpeakerTitle}
                label="Event Speaker Title"
                onChange={handleChange}
                error={errors.eventSpeakerTitle}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display={'flex'} flexDirection="column" gap={2}>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.eventSpeakerBio}
                fullWidth
                name="eventSpeakerBio"
                type="text"
                value={values.eventSpeakerBio}
                label="Event Speaker Bio"
                onChange={handleChange}
                error={errors.eventSpeakerBio}
              />
              <TextField
                helperText={errors.address_line2}
                fullWidth
                name="address_line2"
                type="text"
                label="Address line2"
                value={values.address_line2}
                onChange={handleChange}
                error={errors.address_line2}
              />
            </Box>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Events</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  name="eventId"
                  value={values.eventId}
                  onChange={handleChange}
                  error={errors.eventId}
                  label="Organization Membership"
                >
                  {events &&
                    events?.map((item) => (
                      <MenuItem value={item._id} key={item._id}>
                        {item.title}
                      </MenuItem>
                    ))}
                </Select>
                {errors.courseName && (
                  <p style={{ color: 'red', fontSize: '12px', paddingLeft: '5%' }}>{errors.courseName}</p>
                )}
              </FormControl>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <Stack spacing={1}>
                <Typography>Event Speaker Image</Typography>
                <input type="file" onChange={(e) => setImg(e.target.files[0])} />
              </Stack>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Timer inputTime={inputTime} setInputTime={setInputTime}  />

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

export default NewEventagenda;
