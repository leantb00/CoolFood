
import {api} from './api';
import { Location } from '../types/utils';
const getEstablishments = (location?: Location) => {
    let query = ''
    if(location != null) query='?lat='+location?.lat+'&long='+location?.long

    return api.get('establishment/'+query)
}
export default {
    getEstablishments
};