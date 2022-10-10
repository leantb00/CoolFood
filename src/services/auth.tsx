import {api} from './api';

type LoginData = {
    username:string;
    password:string;
}

const Login = (data : LoginData) => {
    return api.post('users/login/', data)
}

const register = (data: any) => {
    return api.post('users/register_user/', data)
}

export default {
    Login,
    register
};