import React, { useRef, useState } from 'react';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import RichTextEditor from '../UI/TextField/RichTextEditor';

import { editMarketPlace, getAllMarketPlace } from '../../Redux/Slice/marketPlaceSlice';
import { IMAGE_BASEURL } from '../../Redux/API/http-common';
import Goback from '../UI/Goback';

const initialValues = {
  company_profile: '',
  address: '',
  website: '',
  name: '',
  mobile: '',
  note: '',
  brand_Name: '',
  category: '',
  epd_specification: '',
  price: '',
  physical_prop: '',
  email: '',
};

const EditMarketplace = () => {
  const { state } = useLocation();
  const editorRef = useRef(null);
  const [articalValues, setArticalValues] = useState({
    company_profile: state.item.company_profile,
    address: state.item.address,
    website: state.item.website,
    name: state.item.name,
    mobile: state.item.mobile,
    note: state.item.note,
    brand_Name: state.item.brand_Name,
    category: state.item.category,
    epd_specification: state.item.epd_specification,
    price: state.item.price,
    physical_prop: state.item.physical_prop,
    email: state.item.email,
  });
  const [errors, setErrors] = useState({});
  const [img, setImg] = useState(null);
  const [selectedImages, setSelectedImages] = useState(state.item.imgUrls || []);
  console.log(selectedImages);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validations()) {
        const res = await dispatch(
          editMarketPlace({
            id: state.item._id,
            edit: {
              ...articalValues,
              picture: selectedImages,
            },
          })
        );
        if (res.payload.success) {
          // setArticalValues(initialValues);
          dispatch(getAllMarketPlace());
          navigate('/dashboard/marketplace');
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const validations = (fieldValue = articalValues) => {
    // eslint-disable-next-line prefer-const
    let temp = { ...errors };

    if ('company_profile' in fieldValue) temp.company_profile = fieldValue.company_profile ? '' : 'This field requires';
    if ('address' in fieldValue) temp.address = fieldValue.address ? '' : 'This field requires';
    if ('website' in fieldValue) temp.website = fieldValue.website ? '' : 'This field requires';
    if ('name' in fieldValue) temp.name = fieldValue.name ? '' : 'This field requires';
    if ('mobile' in fieldValue) temp.mobile = fieldValue.mobile ? '' : 'This field requires';
    if ('note' in fieldValue) temp.note = fieldValue.note ? '' : 'This field requires';
    if ('brand_Name' in fieldValue) temp.brand_Name = fieldValue.brand_Name ? '' : 'This field requires';
    if ('category' in fieldValue) temp.category = fieldValue.category ? '' : 'This field requires';
    if ('epd_specification' in fieldValue)
      temp.epd_specification = fieldValue.epd_specification ? '' : 'This field requires';
    if ('price' in fieldValue) temp.price = fieldValue.price ? '' : 'This field requires';
    if ('physical_prop' in fieldValue) temp.physical_prop = fieldValue.physical_prop ? '' : 'This field requires';
    if ('email' in fieldValue) temp.email = fieldValue.email ? '' : 'This field requires';

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

  // const selectFiles = (event) => {
  //   const selectedFiles = event.target.files;
  //   const imagesFile = [];

  //   if (selectedFiles.length > 5) {
  //     toast.error('You can only upload a maximum of 5 images');
  //     return;
  //   }

  //   for (let i = 0; i < selectedFiles.length; i += 1) {
  //     imagesFile.push(URL.createObjectURL(selectedFiles[i]));
  //   }

  //   setImg(selectedFiles);
  // };
  const selectFiles = (event) => {
    const selectedFiles = event.target.files;
    const images = [];

    const fileType = selectedFiles[0].type;
    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      toast.error('Please select a valid image (JPEG, PNG)');
      return;
    }

    if (selectedFiles.length > 5) {
      if (selectedFiles.length + selectedImages.length > 5) {
        toast.error('You can only upload a maximum of 5 images');
        return;
      }

      for (let i = 0; i < selectedFiles.length; i += 1) {
        const file = selectedFiles[i];
        const imageUrl = URL.createObjectURL(file);
        images.push({ file, imageUrl });
      }

      setSelectedImages([...selectedImages, ...images]);
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h6" gutterBottom>
          Edit Marketplace
        </Typography>
      </Stack>
      <Grid spacing={2} container>
        <Grid item xs={12}>
          <Box display={'flex'} flexDirection="column" gap={2} component="form" onSubmit={handleSubmit}>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.title}
                fullWidth
                name="name"
                type="text"
                value={articalValues.name}
                label="Name"
                onChange={handleChange}
                error={errors.name}
              />
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
            </Box>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.brand_Name}
                fullWidth
                name="brand_Name"
                type="text"
                value={articalValues.brand_Name}
                label="Brand Name"
                onChange={handleChange}
                error={errors.brand_Name}
              />
              <TextField
                helperText={errors.category}
                fullWidth
                name="category"
                type="text"
                label="Category"
                value={articalValues.category}
                onChange={handleChange}
                error={errors.category}
              />
            </Box>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.mobile}
                fullWidth
                name="mobile"
                type="number"
                value={articalValues.mobile}
                label="Mobile"
                onChange={handleChangePhone}
                error={errors.mobile}
              />
              <TextField
                helperText={errors.address}
                fullWidth
                name="address"
                type="text"
                label="Address"
                value={articalValues.address}
                onChange={handleChange}
                error={errors.address}
              />
            </Box>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.price}
                fullWidth
                name="price"
                type="text"
                value={articalValues.price}
                label="Price"
                onChange={handleChange}
                error={errors.price}
              />
              <TextField
                helperText={errors.epd_specification}
                fullWidth
                name="epd_specification"
                type="text"
                label="EPD Specification"
                value={articalValues.epd_specification}
                onChange={handleChange}
                error={errors.epd_specification}
              />
            </Box>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.physical_prop}
                fullWidth
                name="physical_prop"
                type="text"
                value={articalValues.physical_prop}
                label="Physical Property"
                onChange={handleChange}
                multiline
                rows={4}
                error={errors.physical_prop}
              />
            </Box>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.note}
                fullWidth
                name="note"
                type="text"
                multiline
                rows={4}
                label="Note"
                value={articalValues.note}
                onChange={handleChange}
                error={errors.note}
              />
            </Box>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.tags}
                fullWidth
                name="company_profile"
                type="text"
                label="Company Profile"
                multiline
                rows={5}
                value={articalValues.company_profile}
                onChange={handleChange}
                error={errors.company_profile}
              />
            </Box>
            <Box gap={2} display={'flex'} alignItems={'center'} justifyContent="space-between">
              <TextField
                helperText={errors.website}
                fullWidth
                name="website"
                type="text"
                value={articalValues.website}
                label="Website"
                onChange={handleChange}
                error={errors.title}
              />
              <input accept=".png, .jpg, .jpeg" type="file" multiple id="select-image" onChange={selectFiles} />
            </Box>

            <Box display="flex" alignItems="center" gap={2} mt={2}>
              {selectedImages.map((image, index) => (
                <div key={index}>
                  {typeof image === 'object' ? (
                    <img src={image.imageUrl} alt="" width={100} height={100} />
                  ) : (
                    <img src={IMAGE_BASEURL + image} alt="" width={100} height={100} />
                  )}
                  <Button
                    sx={{ marginTop: '5px' }}
                    variant="outlined"
                    size="small"
                    onClick={() => handleDeleteImage(index)}
                  >
                    X
                  </Button>
                </div>
              ))}
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

export default EditMarketplace;
