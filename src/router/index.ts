import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import AuthorizationPage from '@/pages/unauthorized/AuthorizationPage.vue';
import LoginForm from '@/pages/unauthorized/LoginForm.vue';
import SignupForm from '@/pages/unauthorized/SignupForm.vue';
import SignupConfirmationPage from '@/pages/unauthorized/SignupConfirmationPage.vue';
import MainPage from '@/pages/MainPage.vue';
import ProfilePage from '@/pages/ProfilePage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

import { useProfileStore } from '@/stores/ProfileStore';
import { checkRequiresAuth } from '@/helpers/checkRequiresAuth';

import type { RouteName } from '@/types/RouteName';

export const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'main' },
  },
  {
    path: '/auth',
    name: 'auth',
    redirect: { name: 'login' },
    component: AuthorizationPage,
    children: [
      { path: 'login', name: 'login', component: LoginForm },
      { path: 'signup', name: 'signup', component: SignupForm },
      { path: 'confirm', name: 'signup-confirmation', component: SignupConfirmationPage },
    ],
  },
  {
    path: '/main',
    name: 'main',
    component: MainPage,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage,
  },
] as const;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth',
          });
        }, 100);
      });
    return { top: 0, behavior: 'smooth' };
  },
  routes: routes as Readonly<RouteRecordRaw[]>,
});

router.beforeEach(async (to) => {
  const profileStore = useProfileStore();
  await profileStore.updateAuthStatus();

  if (
    !profileStore.isAuthenticated &&
    // Избегаем бесконечной переадресации
    checkRequiresAuth(to.name as RouteName)
  ) {
    return { name: 'login' };
  } else if (profileStore.isAuthenticated && (to.name === 'login' || to.name === 'signup')) {
    return { name: 'main' };
  }
});

export default router;
