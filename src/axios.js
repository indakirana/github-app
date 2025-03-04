import axios from 'axios';

const Client = axios.create({
  baseURL: 'https://api.github.com/', // base URL of the API

});

export default Client;
