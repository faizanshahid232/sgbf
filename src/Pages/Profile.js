/* eslint-disable import/no-unresolved */
import { Grid, Button, Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Goback from '../Components/UI/Goback';
import { getUserData } from '../Redux/Slice/user';
import UserServices from '../Redux/API/UserServices';

const initialValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  companyName: '',
  name: '',
  jobTitle: '',
  country_code: '',
  personalBiography: '',
  dataErasureConfirmation: '',
  gender: '',
};

const Profile = () => {
  const user = useSelector((s) => s?.user?.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [articalValues, setArticalValues] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    phoneNumber: user?.phoneNumber,
    companyName: user?.companyName,
    name: user?.name,
    jobTitle: user?.jobTitle,
    country_code: user?.country_code,
    personalBiography: user?.personalBiography,
    dataErasureConfirmation: user?.dataErasureConfirmation,
  });
  const [profilePic, setprofilePic] = useState(null);
  useEffect(() => {
    setArticalValues({
      firstName: user?.firstName,
      lastName: user?.lastName,
      phoneNumber: user?.phoneNumber,
      companyName: user?.companyName,
      name: user?.name,
      jobTitle: user?.jobTitle,
      country_code: user?.country_code,
      personalBiography: user?.personalBiography,
      dataErasureConfirmation: user?.dataErasureConfirmation,
    });
  }, [user]);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validations()) {
        await UserServices.editProfile({ ...articalValues, profilePic })
          .then(() => {
            toast.success('Profile Updated Successfully');
            // setArticalValues(initialValues);
            getUserDatas();
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleFileChange = (e) => {
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
    setprofilePic(file);
  };
  const validations = (fieldValue = articalValues) => {
    // eslint-disable-next-line prefer-const
    let temp = { ...errors };
    if ('firstName' in fieldValue) temp.firstName = fieldValue.firstName ? '' : 'This field requires';
    if ('lastName' in fieldValue) temp.lastName = fieldValue.lastName ? '' : 'This field requires';
    if ('phoneNumber' in fieldValue) temp.phoneNumber = fieldValue.phoneNumber ? '' : 'This field requires';
    if ('name' in fieldValue) temp.name = fieldValue.name ? '' : 'This field requires';
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

  const handleChangePhone = (e) => {
    const { name, value } = e.target;

    // Truncate the value if it exceeds 15 characters
    const truncatedValue = value.slice(0, 15);

    setArticalValues({
      ...articalValues,
      [name]: truncatedValue,
    });

    validations({ [name]: truncatedValue });
  };
  const getUserDatas = async () => {
    try {
      const res = await dispatch(getUserData());
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserDatas();
  }, [dispatch]);

  return (
    <Grid display="flex" alignItems="center" container spacing={2}>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Profile
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <Box display={'flex'} flexDirection="column" gap={2} component="form" onSubmit={handleSubmit}>
          <Box gap={2} display={'flex'} justifyContent="space-between">
            <TextField
              helperText={errors.firstName}
              fullWidth
              name="firstName"
              type="text"
              value={articalValues.firstName}
              label="First Name"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={errors.firstName}
            />
            <TextField
              helperText={errors.lastName}
              fullWidth
              name="lastName"
              type="text"
              label="Last Name"
              value={articalValues.lastName}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              error={errors.lastName}
            />
          </Box>
          <Box gap={2} display={'flex'} justifyContent="space-between">
            <TextField
              helperText={errors.name}
              fullWidth
              name="name"
              type="text"
              value={articalValues.name}
              InputLabelProps={{ shrink: true }}
              label="Username"
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              fullWidth
              name="name"
              type="text"
              value={user.email}
              InputLabelProps={{ shrink: true }}
              label="Email"
              disabled
            />
          </Box>
          <Box gap={2} display={'flex'} justifyContent="space-between">
            <TextField
              helperText={errors.phoneNumber}
              fullWidth
              name="phoneNumber"
              type="number"
              value={articalValues.phoneNumber}
              InputLabelProps={{ shrink: true }}
              label="Phone Number"
              onChange={handleChangePhone}
              error={errors.phoneNumber}
            />
            <TextField
              helperText={errors.companyName}
              fullWidth
              name="companyName"
              type="text"
              label="Company Name"
              InputLabelProps={{ shrink: true }}
              value={articalValues.companyName}
              onChange={handleChange}
              error={errors.companyName}
            />
          </Box>
          <Box gap={2} display={'flex'} justifyContent="space-between">
            <TextField
              helperText={errors.country_code}
              fullWidth
              name="country_code"
              type="text"
              value={articalValues.country_code}
              InputLabelProps={{ shrink: true }}
              label="Country Code"
              onChange={handleChange}
              error={errors.country_code}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="gender"
                value={articalValues.gender}
                label="Select Gender"
                onChange={handleChange}
              >
                <MenuItem value={10}>Male</MenuItem>
                <MenuItem value={20}>Female</MenuItem>
                <MenuItem value={30}>Transgender</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TextField
            helperText={errors.personalBiography}
            fullWidth
            name="personalBiography"
            multiline
            rows={4}
            InputLabelProps={{ shrink: true }}
            type="text"
            label="Personal Biography"
            value={articalValues.personalBiography}
            onChange={handleChange}
            error={errors.personalBiography}
          />
          <Box gap={2} display={'flex'} justifyContent="space-between">
            <TextField
              helperText={errors.jobTitle}
              fullWidth
              name="jobTitle"
              type="text"
              label="Job Title"
              value={articalValues.jobTitle}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              error={errors.jobTitle}
            />
            <TextField
              helperText={errors.dataErasureConfirmation}
              fullWidth
              name="dataErasureConfirmation"
              InputLabelProps={{ shrink: true }}
              type="text"
              value={articalValues.dataErasureConfirmation}
              label="Data Erasure Confirmation"
              onChange={handleChange}
              error={errors.dataErasureConfirmation}
            />
          </Box>
          <Box gap={2} display={'flex'} justifyContent="space-between">
            <input type="file" accept="image/png, image/gif, image/jpeg" name="file" onChange={handleFileChange} />
          </Box>

          <Box display={'flex'} justifyContent="flex-end">
            <Button type="submit" variant="contained">
              Edit
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Profile;
