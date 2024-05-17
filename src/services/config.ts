import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://national-coc-api.lmis.gov.et',
    headers: {
        'authorization-key': 'a593e16f43bc2fa6132af7d823113f729ba32d8416120808a967',
    },
});
