    // here we right an interceptor to add the token to the header of the request

    import axios from "axios";
    import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

    //allows us to import anything in the env file
    const api= axios.create({
        baseURL: import.meta.env.VITE_API_URL
    }
    )   


    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
            (error)=>{
                return Promise.reject(error)
            }
        }
    )


    export default api


    //now we will be using api object to get the axios code