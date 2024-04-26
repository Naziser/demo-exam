export interface ProfileData {
  id: number;
  login: string;
  name: string;
  surname: string;
  patronymic: string;
  initials: string;
  role: 'admin' | 'user';
  phone: string;
  created: string;
}
