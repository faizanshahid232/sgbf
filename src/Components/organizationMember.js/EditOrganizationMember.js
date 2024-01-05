import React, { useState } from 'react';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAllOrganizationMember } from '../../Redux/Slice/organizationMemberSlice';
import OrganizationMemberService from '../../Redux/API/OrganizationMemberService';
import Goback from '../UI/Goback';

const initialValues = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
};

const EditOrganizationMember = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [articalValues, setArticalValues] = useState({
    // password: state.item.password,
    lastName: state.item.lastName,
    firstName: state.item.firstName,
    email: state.item.email,
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validations()) {
        const data = {
          ...articalValues,
          orgId: id,
          memberId: state.item._id,
        };
        await OrganizationMemberService.editUser(data)
          .then((res) => {
            if (res.data.success) {
              // setArticalValues(initialValues);
              toast.success(res.data.message);
              dispatch(getAllOrganizationMember(id));
              navigate(-1);
            }
          })
          .catch((errors) => {
            toast.error(errors.message);
          });
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
    // if ('password' in fieldValue) temp.password = fieldValue.password ? '' : 'This field requires';
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
          Edit Organization Member
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
                disabled
              />
              {/* <TextField
                helperText={errors.password}
                fullWidth
                name="password"
                type="password"
                value={articalValues.password}
                label="Password"
                onChange={handleChange}
                error={errors.password}
              /> */}
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

export default EditOrganizationMember;
