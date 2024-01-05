/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable func-names */
/* eslint-disable no-return-assign */
/* eslint-disable react/button-has-type */
/* eslint-disable no-multi-str */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RegisterUser } from '../../Redux/Slice/user';
import { getAllUsers } from '../../Redux/Slice/users';
import Goback from '../UI/Goback';

const initialValues = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
};

const CreatePeople = () => {
  const [articalValues, setArticalValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validations()) {
        const res = await dispatch(RegisterUser(articalValues));
        if (res.payload.success) {
          setArticalValues(initialValues);
          toast.success('People Created Successfully');
          dispatch(getAllUsers());
          navigate('/dashboard/people');
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const validations = (fieldValue = articalValues) => {
    // eslint-disable-next-line prefer-const
    let temp = { ...errors };
    if ('email' in fieldValue) temp.email = fieldValue.email ? '' : 'This field requires';
    if ('firstName' in fieldValue) temp.firstName = fieldValue.firstName ? '' : 'This field requires';
    if ('lastName' in fieldValue) temp.lastName = fieldValue.lastName ? '' : 'This field requires';
    if ('password' in fieldValue) temp.password = fieldValue.password ? '' : 'This field requires';
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === '');
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticalValues({
      ...articalValues,
      [name]: value,
    });
    validations({ [name]: value });
  };

  return (
    <>\

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h6" gutterBottom>
          Create People
        </Typography>
      </Stack>
      <Grid spacing={2} container>
        <Grid item xs={12}>
          <Box display={'flex'} flexDirection="column" gap={2} component="form" onSubmit={handleSubmit}>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.firstName}
                fullWidth
                name="firstName"
                type="text"
                label="First Name"
                value={articalValues.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              <TextField
                helperText={errors.lastName}
                fullWidth
                name="lastName"
                type="text"
                value={articalValues.lastName}
                label="Last Name"
                onChange={handleChange}
                error={errors.title}
              />
            </Box>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.email}
                fullWidth
                name="email"
                type="text"
                label="Email"
                value={articalValues.email}
                onChange={handleChange}
                error={errors.email}
              />
              <TextField
                helperText={errors.password}
                fullWidth
                name="password"
                type="password"
                value={articalValues.password}
                label="Password"
                onChange={handleChange}
                error={errors.password}
              />
            </Box>
            <Box display={'flex'} justifyContent="flex-end">
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CreatePeople;
