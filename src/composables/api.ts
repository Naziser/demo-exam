import axios from 'axios';

export const BASE_URL = 'http://51.250.71.57:8080';

export function useApi() {
  function testRequest() {
    return axios('https://jsonplaceholder.typicode.com/posts');
  }

  return {
    testRequest,
  };
}
