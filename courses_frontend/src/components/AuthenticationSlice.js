import { createSlice } from '@reduxjs/toolkit'
import jwt_decode from "jwt-decode"

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        token: '',
        decoded: '',
        isLoggedIn: false,
    },
    reducers: {
        userAuthenticated: (state, action) => {
            sessionStorage.setItem('accessToken', action.payload.accessToken);
            sessionStorage.setItem('roles', JSON.stringify(jwt_decode(action.payload.accessToken)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']));
            sessionStorage.setItem('userId', JSON.stringify(jwt_decode(action.payload.accessToken)['userId']));
            return {
                ...state, ...{
                    token: action.payload.accessToken,
                    decoded: '',
                    isLoggedIn: true,
                }
            }
        },
        logout: () => {
            sessionStorage.clear();
        }
    }
});

export const { userAuthenticated, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
/*
            var decodedToken = "lol"
            if (this.token !== undefined && this.token !== null) {
                decodedToken = jwt_decode(this.token);
            }
            console.log(decodedToken)
            //sessionStorage.setItem('decodedToken', decodedToken);*/