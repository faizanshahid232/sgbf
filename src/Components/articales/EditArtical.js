/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable func-names */
/* eslint-disable no-return-assign */
/* eslint-disable react/button-has-type */
/* eslint-disable no-multi-str */
/* eslint-disable import/no-unresolved */
import React, { useRef, useState } from 'react';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { CreateArticle, editArtical } from '../../Redux/Slice/articales';

import RichTextEditor from '../UI/TextField/RichTextEditor';

const initialValues = {
  title: '',
  tags: '',
  summary: '',
};

const EditArtical = () => {
  const { state } = useLocation();
  const editorRef = useRef(null);
  const [articalValues, setArticalValues] = useState({
    title: state.item.title,
    tags: state.item.tags,
    summary: state.item.summary,
  });
  const [errors, setErrors] = useState({});
  const [img, setImg] = useState(null);
  const [body, setBody] = useState(state.item.body);
  // const department = useSelector((s)=> s.department?.data)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validations()) {
        console.log('values', articalValues);
        const res = await dispatch(
          editArtical({
            id: state.item._id,
            edit: {
              ...articalValues,
              image: img,
              publishedOn: new Date(),
              // eslint-disable-next-line object-shorthand
              body: body,
            },
          })
        );
        if (res.payload.success) {
          setArticalValues(initialValues);
          setBody(null);
          //   toast.success('Artical Created Successfully');
          navigate('/dashboard/articles');
        }
        console.log('createArtical', res);
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
    if ('tags' in fieldValue) temp.tags = fieldValue.tags ? '' : 'This field requires';
    if ('summary' in fieldValue) temp.summary = fieldValue.summary ? '' : 'This field requires';
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
          Edit Article
        </Typography>
      </Stack>
      <Grid spacing={2} container>
        <Grid item xs={12} md={6}>
          <RichTextEditor body={body} setBody={setBody} />
        </Grid>
        <Grid item xs={12} md={6}>
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
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.tags}
                fullWidth
                name="tags"
                type="text"
                label="Tags"
                value={articalValues.tags}
                onChange={handleChange}
                error={errors.tags}
              />
            </Box>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <TextField
                helperText={errors.summary}
                sx={{ width: '100%' }}
                name="summary"
                type="text"
                value={articalValues.summary}
                label="Summary"
                onChange={handleChange}
                error={errors.summary}
              />
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer sx={{ width: '100%', pt: 0 }} components={['DatePicker']}>
                  <DatePicker label="Basic date picker" />
                </DemoContainer>
              </LocalizationProvider> */}
            </Box>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <input type="file" accept="image/png, image/gif, image/jpeg" onChange={handleFileChange} />
            </Box>

            <Box display={'flex'} justifyContent="flex-end">
              <Button type="submit" variant="contained">
                Update
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default EditArtical;
