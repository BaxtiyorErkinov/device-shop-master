import { createRouter, createWebHistory } from 'vue-router';
import AuthCache from '@/cache/auth.cache';

import Default from '@/layouts/Default.vue';
import Login from '@/views/Login.vue';
import Main from '@/views/Main.vue';
import PageNotFound from '@/views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Root',
    component: Default,
    redirect: () => {
      return {
        name: 'Main',
      };
    },
    children: [
      {
        path: '/products',
        name: 'Main',
        component: Main,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },

  { path: '/:pathMatch(.*)*', component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = AuthCache.get();
  if (!token && to.name !== 'Login') {
    return next({
      name: 'Login',
    });
  } else if (token && to.name === 'Login') {
    return next(from);
  }

  next();
});

export default router;
