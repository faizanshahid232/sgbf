import React, { useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import RichTextEditor from '../UI/TextField/RichTextEditor';
import { editEducation } from '../../Redux/Slice/educationSlice';

const initialValues = {
  title: '',
  continuingEducation: '',
  program: '',
  level: '',
};

const EditEducation = () => {
  const { state } = useLocation();
  const [articalValues, setArticalValues] = useState({
    title: state?.item?.title || '',
    continuingEducation: state?.item?.continuingEducation || '',
    program: state?.item?.program || '',
    level: state?.item?.level || '',
  });
  const [errors, setErrors] = useState({});
  const [img, setImg] = useState(null);
  const [objective, setobjective] = useState(state?.item?.objective || '');
  const [introduction, setintroduction] = useState(state?.item?.introduction || '');
  const [about, setabout] = useState(state?.item?.about || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validations()) {
        const res = await dispatch(
          editEducation({
            id: state.item._id,
            edit: {
              ...articalValues,
              image: img,
              objective,
              introduction,
              about
            },
          })
        );
        if (res.payload.success) {
          setArticalValues(initialValues);
          navigate('/dashboard/education');
        }
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
    setImg(file);
  };

  const validations = (fieldValue = articalValues) => {
    // eslint-disable-next-line prefer-const
    let temp = { ...errors };
    if ('title' in fieldValue) temp.title = fieldValue.title ? '' : 'This field requires';
    if ('continuingEducation' in fieldValue) temp.continuingEducation = fieldValue.continuingEducation ? '' : 'This field requires';
    if ('program' in fieldValue) temp.program = fieldValue.program ? '' : 'This field requires';
    if ('level' in fieldValue) temp.level = fieldValue.level ? '' : 'This field requires';
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
          Edit Education
        </Typography>
      </Stack>
      <Grid spacing={2} container>
        <Grid item xs={12} md={12}>
          <Box display={'flex'} flexDirection="column" gap={2} component="form" onSubmit={handleSubmit}>
            <Box gap={2} display={'flex'} justifyContent="space-between">
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
            </Box>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Continuing Education</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Continuing Education"
                  helperText={errors.continuingEducation}
                  name="continuingEducation"
                  value={articalValues.continuingEducation}
                  onChange={handleChange}
                  error={errors.continuingEducation}
                >
                  <MenuItem value={"Eligible for GBCI CE Hours"}>Eligible for GBCI CE Hours </MenuItem>
                  <MenuItem value={"Approved for AIA LUs"}>Approved for AIA LUs </MenuItem>
                  <MenuItem value={"LEED AP BD+C"}>LEED AP BD+C</MenuItem>
                  <MenuItem value={"LEED Green Associate"}>LEED Green Associate</MenuItem>
                  <MenuItem value={"LEED AP O+M"}>LEED AP O+M</MenuItem>
                  <MenuItem value={"LEED AP ID+C"}>LEED AP ID+C</MenuItem>
                  <MenuItem value={"WELL AP"}>WELL AP</MenuItem>
                  <MenuItem value={"LEED AP Homes"}>LEED AP Homes</MenuItem>
                  <MenuItem value={"LEED AP ND"}>LEED AP ND</MenuItem>
                  <MenuItem value={"SITES AP"}>SITES AP</MenuItem>
                  <MenuItem value={"LEED AP"}>LEED AP</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Program</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Program"
                  helperText={errors.program}
                  name="program"
                  value={articalValues.program}
                  onChange={handleChange}
                  error={errors.program}
                >
                  <MenuItem value={"ARC"}>ARC</MenuItem>
                  <MenuItem value={"City Climate Planner"}>City Climate Planner</MenuItem>
                  <MenuItem value={"EDGE"}>EDGE</MenuItem>
                  <MenuItem value={"GRESB"}>GRESB</MenuItem>
                  <MenuItem value={"Investor Confidence Project"}>Investor Confidence Project</MenuItem>
                  <MenuItem value={"SITES"}>SITES</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Level</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Level"
                  helperText={errors.level}
                  name="level"
                  value={articalValues.level}
                  onChange={handleChange}
                  error={errors.level}
                >
                  <MenuItem value={"Basic"}>Basic</MenuItem>
                  <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
                  <MenuItem value={"Advanced"}>Advanced</MenuItem>
                  <MenuItem value={"Expert"}>Expert</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='subtitle2' py={2}>Introduction</Typography>
          <RichTextEditor body={introduction} setBody={setintroduction} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='subtitle2' py={2}>About</Typography>
          <RichTextEditor body={about} setBody={setabout} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='subtitle2' py={2}>Objectives (What will you achieve?)</Typography>
          <RichTextEditor body={objective} setBody={setobjective} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Box display={'flex'} flexDirection="column" gap={2} component="form" onSubmit={handleSubmit}>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <input type="file" accept="image/png, image/gif, image/jpeg" onChange={handleFileChange} />
            </Box>
            <Box display={'flex'} justifyContent="flex-end">
              <Button type="submit" variant="contained">
                Edit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default EditEducation;
