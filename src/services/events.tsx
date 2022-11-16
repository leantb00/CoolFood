import {api} from './api';
// import { Location } from '../types/utils';

export const getTicket = (event_id: number) => {
    let query='?event_id='+event_id
    // if(event_id != null) query='?event_id='
    return api.get('events/generate_ticket/'+query)
}