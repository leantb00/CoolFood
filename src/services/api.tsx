import Axios from 'axios';

export const api = Axios.create({
    baseURL: 'https://c443-2804-d4b-a919-5800-7d7f-7a3-1eec-2fd8.sa.ngrok.io/api/',
    timeout: 5000,
    // headers: {'X-Custom-Header': 'foobar'}
});

api.interceptors.request.use(function (config) {
    // Faz alguma coisa antes da requisição ser enviada
    return config;
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


