import axios from 'axios';
import { formatDateToKST } from './components/time-util'; // Ensure the correct path to your utility file



const api = axios.create({
    baseURL: 'https://d238-112-221-225-164.ngrok-free.app', 
});

api.interceptors.response.use(response => {
    // Assuming response data might have date fields to process
    if (response.data) {
        response.data = processDates(response.data);
    }
    return response;
}, error => {
    return Promise.reject(error);
});

const processDates = (data) => {
    if (Array.isArray(data)) {
        return data.map(item => {
            if (item.createdAt) {
                item.createdAt = formatDateToKST(item.createdAt);
            }
            return item;
        });
    }
    return data;
};



export default api;
