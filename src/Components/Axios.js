import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://192.168.24.190:3000/', 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;