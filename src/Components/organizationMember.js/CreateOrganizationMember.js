import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { getAllOrganizationMember } from '../../Redux/Slice/organizationMemberSlice';
import OrganizationMemberService from '../../Redux/API/OrganizationMemberService';
import SearchMember from '../../Redux/API/SearchMember';
import Goback from '../UI/Goback';

const initialValues = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
};

const CreateOrganizationMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [articalValues, setArticalValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [disableComp, setdisableComp] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validations()) {
        await OrganizationMemberService.createUser(id, articalValues)
          .then((res) => {
            setArticalValues(initialValues);
            toast.success(res.data.message);
            dispatch(getAllOrganizationMember(id));
            navigate(`/dashboard/members/${id}`);
          })
          .catch((error) => {
            toast.error(error.message);
            throw error;
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const validations = (fieldValue = articalValues) => {
    const temp = { ...errors };
    if ('email' in fieldValue) temp.email = fieldValue.email ? '' : 'This field requires';
    if ('firstName' in fieldValue) temp.firstName = fieldValue.firstName ? '' : 'This field requires';
    if ('lastName' in fieldValue) temp.lastName = fieldValue.lastName ? '' : 'This field requires';
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

    // if (name === 'email') {
    //   if (userData && userData.length > 0) { // Check if userData is not null or empty
    //     const filteredResults = userData.filter((user) =>
    //       user.email.toLowerCase().includes(value.toLowerCase())
    //     );
    //     if (filteredResults.length > 0) {
    //       const selectedUser = filteredResults[0]; // Assume the first user as the selected user
    //       setArticalValues({
    //         ...articalValues,
    //         email: selectedUser.email,
    //         firstName: selectedUser.firstName,
    //         lastName: selectedUser.lastName,
    //         password: '',
    //       });
    //       setErrors({}); // Clear any validation errors
    //     } else {
    //       setArticalValues({
    //         ...articalValues,
    //         firstName: '',
    //         lastName: '',
    //         password: '',
    //       });
    //       setErrors({});
    //     }
    //   }
    // }

    validations({ [name]: value });
  };

  const handleSelectEmail = (result) => {
    setArticalValues({
      ...articalValues,
      email: result.email,
      firstName: result.firstName,
      lastName: result.lastName,
      password: '',
    });
    setdisableComp(true);
    setUserData([]);
    setSearchResults([]);
    setErrors({}); // Clear any validation errors
  };

  const handleKeyDown = (event, result) => {
    if (event.key === 'Enter') {
      handleSelectEmail(result);
    }
  };

  const searchUser = async (email) => {
    const data = {
      email,
    };
    if (!email) {
      setUserData([]);
    } else {
      await SearchMember.getAll(data)
        .then((res) => {
          setUserData(res.data.data);
          setSearchResults(res.data.data);
        })
        .catch((error) => {
          toast.error(error.message);
          throw error;
        });
    }
  };

  return (
    <>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h6" gutterBottom>
          Create Organization Member
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
                disabled={disableComp !== false}
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
                disabled={disableComp !== false}
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  handleChange(e);
                  searchUser(e.target.value);
                }}
                error={errors.email}
                autoComplete="off"
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
                disabled={disableComp !== false}
              />
            </Box>
            {searchResults.length > 0 && (
              <Box className="search-results">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => handleSelectEmail(result)}
                    onKeyDown={(e) => handleKeyDown(e, result)}
                    role="button"
                    tabIndex={0}
                    className="search-result-item"
                  >
                    {result.email}
                  </div>
                ))}
              </Box>
            )}
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

export default CreateOrganizationMember;
