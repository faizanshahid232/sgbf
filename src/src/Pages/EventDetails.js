/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Typography, Grid, Container, Divider } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { toast } from 'react-toastify';
import { getEventbyId } from '../../Redux/Slice/events';
import { getUserData } from '../../Redux/Slice/user';
import EventTabsView from '../../Components/events/EventTabsView';
import { IMAGE_BASEURL } from '../../Redux/API/http-common';
import CustomTypography from '../Components/UI/CustomTypography';
import CustomInputs from '../Components/UI/CustomInputs';
import CustomButton from '../Components/UI/CustomButton';
import DefaultImage from '../Assets/No-Image.png';
import { registeredEvent } from '../../Redux/Slice/registerEvent';

const initialValues = {
  eventId: null,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
};

function EventDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector((s) => s?.user?.userData);
  // console.log('user_____', user.firstName);
  const [values, setValues] = useState({
    eventId: null,
    firstName: user.firstName,
    lastName: user?.lastName ? user?.lastName : '',
    email: user?.email ? user?.email : '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const matches = useMediaQuery('(max-width:700px)');

  // console.log('::::::::::::::::::', matches);

  // console.log('values:::::::::', values);

  useEffect(() => {
    fetchDescription();
  }, [dispatch]);

  const getUserDataa = async () => {
    try {
      const res = await dispatch(getUserData());
      // console.log('res________', res);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // useEffect(() => {
  //   getUserDataa();
  // }, [dispatch]);

  const fetchDescription = async () => {
    try {
      const res = await dispatch(getEventbyId(params.id));
    } catch (error) {
      console.log(error);
    }
  };
  const validations = (fieldValue = values) => {
    const temp = { ...errors };
    if ('firstName' in fieldValue) {
      temp.firstName = fieldValue.firstName ? '' : 'This field requires';
    }
    if ('lastName' in fieldValue) {
      temp.lastName = fieldValue.lastName ? '' : 'This field requires';
    }
    if ('email' in fieldValue) {
      temp.email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(fieldValue.email) ? '' : 'Email is not valid';
    }

    if ('message' in fieldValue) {
      temp.message = fieldValue.message ? '' : 'This field requires';
    }
    if ('phone' in fieldValue) {
      temp.phone = fieldValue.phone ? '' : 'This field requires';
    }
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === '');
  };

  const currentDate = new Date().toLocaleDateString();
  const event = useSelector((s) => s?.events?.eventDetails?.data);
  console.log('event____', event);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    validations({ [name]: value });
  };
  const handleSubmit = () => {
    values.eventId = event?._id;
    dispatch(registeredEvent(values));
  };
  return (
    <Box my={10}>
      <Container maxWidth="lg">
        <Grid container paddingX={4}>
          <Link to="/">
            <Grid> Events</Grid>
          </Link>
          <Grid item xs={12} my={2}>
            {' '}
            <CustomTypography variant={'mainHeading'}>{event?.eventHeadline}</CustomTypography>
          </Grid>
          <Grid item xs={12} display={'flex'} justifyContent={'center'}>
            <Box height={'auto'} marginX={'auto'}>
              {console.log('event?.eventFeatureImage', event?.eventFeatureImage === undefined)}
              <img
                width={'100%'}
                height={'400px'}
                src={event?.eventFeatureImage === undefined ? DefaultImage : IMAGE_BASEURL + event?.eventFeatureImage}
                alt="img"
              />
            </Box>
          </Grid>
          <Grid item xs={12} display={'flex'} flexDirection={matches ? 'column-reverse' : 'row'}>
            <Grid container display={'flex'} flexDirection={'column'} marginY={2} xs={12} lg={8}>
              <Grid item>
                <Typography>
                  <b>Title:&nbsp;</b> {event?.title ? event?.title : 'N/A'}
                </Typography>
                <Typography>
                  <b> Headline:&nbsp;</b> {event?.eventHeadline ? event?.eventHeadline : 'N/A'}
                </Typography>
                <Grid display={'flex'} flexDirection={matches ? 'column' : 'row'} gap={matches ? 0 : 4}>
                  <Typography>
                    <b>Event Terms:&nbsp;</b> {event?.eventTerms ? event?.eventTerms : 'N/A'}
                  </Typography>
                  <Typography>
                    <b> Fees:&nbsp;</b>${event?.eventFee ? event?.eventFee : 'N/A'}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid item>
                <Stack>
                  <Typography fontWeight={700}> Timings</Typography>
                  <Typography>
                    <b>Date:&nbsp;</b> {event?.eventDate ? event?.eventDate : 'N/A'}
                  </Typography>
                  <Grid container display={'flex'} flexDirection={matches ? 'column' : 'row'} gap={matches ? 0 : 4}>
                    <Typography>
                      <b>Start time:&nbsp;</b> {event?.eventStartTime ? event?.eventStartTime : 'N/A'}
                    </Typography>
                    <Typography>
                      <b>End Time:&nbsp;</b> {event?.eventEndTime ? event?.eventEndTime : 'N/A'}
                    </Typography>
                  </Grid>
                </Stack>
              </Grid>
              <Divider />
              <Grid item>
                <Stack>
                  <Typography fontWeight={700}> Location</Typography>
                  <Grid container>
                    {' '}
                    <Stack>
                      <Grid item display={'flex'} flexDirection={matches ? 'column' : 'row'} gap={matches ? 0 : 4}>
                        {' '}
                        <Typography>
                          <b>Venue:&nbsp;</b>
                          {event?.eventVenue ? event?.eventVenue : 'N/A'}
                        </Typography>
                        <Typography>
                          <b>City:&nbsp;</b>
                          {event?.eventCity ? event?.eventCity : 'N/A'}
                        </Typography>
                        <Typography>
                          <b>State:&nbsp;</b>
                          {event?.eventState ? event?.eventState : 'N/A'}
                        </Typography>
                        <Typography>
                          <b>Country:&nbsp;</b>
                          {event?.eventCountry ? event?.eventCountry : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid display={'flex'} flexDirection={matches ? 'column' : 'row'} gap={matches ? 0 : 4}>
                        <Typography>
                          <b>Address1:&nbsp;</b>
                          {event?.eventAddress ? event?.eventAddress : 'N/A'}
                        </Typography>
                        <Typography>
                          <b>Address2:&nbsp;</b>
                          {event?.eventAddress2 ? event?.eventAddress2 : 'N/A'}
                        </Typography>
                      </Grid>
                    </Stack>
                  </Grid>
                </Stack>
              </Grid>
              <Divider />
            </Grid>
            <Grid container marginY={2} xs={12} lg={4} gap={2} p={2}>
              <Typography>Organized by:</Typography>
              <Box>
                <img
                  src={!event?.eventMainSponserLogo ? '' : IMAGE_BASEURL + event?.eventMainSponserLogo}
                  alt="sponsor"
                  width={100}
                  height={100}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid py={10} item xs={12}>
            <EventTabsView
              eventAgenda={event?.eventAgenda}
              eventSpeakers={event?.eventSpeakers}
              eventSponsers={event?.eventSponsers}
              eventSummary={event?.eventSummary}
              eventFee={event?.eventFee}
              eventLinkText={event?.eventLinkText}
              eventUrl={event?.eventUrl}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container display={'flex'} flexDirection={'column'}>
              <Grid item marginY={2}>
                <CustomTypography variant={'mainHeading'}>Register for this Event</CustomTypography>
              </Grid>{' '}
              <CustomInputs
                inputLabel="First Name"
                // placeholder="Enter First Name"
                value={values.firstName}
                name="firstName"
                onChange={handleInputChange}
                error={errors.firstName}
                fullWidth
              />
              <CustomInputs
                inputLabel="Last Name"
                // placeholder="Enter Last Name"
                value={values.lastName}
                name="lastName"
                onChange={handleInputChange}
                error={errors.lastName}
                fullWidth
              />{' '}
              <CustomInputs
                inputLabel="Email"
                // placeholder="email"
                value={values.email}
                name="email"
                type="email"
                onChange={handleInputChange}
                error={errors.email}
                fullWidth
              />
              <CustomInputs
                inputLabel="Phone Number"
                // placeholder="Enter Last Name"
                value={values.phone}
                name="phone"
                type="tel"
                onChange={handleInputChange}
                error={errors.phone}
                fullWidth
              />
              <Grid>
                {' '}
                <CustomInputs
                  inputLabel="Message"
                  placeholder="write a message"
                  value={values.message}
                  name="message"
                  onChange={handleInputChange}
                  fullWidth
                  error={errors.message}
                />
              </Grid>
              <Grid item marginY={1} marginX={'auto'}>
                {' '}
                <CustomButton variant={'primaryOutlined'} onClick={() => handleSubmit()}>
                  Submit
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default EventDetails;
