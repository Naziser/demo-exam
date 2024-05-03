import axios from 'axios';
import type { LoginData } from '@/types/LoginData';
import type { SignupData } from '@/types/SignupData';
import type { StatementData } from '@/types/StatementData';

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

  function getProfileStatements(viewParams: { count: number; offset: number }) {
    return axios.get(
      `http://localhost:8080/api/statements/my-statements?count=${viewParams.count}&offset=${viewParams.offset}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }
    );
  }

  function getProfileStatementsById(id: number) {
    return axios.get(`http://localhost:8080/api/statements/statement?id=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
  }

  function createStatement(data: StatementData) {
    return axios.post('http://localhost:8080/api/statements/create-statement', data, {
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
    getProfileStatementsById,
    createStatement,
  };
}
