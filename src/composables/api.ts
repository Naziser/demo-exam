import type { ProfileData } from '@/types/ProfileData';
// import type { LoginData } from '@/types/LoginData';

export const BASE_URL = 'http://51.250.71.57:8080';

export function useApi() {
  function checkLogin() {
    return {
      data: {
        active: true,
      },
    };
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
    signIn,
    getUserProfile,
  };
}
