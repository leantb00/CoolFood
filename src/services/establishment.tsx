
import {api} from './api';

const getEstablishments = () => {
    return api.get('establishment/')
}
export default {
    getEstablishments
};