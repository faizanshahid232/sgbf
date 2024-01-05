/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable func-names */
/* eslint-disable no-return-assign */
/* eslint-disable react/button-has-type */
/* eslint-disable no-multi-str */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import RichTextEditor from '../UI/TextField/RichTextEditor';
import { CreateEvent } from '../../Redux/Slice/events';
import { getAllMemberships } from '../../Redux/Slice/membership';
import { CreateOrganization, editOrganization } from '../../Redux/Slice/organization';
import Goback from '../UI/Goback';

const initialValues = {
  title: '',
  group: '',
  organizationMission: '',
  country_code: '',
  address_line1: '',
  address_line2: '',
  locality: '',
  postal_code: '',
  // organizationMembership: '',
  organizationEmail: '',
  organizationPhone: '',
  // authoredBy: '',
};

const EditOrganization = () => {
  const { state } = useLocation();
  const [values, setValues] = useState({
    title: state.item.title,
    group: state.item.group,
    organizationMission: state.item.organizationMission,
    country_code: state.item.country_code,
    address_line1: state.item.address_line1,
    address_line2: state.item.address_line2,
    locality: state.item.locality,
    postal_code: state.item.postal_code,
    // organizationMembership: state.item.organizationMembership,
    organizationEmail: state.item.organizationEmail,
    organizationPhone: state.item.organizationPhone,
    // authoredBy: state.item.authoredBy,
  });
  const [errors] = useState({});
  const [img, setImg] = useState(null);
  const [logo, setLogo] = useState(null);
  const [body, setBody] = useState(state.item.organizationMission);

  // const membership = useSelector((s) => s.membership?.data?.data);
  // console.log('_____membership', membership);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        editOrganization({
          id: state.item._id,
          data: {
            ...values,
            organizationLogo: logo,
            organizationHeaderImage: img,
          },
        })
      );
      if (res.payload.success) {
        setValues(initialValues);
        navigate('/dashboard/organization');
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

  // const getAllMemberSip = async () => {
  //   try {
  //     const res = await dispatch(getAllMemberships());
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  // useEffect(() => {
  //   getAllMemberSip();
  // }, [dispatch]);

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h6">Edit Organization</Typography>
        <Grid
          sx={{ overflowX: 'hidden', backgroundColor: 'white' }}
          px={4}
          spacing={2}
          container
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid item xs={12}>
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
                  helperText={errors.country_code}
                  fullWidth
                  name="country_code"
                  type="text"
                  label="Country"
                  value={values.country_code}
                  onChange={handleChange}
                  error={errors.country_code}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display={'flex'} flexDirection="column" gap={2}>
              <Box gap={2} display={'flex'} justifyContent="space-between">
                <TextField
                  helperText={errors.address_line1}
                  fullWidth
                  name="address_line1"
                  type="text"
                  value={values.address_line1}
                  label="Address line1"
                  onChange={handleChange}
                  error={errors.address_line1}
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
                <TextField
                  helperText={errors.locality}
                  sx={{ width: '100%' }}
                  name="locality"
                  type="text"
                  value={values.locality}
                  label="City"
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
          <Grid item xs={12}>
            <Box display={'flex'} flexDirection="column" gap={2}>
              <Box gap={2} display={'flex'} justifyContent="space-between">
                <TextField
                  helperText={errors.organizationEmail}
                  fullWidth
                  name="organizationEmail"
                  type="text"
                  value={values.organizationEmail}
                  label="Organization Email"
                  onChange={handleChange}
                  error={errors.organizationEmail}
                />
                <TextField
                  helperText={errors.organizationPhone}
                  fullWidth
                  name="organizationPhone"
                  type="text"
                  label="Organization Phone"
                  value={values.organizationPhone}
                  onChange={handleChange}
                  error={errors.organizationPhone}
                />
              </Box>
              {/* <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Organization Membership</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  name="organizationMembership"
                  value={values.organizationMembership}
                  onChange={handleChange}
                  error={errors.organizationMembership}
                  label="Organization Membership"
                >
                  {membership &&
                    membership?.map((item) => (
                      <MenuItem value={item._id} key={item._id}>
                        {item.establishmentName}
                      </MenuItem>
                    ))}
                </Select>
                {errors.courseName && (
                  <p style={{ color: 'red', fontSize: '12px', paddingLeft: '5%' }}>{errors.courseName}</p>
                )}
              </FormControl>
            </Box> */}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2}>
              <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
                <TextField
                  helperText={errors.group}
                  sx={{ width: '100%' }}
                  name="group"
                  type="text"
                  value={values.group}
                  label="Group"
                  onChange={handleChange}
                  error={errors.group}
                />
                <Stack spacing={1}>
                  <Typography>Organization LOGO</Typography>
                  <input accept="image/png, image/gif, image/jpeg" type="file" onChange={handleFileLogoChange} />
                </Stack>
                <Stack spacing={1}>
                  <Typography>Organization Header Image</Typography>
                  <input
                    accept="image/png, image/gif, image/jpeg"
                    type="file"
                    onChange={handleFileFeacherImageChange}
                  />
                </Stack>
              </Box>
              <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
                {/* <TextField
                helperText={errors.organizationMission}
                sx={{ width: '100%' }}
                name="organizationMission"
                type="text"
                value={values.organizationMission}
                label="Organization Mission"
                onChange={handleChange}
                error={errors.organizationMission}
              /> */}
                <Box>
                  <Typography variant="body1" py={1}>
                    Organization Mission
                  </Typography>
                  <RichTextEditor body={body} setBody={setBody} />
                </Box>
              </Box>
              <Box display={'flex'} justifyContent="flex-end">
                <Button type="submit" variant="contained">
                  Edit
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default EditOrganization;
