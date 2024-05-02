import type { ProfileData } from '@/types/ProfileData';
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

  function getUserProfile(): { data: ProfileData } {
    return {
      data: {
        id: 1,
        login: 'admin@srdata.ru',
        full_name: 'Рындин Сергей Иванович',
        phone: '88005553535',
        email: 'SeregaSwapp@mail.ru',
        role: 'USER',
      },
    };
  }

  return {
    checkLogin,
    signIn,
    signUp,
    getUserProfile,
  };
}
