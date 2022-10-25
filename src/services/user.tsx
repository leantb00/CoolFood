import {api} from './api';

export const me = () => {
    
    return api.get<any>('users/me_data/');
}

export default {
    me,
}
