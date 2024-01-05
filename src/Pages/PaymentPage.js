import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';


const PaymentPage = () => {
    useEffect(() => {
        window.Moyasar.init({
            element: '.mysr-form',
            // Amount in the smallest currency unit.
            // For example:
            // 10 SAR = 10 * 100 Halalas
            // 10 KWD = 10 * 1000 Fils
            // 10 JPY = 10 JPY (Japanese Yen does not have fractions)
            amount: 120000,
            currency: 'SAR',
            description: "Payment for User Registration",
            publishable_api_key: process.env.REACT_APP_PUBLISHABLE_API_KEY,
            callback_url: `${window.location.origin}`,
            methods: ['creditcard'],
            // on_completed: `${API_URL}/payment/createPayement`
            on_completed: (payment) => {
                return savePayment(payment);
            },
        })
    }, [])

    const savePayment = async (payment) => {
        const API_URL = 'https://api.moyasar.com/v1/payments';
        const publicKey = process.env.REACT_APP_PUBLISHABLE_API_KEY;
        const privateKey = process.env.REACT_APP_PRIVATE_KEY;

    try {
      const response = await axios.post(API_URL, payment, {
        auth: {
          username: publicKey,
          password: privateKey,
        },
      });

      console.log('Payment saved successfully:', response.data);

      // Check the URL parameters for status and update payment status accordingly
      const urlParams = new URLSearchParams(window.location.search);
      const status = urlParams.get('status');

      if (status === 'success') {
        // Payment succeeded, update the payment status to "paid"
        // Perform the necessary action based on the payment status
        console.log('Payment status: paid');
      } else if (status === 'failed') {
        // Payment failed, update the payment status to "failed"
        // Perform the necessary action based on the payment status
        console.log('Payment status: failed');
      } else {
        // Payment status is not provided or invalid, handle the error case
        console.log('Invalid payment status:', status);
      }
    } catch (error) {
      console.error('Error saving payment:', error.message);
    }
  };

  return (
    <Grid container justifyContent={'center'} py={2}>
      <Grid item xs={12} sm={12} md={10}>
        <div className="mysr-form" />
      </Grid>
    </Grid>
  );
};

export default PaymentPage;
