import type { ProfileData } from '@/types/ProfileData';
import axios from 'axios';
// import type { LoginData } from '@/types/LoginData';
import type { SignupData } from '@/types/SignupData';

export function useApi() {
  function checkLogin() {
    return {
      data: {
        active: false,
      },
    };
  }

  function signUp(data: SignupData) {
    return axios.post('http://localhost:8080/api/registration', {
      ...data,
    });
  }

  function signIn() {
    return {
      data: {
        id: 1,
        name: 'Иванов',
        surname: 'Иванов',
        role: 'user',
        phone: '88005553535',
      },
    };
  }

  function testRequest() {
    return axios.get('http://localhost:8080/api/users', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzE0NjQ2NjgxLCJleHAiOjE3MTQ3MzMwODF9.F73anSdB5IHqvfeMAZspSXfzbC0OazZj2PgvZN2BkZU`,
      },
    });
  }

  function getUserProfile(): { data: ProfileData } {
    return {
      data: {
        id: 1,
        login: 'admin@srdata.ru',
        name: 'Иванов',
        surname: 'Иванов',
        patronymic: 'Иванович',
        initials: 'Иванов И.И.',
        role: 'user',
        phone: '88005553535',
        created: '2023-09-09T15:31:37+03:00',
      },
    };
  }

  return {
    checkLogin,
    testRequest,
    signIn,
    signUp,
    getUserProfile,
  };
}
