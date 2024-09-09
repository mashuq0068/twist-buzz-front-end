const axios = require('axios');



export const axiosPublic = axios.create({
  baseURL: 'https://twist-buzz-backend.vercel.app' 
});

export const axiosSecure = axios.create({
  baseURL: 'https://twist-buzz-backend.vercel.app' 
});


