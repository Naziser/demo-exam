export interface ProfileData {
  id: number;
  login: string;
  full_name: string;
  phone: string;
  email: string;
  role: 'ADMIN' | 'USER';
}
