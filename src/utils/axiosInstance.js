import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
});

// Add token to every request if available
axiosInstance.interceptors.request.use(
    (config) => {
        const AdminjobInfo = sessionStorage.getItem("AdminjobInfo"); // Or get from token/context
        const parsedUserInfo = JSON.parse(AdminjobInfo);
        const token = parsedUserInfo.data.token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
