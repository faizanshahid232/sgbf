import axios from 'axios';

// export const API_URL = 'http://192.168.1.13:4000/api';
// export const IMAGE_BASEURL = 'http://192.168.1.13:4000';

export const API_URL = 'http://desktop-t8fb5gv:4000/api';
export const IMAGE_BASEURL = 'http://desktop-t8fb5gv:4000';

// export const API_URL = 'https://www.sgbf.sa:4000/api';
// export const IMAGE_BASEURL = 'https://www.sgbf.sa:4000';

export const callAPi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export const callAPiMultiPart = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

callAPiMultiPart.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sgbf_token');
    if (token && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

callAPi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sgbf_token');
    if (token && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const token = localStorage.getItem('sgbf_token');

// eslint-disable-next-line consistent-return
const getHeaders = () => {
  if (token !== undefined) {
    return {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('sgbf_token')}`,
    };
  }
};
export const callPrivateAPi = axios.create({
  baseURL: API_URL,
  headers: getHeaders(),
});
