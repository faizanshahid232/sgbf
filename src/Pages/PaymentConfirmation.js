/* eslint-disable import/no-unresolved */
import { Box, Container, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PaymentService from '../Redux/API/PaymentService';

const PaymentConfirmation = () => {
  const { state } = useLocation();
  const [isConfirmation, setIsConfirmation] = useState(false);
  const [message, setMessage] = useState('');
  const paymentData = async (id) => {
    try {
      await PaymentService.sharePaymentId(id)
        .then((data) => {
          if (data.data.success) {
            setIsConfirmation(true);

            setMessage(data.data.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (state.paymentId) {
      paymentData(state.paymentId);
    }
  }, []);
  return (
    <>
      {isConfirmation && (
        <Box py={10}>
          <Container maxWidth="xl">
            <Paper
              style={{
                backgroundColor: '#4CAF50',
                color: '#ffffff',
                padding: '16px',
              }}
            >
              <Typography variant="h6" style={{ marginBottom: '8px' }}>
                Thank You!
              </Typography>
              <Typography color={'black'} variant="body1">
                We appreciate your support. Your payment has been confirmed.
              </Typography>
              <Typography py={1} color={'white'} variant="body1">
                {message}
              </Typography>
            </Paper>
          </Container>
        </Box>
      )}
    </>
  );
};

export default PaymentConfirmation;
