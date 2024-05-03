import axios from 'axios';
import type { LoginData } from '@/types/LoginData';
import type { SignupData } from '@/types/SignupData';

export function useApi() {
  function checkLogin() {
    return axios.get('http://localhost:8080/api/check', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
  }

  function signUp(data: SignupData) {
    return axios.post('http://localhost:8080/api/registration', {
      ...data,
    });
  }

  function signIn(data: LoginData) {
    return axios.post('http://localhost:8080/api/login', {
      ...data,
    });
  }

  function getProfileStatements() {
    return axios.get('http://localhost:8080/api/statements/my-statements', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
  }

  return {
    checkLogin,
    signIn,
    signUp,
    getProfileStatements,
  };
}
