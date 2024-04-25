import http from "../helper/http-client";

const login = (data) => {
    return http.post('/auth/login', data, {
        transformResponse: [(result) => {
            const parsed = JSON.parse(result);
            localStorage.setItem('authUser', JSON.stringify(parsed));
            return parsed;
        }]
    });
}

const register = (data) => {
    return http.post('/auth/register', data);
}

const profile = () => {
    return http.get('/user');
}

const avatarUpload = (file) => {
    console.log('Avatar-test-->>', file)
    return http.post('/avatar/upload', file);
}

const logout = () => {
    localStorage.removeItem('authUser');
    window.location.reload();
}

const getAuthUser = () => {
    return JSON.parse(localStorage.getItem('authUser'));
}  

const methods = { 
    login,
    register,
    profile,
    logout,
    getAuthUser,
    avatarUpload
}

export default methods;