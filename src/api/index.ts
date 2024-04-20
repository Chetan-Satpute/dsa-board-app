import axios from 'axios';

import {API_ENDPOINT} from '../env';

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
});

export default axiosInstance;
