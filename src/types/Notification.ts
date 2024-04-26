export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  autoClose: boolean;
  duration: number;
}
