import type { RouteName } from '@/types/RouteName';

export function checkRequiresAuth(routeName: RouteName) {
  const nonAuthPages: RouteName[] = ['login', 'signup'];
  return !nonAuthPages.includes(routeName);
}
