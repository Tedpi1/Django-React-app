// intercept reequest and add required headers automatically

import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

//imports anything specified in an environment file
const api=axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(
    
    (config)=>{
        config.headers.Authorization=`Bearer ${ACCESS_TOKEN}`
        if(token){
            config.headers.Authorization=`Bearer ${token}`  //adding authorizaiton header
        }
        return config;
        (error)=>{
            return Promise.reject(error);
        }
    }
)

export default api;