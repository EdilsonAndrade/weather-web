import axios from 'axios';

const api = axios.create({
  baseURL: 'https://community-open-weather-map.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_API_KEY,
    'x-rapidapi-host': process.env.REACT_APP_API_HOST,
    useQueryString: true,
  },
});

export default api;
