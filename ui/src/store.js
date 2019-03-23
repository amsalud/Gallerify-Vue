import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

import { defaultClient as apolloClient } from './main';
import {
  GET_POSTS,
  SIGNIN_USER,
  SIGNUP_USER,
  GET_CURRENT_USER,
  ADD_POST,
  SEARCH_POSTS,
  GET_USER_POSTS,
  UPDATE_USER_POST
} from './queries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    searchResults: [],
    userPosts: [],
    user: null,
    loading: false,
    error: null,
    authError: null
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setUserPosts: (state, payload) => {
      state.userPosts = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    setAuthError: (state, payload) => {
      state.authError = payload;
    },
    setSearchResults: (state, payload) => {
      if (payload !== null) {
        state.searchResults = payload;
      } else {
        state.searchResults = [];
      }
    },
    clearUser: state => (state.user = null),
    setError: (state, payload) => (state.error = payload),
    clearError: state => (state.error = null),
    clearSearchResults: state => (state.searchResults = [])
  },
  getters: {
    posts: state => state.posts,
    userPosts: state => state.userPosts,
    searchResults: state => state.searchResults,
    loading: state => state.loading,
    user: state => state.user,
    userFavourites: state => state.user && state.user.favourites,
    error: state => state.error,
    authError: state => state.authError
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      commit('setLoading', true);
      apolloClient
        .query({
          query: GET_CURRENT_USER
        })
        .then(({ data }) => {
          commit('setLoading', false);
          commit('setUser', data.getCurrentUser);
        })
        .catch(err => {
          commit('setLoading', false);
          console.error(err);
        });
    },
    searchPosts: ({ commit }, payload) => {
      apolloClient
        .query({
          query: SEARCH_POSTS,
          variables: payload
        })
        .then(({ data }) => {
          console.log(data.searchPosts);
          commit('setSearchResults', data.searchPosts);
        })
        .catch(err => console.error(err));
    },
    getPosts: ({ commit }) => {
      commit('setLoading', true);
      // use ApolloClient to fire getPosts query
      apolloClient
        .query({
          query: GET_POSTS
        })
        .then(({ data }) => {
          // Get data from actions to state via mutations
          // Commit passes data from actions to mutation function
          commit('setPosts', data.getPosts);
          commit('setLoading', false);
        })
        .catch(err => {
          console.error(err);
          commit('setLoading', false);
        });
    },
    addPost: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: ADD_POST,
          variables: payload,
          update: (cache, { data: { addPost } }) => {
            // First read the query you want to update
            const data = cache.readQuery({ query: GET_POSTS });
            // Create updated data
            data.getPosts.unshift(addPost);
            // Write updated data back to query
            cache.writeQuery({
              query: GET_POSTS,
              data
            });
          },
          // Optimistic response ensures data is added immediately as we specified for the update function
          optimisticResponse: {
            __typename: 'Mutation',
            addPost: {
              __typename: 'Post',
              _id: -1,
              ...payload
            }
          }
        })
        .then(({ data }) => {
          console.log(data);
        })
        .catch(err => console.log(err));
    },
    getUserPosts: ({ commit }, payload) => {
      apolloClient
        .query({
          query: GET_USER_POSTS,
          variables: payload
        })
        .then(({ data }) => {
          commit('setUserPosts', data.getUserPosts);
        })
        .catch(err => console.error(err));
    },
    signinUser: ({ commit }, payload) => {
      commit('clearError');
      commit('setLoading', true);

      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit('setLoading', false);
          localStorage.setItem('token', data.signinUser.token);
          router.go();
        })
        .catch(err => {
          commit('setLoading', false);
          commit('setError', err);
          console.error(err);
        });
    },
    signupUser: ({ commit }, payload) => {
      commit('clearError');
      commit('setLoading', true);

      apolloClient
        .mutate({
          mutation: SIGNUP_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit('setLoading', false);
          localStorage.setItem('token', data.signupUser.token);
          // Make sure created methid is executed in main.js (Run getCurrentUser) and reaload the page
          router.go();
        })
        .catch(err => {
          commit('setLoading', false);
          commit('setError', err);
          console.error(err);
        });
    },
    signoutUser: async ({ commit }) => {
      // clear user in state
      commit('clearUser');
      // remove token in localStorage
      localStorage.setItem('token', '');
      // end session
      await apolloClient.resetStore();
      router.push('/');
    },
    updateUserPost: ({ state, commit }, payload) => {
      apolloClient
        .mutate({
          mutation: UPDATE_USER_POST,
          variables: payload
        })
        .then(({ data }) => {
          const index = state.userPosts.findIndex(
            post => post._id === data.updateUserPost._id
          );
          const userPosts = [
            ...state.userPosts.slice(0, index),
            data.updateUserPost,
            ...state.userPosts.slice(index + 1)
          ];
          commit('setUserPosts', userPosts);
        })
        .catch(err => console.error(err));
    }
  }
});
