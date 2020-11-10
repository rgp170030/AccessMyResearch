import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';
import NotFound from '@/views/NotFoundPage.vue';

import RolesUtil from "@/util/userroles.js"
import { Auth } from "aws-amplify";


const routes = [
  //Unregistered User Routes - no navigation guarding
  {
    path: '/',
    redirect: 'home',
    component: DashboardLayout,

    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'results',
        name: 'results',
        component: () => import('../views/SearchResults.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('../views/Pages/UserProfile.vue')
      },
      {
        path: 'donate',
        name: 'donate',
        component: () => import('../views/Donate.vue')
      },
      {
        path: 'contact',
        name: 'contact us',
        component: () => import('../views/Contact.vue')
      },
      {
        path: 'help',
        name: 'help',
        component: () => import('../views/Help.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/About.vue')
      },
    ]
  },

  //Authentication routes. No Navigation Guarding
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/Pages/Login.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../views/Pages/Register.vue')
      },
      {
        path: 'forgotpassword',
        name: 'forgotpassword',
        component: () => import('../views/Pages/ForgotPassword.vue')
      },
      {
        path: 'codeverification',
        name: 'codeverification',
        component: () => import('../views/Pages/CodeVerification.vue')
      }
    ]
  },

  //Registered user routes - Basic navigatoin guarding - must be logged in.
  {
    path: '/',
    component: DashboardLayout,

    beforeEnter: function(to, from, next){
      //TODO once registrtion is fully functional, we will need to actually check if a user is logged in or not.
      next();
    },

    children: [
      {
        path: 'ask',
        name: 'ask an expert',
        component: () => import('../views/Ask.vue')
      },
      {
        path: 'collections',
        name: 'my collections',
        component: () => import('../views/Collections.vue')
      },
      {
        path: 'projects',
        name: 'my projects',
        component: () => import('../views/Projects.vue')
      },
      {
        path: 'messages',
        name: 'messages',
        component: () => import('../views/Messages.vue')
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: () => import('../views/Notifications.vue')
      },
      {
        path: 'activity',
        name: 'activity',
        component: () => import('../views/Activity.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('../views/Settings.vue')
      },
      {
        path: 'interests',
        name: 'interests',
        component: () => import('../views/Pages/Interests.vue')
      },
      {
        path: 'suggestedpeople',
        name: 'suggestions for you',
        component: () => import('../views/Pages/SuggestedPeople.vue')
      },
      {
        path: 'search-history',
        name: 'search history',
        component: () => import('../views/SearchHistory.vue')
      },
      {
        path: 'profile-information',
        name: 'profile information',
        component: () => import('../views/Pages/ProfileInformation.vue')
      },
    ]
  },

  //Expert user routes - Strict navigating guarding (must pass RolesUtil.isExpert())
  {
    path: '/',
    component: DashboardLayout,

    beforeEnter: function(to, from, next){
      //TODO expert roles story - add navigation guarding for expert pages.
      next();
    },

    children: [
      {
        path: 'upload',
        name: 'Add Research Material',
        component: () => import('../views/Upload.vue')
      },
    ]
  },

  //Admin user routes - Strict navigation guarding (must pass RolesUtil.isAdmin())
  {
    path: '/admin',
    redirect: {name: 'AdminHome'},
    component: DashboardLayout,

    beforeEnter: async (to, from, next) => {
      try{
        var user = await Auth.currentAuthenticatedUser();
        
        console.log(user);
        if(RolesUtil.isAdmin(user)){
          next();
        }else{
          next({name: 'Home'});
        }
      }catch(e){
        console.log(e);
        next({ name: 'login' });
      }
    },

    children: [
      {
        path: 'home',
        name: 'AdminHome',
        component: () => import('../views/Pages/Admin.vue')
        
      }

    ]
  },

  //404 route
  {
    path: '*',
    component: NotFound
  }
];

export default routes;