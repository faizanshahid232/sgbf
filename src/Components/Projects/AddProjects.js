import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CreateProjects } from '../../Redux/Slice/projects';
import Goback from '../UI/Goback';

const initialValues = {
  title: '',
  country_code: '',
  locality: '',
  postal_code: '',
  certificationLevel: '',
  ratingSystem: '',
  projectAreaSquareMeters: '',
  dateCertified: '',
  registerationDate: '',
  GrossSqFoot: '',
  IsCertified: '',
  // username: '',
  // organizationname: '',
  state: '',
  city: '',
  address_line1: '',
  latitude: '',
  longitude: '',
};

const AddProjects = () => {
  const [articalValues, setArticalValues] = useState(initialValues);
  const [featureImage, setfeatureImage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleClicked');
    try {
      console.log('handleClicked 222222');
      if (validations()) {
        const res = await dispatch(
          CreateProjects({
            ...articalValues,
            featureImage,
          })
        );
        if (res.payload.success) {
          setArticalValues(initialValues);
          setfeatureImage('');
          toast.success('Project Created Successfully');
          navigate('/dashboard/projects');
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  console.log('ERRORS', errors);
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
    setfeatureImage(file);
  };
  const validations = (fieldValue = articalValues) => {
    const temp = { ...errors };
    if ('title' in fieldValue) temp.title = fieldValue.title ? '' : 'This field requires';
    if ('country_code' in fieldValue) temp.country_code = fieldValue.country_code ? '' : 'This field requires';
    if ('postal_code' in fieldValue) temp.postal_code = fieldValue.postal_code ? '' : 'This field requires';
    if ('certificationLevel' in fieldValue)
      temp.certificationLevel = fieldValue.certificationLevel ? '' : 'This field requires';
    if ('ratingSystem' in fieldValue) temp.ratingSystem = fieldValue.ratingSystem ? '' : 'This field requires';
    if ('projectAreaSquareMeters' in fieldValue)
      temp.projectAreaSquareMeters = fieldValue.projectAreaSquareMeters ? '' : 'This field requires';
    if ('dateCertified' in fieldValue) temp.dateCertified = fieldValue.dateCertified ? '' : 'This field requires';

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
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h6" gutterBottom>
          Create Project
        </Typography>
      </Stack>
      <Grid spacing={2} container>
        <Grid item xs={12} md={12}>
          <Box display={'flex'} flexDirection="column" gap={2} component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Typography variant="semibold">Project Information</Typography>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <TextField
                    helperText={errors.title}
                    fullWidth
                    name="title"
                    type="text"
                    value={articalValues.title}
                    label="Title"
                    onChange={handleChange}
                    error={errors.title}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Rating System</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={articalValues.ratingSystem}
                      label="Rating System"
                      name="ratingSystem"
                      onChange={handleChange}
                      error={errors.ratingSystem}
                      helperText={errors.ratingSystem}
                    >
                      <MenuItem value="LEED-HOMES v2008">LEED-HOMES v2008</MenuItem>
                      <MenuItem value="LEED-NC 2.2">LEED-NC 2.2</MenuItem>
                      <MenuItem value="LEED-NC v2009">LEED-NC v2009</MenuItem>
                      <MenuItem value="LEED-CS 2.0">LEED-CS 2.0</MenuItem>
                      <MenuItem value="LEED-CI v2009">LEED-CI v2009</MenuItem>
                      <MenuItem value="LEED for Schools">LEED for Schools</MenuItem>
                      <MenuItem value="LEED-CS v2009">LEED-CS v2009</MenuItem>
                      <MenuItem value="LEED-EB:OM v2009">LEED-EB:OM v2009</MenuItem>
                      <MenuItem value="LEED-ND v2009 Stage 2">LEED-ND v2009 Stage 2</MenuItem>
                      <MenuItem value="rating_system">rating_system</MenuItem>
                      <MenuItem value="nc">New Construction</MenuItem>
                      <MenuItem value="eb">Existing Buildings</MenuItem>
                      <MenuItem value="ci">Commercial Interiors</MenuItem>
                      <MenuItem value="cs">Core &amp; Shell</MenuItem>
                      <MenuItem value="schools">Schools</MenuItem>
                      <MenuItem value="retail">Retail</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Stack>
            <Stack spacing={2}>
              <Typography variant="semibold">Address</Typography>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <TextField
                    helperText={errors.country_code}
                    fullWidth
                    name="country_code"
                    type="text"
                    label="Country"
                    value={articalValues.country_code}
                    onChange={handleChange}
                    error={errors.country_code}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="state"
                    type="text"
                    label="State"
                    value={articalValues.state}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="city"
                    type="text"
                    value={articalValues.city}
                    label="City"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    helperText={errors.postal_code}
                    fullWidth
                    name="postal_code"
                    type="text"
                    label="Postal Code"
                    value={articalValues.postal_code}
                    onChange={handleChange}
                    error={errors.postal_code}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="address_line1"
                    type="text"
                    value={articalValues.address_line1}
                    label="Street Address"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="semibold">Details</Typography>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <FormLabel id="demo-controlled-radio-buttons-group">Certification Level</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="certificationLevel"
                      value={articalValues.certificationLevel}
                      onChange={handleChange}
                      helperText={errors.certificationLevel}
                      error={errors.certificationLevel}
                    >
                      <FormControlLabel value="N/A" control={<Radio />} label="N/A" />
                      <FormControlLabel value="Certified" control={<Radio />} label="Certified" />
                      <FormControlLabel value="Silver" control={<Radio />} label="Silver" />
                      <FormControlLabel value="Gold" control={<Radio />} label="Gold" />
                      <FormControlLabel value="Platinum" control={<Radio />} label="Platinum" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Is Certified</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="IsCertified"
                      onChange={handleChange}
                      value={articalValues.IsCertified}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    helperText={errors.dateCertified}
                    fullWidth
                    name="dateCertified"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    label="Date Certified"
                    value={articalValues.dateCertified}
                    onChange={handleChange}
                    error={errors.dateCertified}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="registerationDate"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    label="Registeration Date"
                    value={articalValues.registerationDate}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="GrossSqFoot"
                    type="text"
                    value={articalValues.GrossSqFoot}
                    label="Gross Sq Foot(square foot)"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    helperText={errors.projectAreaSquareMeters}
                    fullWidth
                    name="projectAreaSquareMeters"
                    type="text"
                    value={articalValues.projectAreaSquareMeters}
                    label="Project Area (square meters)"
                    onChange={handleChange}
                    error={errors.projectAreaSquareMeters}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="latitude"
                    type="text"
                    value={articalValues.latitude}
                    label="Latitude"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="longitude"
                    type="text"
                    label="longitude"
                    value={articalValues.longitude}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Stack>

            <Box gap={2} display={'flex'} justifyContent="space-between">
              <input type="file" accept="image/png, image/gif, image/jpeg" onChange={handleFileChange} />
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

export default AddProjects;
