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

export default {
    me,
    listFavs,
    favorite
}
