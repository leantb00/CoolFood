import {api} from './api';

type LoginData = {
    username:string;
    password:string;
}

const Login = (data : LoginData) => {
    
    return api.post<any>('users/login/', data, {public:true})
}

const register = (data: any) => {
    return api.post('users/register_user/', data, {public:true})
}

export default {
    Login,
    register
};