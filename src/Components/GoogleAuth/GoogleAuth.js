import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import UserServices from '../../Redux/API/UserServices';

const GoogleAuth = () => {
    const navigate = useNavigate();
    const responseMessage = (response) => {
        // console.log(response);
        const data = {
            token: response.credential
        };
        googleLoginAuth(data);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    const googleLoginAuth = async (data) => {
        await UserServices.googleLogin(data).then((item) => {
            localStorage.setItem('sgbf_token', item.data.token);
            navigate('/');
        }).catch((error) => {
            toast.error(error.message);
        });
    }
    return (
        <Box p={2}>
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </Box>
    )
}

export default GoogleAuth