import React, { useRef, useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CreateInvoice } from '../../Redux/Slice/invoice';
import Goback from '../UI/Goback';

const initialValues = {
  title: '',
  relatedUser: '',
  fullName: '',
  paymentMode: '',
  emailAddress: '',
  invoiceDescription: '',
  cardString: '',
  relatedNode: '',
  invoiceID: '',
  stripeToken: '',
  invoiceAmount: '',
  stripeResponse: '',
  checkNumber: '',
  invoiceDate: '',
  invoiceStatus: '',
  paymentDate: '',
};

const AddInvoice = () => {
  const [articalValues, setArticalValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validations()) {
        console.log('values', articalValues);
        const res = await dispatch(
          CreateInvoice({
            ...articalValues,
          })
        );
        if (res.payload.success) {
          setArticalValues(initialValues);
          toast.success('Invoice Created Successfully');
        }
        console.log('createArtical', res);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const validations = (fieldValue = articalValues) => {
    const temp = { ...errors };
    if ('title' in fieldValue) temp.title = fieldValue.title ? '' : 'This field requires';
    if ('relatedUser' in fieldValue) temp.relatedUser = fieldValue.relatedUser ? '' : 'This field requires';
    if ('fullName' in fieldValue) temp.fullName = fieldValue.fullName ? '' : 'This field requires';
    if ('paymentMode' in fieldValue) temp.paymentMode = fieldValue.paymentMode ? '' : 'This field requires';
    if ('emailAddress' in fieldValue) temp.emailAddress = fieldValue.emailAddress ? '' : 'This field requires';
    if ('invoiceDescription' in fieldValue)
      temp.invoiceDescription = fieldValue.invoiceDescription ? '' : 'This field requires';
    if ('cardString' in fieldValue) temp.cardString = fieldValue.cardString ? '' : 'This field requires';
    if ('relatedNode' in fieldValue) temp.relatedNode = fieldValue.relatedNode ? '' : 'This field requires';
    if ('invoiceID' in fieldValue) temp.invoiceID = fieldValue.invoiceID ? '' : 'This field requires';
    if ('stripeToken' in fieldValue) temp.stripeToken = fieldValue.stripeToken ? '' : 'This field requires';
    if ('invoiceAmount' in fieldValue) temp.invoiceAmount = fieldValue.invoiceAmount ? '' : 'This field requires';
    if ('stripeResponse' in fieldValue) temp.stripeResponse = fieldValue.stripeResponse ? '' : 'This field requires';
    if ('checkNumber' in fieldValue) temp.checkNumber = fieldValue.checkNumber ? '' : 'This field requires';
    if ('invoiceDate' in fieldValue) temp.invoiceDate = fieldValue.invoiceDate ? '' : 'This field requires';
    if ('invoiceStatus' in fieldValue) temp.invoiceStatus = fieldValue.invoiceStatus ? '' : 'This field requires';
    if ('paymentDate' in fieldValue) temp.paymentDate = fieldValue.paymentDate ? '' : 'This field requires';

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
              <TextField
                helperText={errors.relatedUser}
                fullWidth
                name="relatedUser"
                type="text"
                label="Related User"
                value={articalValues.relatedUser}
                onChange={handleChange}
                error={errors.relatedUser}
              />
            </Box>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.fullName}
                fullWidth
                name="fullName"
                type="text"
                value={articalValues.fullName}
                label="Full Name"
                onChange={handleChange}
                error={errors.fullName}
              />
              <TextField
                helperText={errors.paymentMode}
                fullWidth
                name="paymentMode"
                type="text"
                label="Payment Mode"
                value={articalValues.paymentMode}
                onChange={handleChange}
                error={errors.paymentMode}
              />
            </Box>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.emailAddress}
                fullWidth
                name="emailAddress"
                type="text"
                value={articalValues.emailAddress}
                label="Email Address"
                onChange={handleChange}
                error={errors.emailAddress}
              />
              <TextField
                helperText={errors.invoiceDescription}
                fullWidth
                name="invoiceDescription"
                type="text"
                label="Invoice Description"
                value={articalValues.invoiceDescription}
                onChange={handleChange}
                error={errors.invoiceDescription}
              />
            </Box>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.cardString}
                fullWidth
                name="cardString"
                type="text"
                value={articalValues.cardString}
                label="Card String"
                onChange={handleChange}
                error={errors.cardString}
              />
              <TextField
                helperText={errors.relatedNode}
                fullWidth
                name="relatedNode"
                type="text"
                label="Related Node"
                value={articalValues.relatedNode}
                onChange={handleChange}
                error={errors.relatedNode}
              />
            </Box>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.invoiceID}
                fullWidth
                name="invoiceID"
                type="text"
                value={articalValues.invoiceID}
                label="Invoice ID"
                onChange={handleChange}
                error={errors.invoiceID}
              />
              <TextField
                helperText={errors.stripeToken}
                fullWidth
                name="stripeToken"
                type="text"
                label="Stripe Token"
                value={articalValues.stripeToken}
                onChange={handleChange}
                error={errors.stripeToken}
              />
            </Box>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.invoiceAmount}
                fullWidth
                name="invoiceAmount"
                type="text"
                value={articalValues.invoiceAmount}
                label="Invoice Amount"
                onChange={handleChange}
                error={errors.invoiceAmount}
              />
              <TextField
                helperText={errors.stripeResponse}
                fullWidth
                name="stripeResponse"
                type="text"
                label="Stripe Response"
                value={articalValues.stripeResponse}
                onChange={handleChange}
                error={errors.stripeResponse}
              />
            </Box>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.checkNumber}
                fullWidth
                name="checkNumber"
                type="text"
                value={articalValues.checkNumber}
                label="Check Number"
                onChange={handleChange}
                error={errors.checkNumber}
              />
              <TextField
                helperText={errors.invoiceDate}
                fullWidth
                name="invoiceDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                label="Invoice Date"
                value={articalValues.invoiceDate}
                onChange={handleChange}
                error={errors.invoiceDate}
              />
            </Box>
            <Box gap={2} display={'flex'} justifyContent="space-between">
              <TextField
                helperText={errors.invoiceStatus}
                fullWidth
                name="invoiceStatus"
                type="text"
                value={articalValues.invoiceStatus}
                label="Invoice Status"
                onChange={handleChange}
                error={errors.invoiceStatus}
              />
              <TextField
                helperText={errors.paymentDate}
                fullWidth
                name="paymentDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                label="Payment Date"
                value={articalValues.paymentDate}
                onChange={handleChange}
                error={errors.paymentDate}
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

export default AddInvoice;
