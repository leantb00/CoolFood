import Axios, {AxiosInstance} from 'axios';
import Storage from '../utils/Storage';

export const api = Axios.create({
    // baseURL: 'https://f559-2804-d4b-a9cf-cb00-b0ff-df42-4d2a-249c.sa.ngrok.io/api/',
    baseURL:'https://f9ed-2804-d4b-a9cf-cb00-d199-678d-3ee7-4058.sa.ngrok.io/api/',
    timeout: 5000,
    // headers: {'X-Custom-Header': 'foobar'}
});



api.interceptors.request.use(async function (req:any) {
    // Faz alguma coisa antes da requisição ser enviada
    if (!req.public) {
      const token = await Storage.getToken();
      console.log('Token || ', token)
      if (token) {
        req.headers.authorization =
          req.headers.authorization || `Token ${token}`;
      }
    }
    return req;
    
  }, function (error) {
    // Faz alguma coisa com o erro da requisição
    return Promise.reject(error);
  });

// Adiciona um interceptador na resposta
api.interceptors.response.use(function (response) {
    // Qualquer código de status que dentro do limite de 2xx faz com que está função seja acionada
    // Faz alguma coisa com os dados de resposta
    return response;
  }, function (error) {
    // Qualquer código de status que não esteja no limite do código 2xx faz com que está função seja acionada
    // Faz alguma coisa com o erro da resposta
    return Promise.reject(error);
  });



