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
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Goback from '../UI/Goback';
import { CreateSponsership, editSponsership } from '../../Redux/Slice/sponsership';

const initialValues = {
  title: '',
  personName: '',
  sponsorName: '',
  sponsorshipEmail: '',
  sponsorshipLevel: '',
  paymentStatus: '',
  sponsorshipFee: '',
  sponsorshipAmount: 0,
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
const EditSponsership = () => {
  const { state } = useLocation();
  const [values, setValues] = useState({
    title: state.item.title,
    personName: state.item.personName,
    sponsorName: state.item.sponsorName,
    sponsorshipEmail: state.item.sponsorshipEmail,
    sponsorshipLevel: state.item.sponsorshipLevel,
    paymentStatus: state.item.paymentStatus,
    sponsorshipFee: state.item.sponsorshipFee,
    sponsorshipAmount: state.item.sponsorshipAmount,
  });
  const [errors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        editSponsership({
          id: state.item._id,
          data: values,
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

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Edit Sponsership</Typography>
      <Grid
        sx={{ overflowX: 'hidden', backgroundColor: 'white' }}
        px={4}
        spacing={2}
        container
        component="form"
        onSubmit={handleSubmit}
      >
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
                helperText={errors.personName}
                fullWidth
                name="personName"
                type="text"
                label="Person Name"
                value={values.personName}
                onChange={handleChange}
                error={errors.personName}
              />
            </Box>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <TextField
                helperText={errors.sponsorName}
                sx={{ width: '100%' }}
                name="sponsorName"
                type="text"
                value={values.sponsorName}
                label="Sponsor Name"
                onChange={handleChange}
                error={errors.sponsorName}
              />
              <TextField
                helperText={errors.sponsorshipEmail}
                sx={{ width: '100%' }}
                name="sponsorshipEmail"
                type="text"
                value={values.sponsorshipEmail}
                label="Sponsorship Email"
                onChange={handleChange}
                error={errors.sponsorshipEmail}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display={'flex'} flexDirection="column" gap={2}>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.sponsorshipLevel}
                fullWidth
                name="sponsorshipLevel"
                type="text"
                value={values.sponsorshipLevel}
                label="Sponsorship Level"
                onChange={handleChange}
                error={errors.sponsorshipLevel}
              />
              <TextField
                helperText={errors.address_line2}
                fullWidth
                name="sponsorshipFee"
                type="text"
                label="sponsorship Fee"
                value={values.sponsorshipFee}
                onChange={handleChange}
                error={errors.sponsorshipFee}
              />
            </Box>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <TextField
                helperText={errors.sponsorshipAmount}
                sx={{ width: '100%' }}
                name="sponsorshipAmount"
                type="number"
                value={values.sponsorshipAmount}
                label="Sponsorship Amount"
                onChange={handleChange}
                error={errors.sponsorshipAmount}
              />
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
                {errors.paymentStatus && (
                  <p style={{ color: 'red', fontSize: '12px', paddingLeft: '5%' }}>{errors.paymentStatus}</p>
                )}
              </FormControl>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2}>
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

export default EditSponsership;
