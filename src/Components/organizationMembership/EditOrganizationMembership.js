/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable func-names */
/* eslint-disable no-return-assign */
/* eslint-disable react/button-has-type */
/* eslint-disable no-multi-str */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from 'moment/moment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateOrganizationMembership, editOrganizationMembership } from '../../Redux/Slice/orgMembership';
import { CreateEvent } from '../../Redux/Slice/events';
import Goback from '../UI/Goback';

const initialValues = {
  title: '',
  establishmentName: '',
  industryCategory: '',
  country_code: '',
  address_line1: '',
  address_line2: '',
  locality: '',
  postal_code: '',
  membershipTerm: '',
  membershipFee: 0,
  paymentStatus: '',
};

const paymentStatuses = [
  {
    id: 0,
    name: 'paid',
  },
  {
    id: 1,
    name: 'unpaid',
  },
];

const EditOrganizationMembership = () => {
  const { state } = useLocation();
  const [values, setValues] = useState({
    title: state.item.title,
    establishmentName: state.item.establishmentName,
    industryCategory: state.item.industryCategory,
    country_code: state.item.countryCode,
    address_line1: state.item.addressLine1,
    address_line2: state.item.addressLine2,
    locality: state.item.locality,
    postal_code: state.item.postalCode,
    membershipTerm: state.item.membershipTerm,
    membershipFee: state.item.membershipFee,
    paymentStatus: state.item.paymentStatus,
  });
  const [errors] = useState({});
  const [startDate, setStartDate] = useState(moment(state.item.membershipStartDate).toDate());
  const [endDate, setEndDate] = useState(moment(state.item.expiryDate).toDate());
  const [termCheck, setTermCheck] = useState(state.item.termsAndConditions);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        editOrganizationMembership({
          id: state.item._id,
          data: {
            ...values,
            membershipStartDate: startDate,
            expiryDate: endDate,
            termsAndConditions: termCheck,
          },
        })
      );
      if (res.payload.success) {
        setValues(initialValues);
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

  const handleStartDateChange = (date) => {
    console.log('date', moment(date).format('YYYY-MM-DD'));
    setStartDate(moment(date).format('YYYY-MM-DD'));
  };
  const handleEndDateChange = (date) => {
    console.log('date', moment(date).format('YYYY-MM-DD'));
    setEndDate(moment(date).format('YYYY-MM-DD'));
  };

  return (
    <Stack spacing={2}>

      <Typography variant="h6">Edit Organization Membership</Typography>
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
                  <DatePicker value={startDate} onChange={handleStartDateChange} label="Membership Start Date " />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item md={3} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer sx={{ width: '100%', pt: 0 }} components={['DatePicker']}>
                  <DatePicker value={endDate} onChange={handleEndDateChange} label="Expiry Date " />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                helperText={errors.membershipTerm}
                fullWidth
                name="membershipTerm"
                type="text"
                value={values.membershipTerm}
                label="Membership Term"
                onChange={handleChange}
                error={errors.membershipTerm}
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                helperText={errors.membershipFee}
                fullWidth
                name="membershipFee"
                type="number"
                label="MembershipFee"
                value={values.membershipFee}
                onChange={handleChange}
                error={errors.membershipFee}
              />
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
                helperText={errors.establishmentName}
                fullWidth
                name="establishmentName"
                type="text"
                label="Establishment Name"
                value={values.establishmentName}
                onChange={handleChange}
                error={errors.establishmentName}
              />
            </Box>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <TextField
                helperText={errors.industryCategory}
                sx={{ width: '100%' }}
                name="industryCategory"
                type="text"
                value={values.industryCategory}
                label="Industry Category"
                onChange={handleChange}
                error={errors.industryCategory}
              />
              <TextField
                helperText={errors.country_code}
                sx={{ width: '100%' }}
                name="country_code"
                type="text"
                value={values.country_code}
                label="country"
                onChange={handleChange}
                error={errors.country_code}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display={'flex'} flexDirection="column" gap={2}>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.address_line1}
                fullWidth
                name="address_line1"
                type="text"
                value={values.address_line1}
                label="Address_line1"
                onChange={handleChange}
                error={errors.address_line1}
              />
              <TextField
                helperText={errors.address_line2}
                fullWidth
                name="address_line2"
                type="text"
                label="Address_line2"
                value={values.address_line2}
                onChange={handleChange}
                error={errors.address_line2}
              />
            </Box>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <TextField
                helperText={errors.locality}
                sx={{ width: '100%' }}
                name="locality"
                type="text"
                value={values.locality}
                label="Locality"
                onChange={handleChange}
                error={errors.locality}
              />
              <TextField
                helperText={errors.postal_code}
                sx={{ width: '100%' }}
                name="postal_code"
                type="text"
                value={values.postal_code}
                label="Postal Code"
                onChange={handleChange}
                error={errors.postal_code}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display={'flex'} flexDirection="column" gap={2}>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Payment Status</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  name="paymentStatus"
                  value={values.paymentStatus}
                  onChange={handleChange}
                  error={errors.paymentStatus}
                  label="Payment Status"
                >
                  {paymentStatuses &&
                    paymentStatuses?.map((item) => (
                      <MenuItem value={item.name} key={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
                {errors.courseName && (
                  <p style={{ color: 'red', fontSize: '12px', paddingLeft: '5%' }}>{errors.courseName}</p>
                )}
              </FormControl>
              <FormControlLabel
                control={<Checkbox onChange={(e) => setTermCheck(e.target.checked ? 'Yes' : 'No')} />}
                label="Terms And Conditions"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display={'flex'} justifyContent="flex-end">
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default EditOrganizationMembership;
