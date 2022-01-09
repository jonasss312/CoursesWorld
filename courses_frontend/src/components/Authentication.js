import { userAuthenticated } from './AuthenticationSlice'
import * as axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const SignUp = async (dispatch, credentials) => {
    try {
        // api call
        const { data } = await axiosInstance.post('/register', credentials);
        dispatch(userAuthenticated(data));
    } catch {
        console.log('Error!');
    }
}

export const SignIn = async (dispatch, credentials) => {
    try {
        // api call
        const { data } = await axiosInstance.post('/login', credentials);
        dispatch(userAuthenticated(data));
    } catch {
        console.log('Error!');
    }
}
