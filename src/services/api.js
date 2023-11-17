import axios from 'axios';

// Crie uma instância do Axios com algumas configurações padrão
const api = axios.create({
  baseURL: 'http://192.168.10.156:8000',
  timeout: 1000
});

// Adicione um interceptor de requisição para incluir o token de autenticação em todas as requisições
api.interceptors.request.use(
  (config) => {
    // Suponha que você tenha o token armazenado em localStorage ou algum gerenciador de estado
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = "Bearer " + token;

    }
    return config;
  },
  error => {
    // Faça algo com o erro de requisição
    return Promise.reject(error);
  }
);

export default api;
