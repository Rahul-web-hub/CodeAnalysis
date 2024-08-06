import axios from 'axios';

const API_URL="http://127.0.0.1:8000/"

export const register =(username,email,password)=>{
    return axios.post(API_URL +'register/',{username,email,password});
};
export const login=(username,password)=>{
    return axios.post(API_URL+'login/',{username,password});
}
export const logout=()=>{
    return axios.post(API_URL +'logout/',{},{
        headers:{Authorization:`Token ${localStorage.getItem('token')}`}
    });
};

export const getCurrentUser=()=>{
    return axios.get(API_URL+'user/',{
        headers:{Authorization:`Token ${localStorage.getItem('token')}`}
    });
};
