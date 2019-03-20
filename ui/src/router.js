import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';

import Posts from './components/Posts/Posts.vue';
import AddPost from './components/Posts/AddPost.vue';
import Signin from './components/Auth/Signin.vue';
import Signup from './components/Auth/Signup.vue';
import Profile from './components/Auth/Profile.vue';

import AuthGuard from './auth-guard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/post/add',
      name: 'addpost',
      component: AddPost,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
});
