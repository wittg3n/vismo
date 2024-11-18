import api from './cookieHelper';

export const uploadAvatar = async (avatar) => {
    const formData = new FormData();
    formData.append('avatar', avatar);

    try {
        const response = await api.post('http://localhost:3001/user/upload-avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });

        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.message };
    }
};
