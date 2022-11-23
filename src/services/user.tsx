import {api} from './api';

export const me = () => {
    
    return api.get<any>('users/me_data/');
}

const listFavs = () => {
    return api.get('users/lists_favs/')
}

const favorite = (id : number) => {
    return api.get('users/favorite_establishment/?id_establishment='+id)
}

const registerPush = (token : string) => {
    return api.post('users/register_push_token/',{token})
}

export default {
    me,
    listFavs,
    favorite,
    registerPush
}
