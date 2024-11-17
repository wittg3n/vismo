import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/',
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await api.post('/auth/refresh-token');

                if (res.status === 200) {
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error('Refresh token failed:', refreshError);
                window.location.href = '/sign-in';
            }
        }

        return Promise.reject(error);
    }
);

export default api;
