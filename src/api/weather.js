import axios from "axios";
import { API_KEY, API_URL } from "../constants";
const forecastEndpoint = (params) =>
  `${API_URL}/forecast.json?key=${API_KEY}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;
const locationsEndpoint = (params) =>
  `${API_URL}/search.json?key=${API_KEY}&q=${params.cityName}`;
const apiCall = async (endpoint) => {
  const options = {
    method: 'GET',
    url: endpoint
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
export const fetchWeatherForecast = (params) => {
  return apiCall(forecastEndpoint(params));
};
export const fetchLocations = (params) => {
  return apiCall(locationsEndpoint(params));
};
