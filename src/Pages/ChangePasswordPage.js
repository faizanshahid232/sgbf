/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Goback from '../Components/UI/Goback';
import UserServices from '../Redux/API/UserServices';

const initialValues = {
  oldPassword: '',
  newPassword: '',
};
const ChangePasswordPage = () => {
  const [articalValues, setArticalValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validations()) {
        await UserServices.ChangePassword(articalValues)
          .then(() => {
            toast.success('Change Password Successfully!');
            setArticalValues(initialValues);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const validations = (fieldValue = articalValues) => {
    const temp = { ...errors };
    if ('oldPassword' in fieldValue) temp.oldPassword = fieldValue.oldPassword ? '' : 'This field requires';
    if ('newPassword' in fieldValue) temp.newPassword = fieldValue.newPassword ? '' : 'This field requires';

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
    <>
      <Grid spacing={2} container>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box display={'flex'} flexDirection="column" gap={2} component="form" onSubmit={handleSubmit}>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.oldPassword}
                fullWidth
                name="oldPassword"
                type="text"
                value={articalValues.oldPassword}
                label="Old Password"
                onChange={handleChange}
                error={errors.oldPassword}
              />
              <TextField
                helperText={errors.newPassword}
                fullWidth
                name="newPassword"
                type="text"
                label="New Password"
                value={articalValues.newPassword}
                onChange={handleChange}
                error={errors.newPassword}
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

export default ChangePasswordPage;
