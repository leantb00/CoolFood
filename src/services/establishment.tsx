
import {api} from './api';
import { Location } from '../types/utils';
const getEstablishments = (location?: Location) => {
    let query = ''
    if(location != null) query='?lat='+location?.lat+'&long='+location?.long

    return api.get('establishment/'+query)
}

const getEstablishment_by_id = (id:number) => {
    return api.get('establishment/'+id+'/')
}

const addComment = (text:string, liked:boolean, establishment:number) => {
    return api.post('establishment/add_comment/', {text,establishment, linked:liked})
}






export default {
    getEstablishments,
    addComment,
    getEstablishment_by_id
};
