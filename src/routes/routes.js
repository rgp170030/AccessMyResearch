import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';

import NotFound from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: DashboardLayout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Home.vue')
      },
      {
        path: '/upload',
        name: 'upload an article',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Upload.vue')
      },
      {
        path: '/search',
        name: 'search an article',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Search.vue')
      },
      {
        path: '/ask',
        name: 'ask an expert',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Ask.vue')
      },
      {
        path: '/collections',
        name: 'my collections',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Collections.vue')
      },
      {
        path: '/messages',
        name: 'messages',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Messages.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue')
      },
      {
        path: '/notifications',
        name: 'notifications',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Notifications.vue')
      },
      {
        path: '/activity',
        name: 'activity',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Activity.vue')
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Settings.vue')
      },
      {
        path: '/donate',
        name: 'donate',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Donate.vue')
      },
      {
        path: '/contact',
        name: 'contact us',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Contact.vue')
      },
      {
        path: '/help',
        name: 'help',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Help.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "demo" */ '../views/About.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue')
      },
      { path: '*', component: NotFound }
    ]
  }
];

export default routes;