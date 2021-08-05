import axios from 'axios'

const ax = axios.create({
    baseURL: 'https://point-hotel-management-back.herokuapp.com/api/',
    headers: {
        Accept: "application/json"
    },

})

ax.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.common['Authorization']= `Bearer ${token}`
    }
    return config;
},  function (error) {
    return Promise.reject(error);
})

export default ax;