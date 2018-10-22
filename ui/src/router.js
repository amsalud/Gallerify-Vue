import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';

import Posts from './components/posts/Posts.vue';
import AddPost from './components/posts/AddPost.vue';
import Signin from './components/auth/Signin.vue';
import Signup from './components/auth/Signup.vue';
import Profile from './components/auth/Profile.vue';

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
      component: AddPost
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
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
