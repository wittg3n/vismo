import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:3001/',
    withCredentials: true,
});
let refreshTokenPromise = null;
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            if (!refreshTokenPromise) {
                refreshTokenPromise = api.post('/auth/refresh-token')
                    .then((res) => {
                        const newToken = res.data.token;
                        localStorage.setItem('token', newToken);
                        api.defaults.headers['Authorization'] = `Bearer ${newToken}`;
                        return newToken;
                    })
                    .catch((refreshError) => {
                        console.error('Refresh token failed:', refreshError);
                        window.location.href = '/sign-in';
                        return Promise.reject(refreshError);
                    })
                    .finally(() => {
                        refreshTokenPromise = null;
                    });
            }
            try {
                const newToken = await refreshTokenPromise;
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
