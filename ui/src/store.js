import Vue from 'vue';
import Vuex from 'vuex';

import { defaultClient as apolloClient } from './main';
import { gql } from 'apollo-boost';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    }
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading
  },
  actions: {
    getPosts: ({ commit }) => {
      commit('setLoading', true);
      // use ApolloClient to fire getPosts query
      apolloClient
        .query({
          query: gql`
            query {
              getPosts {
                _id
                title
                imageUrl
                description
              }
            }
          `
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
    }
  }
});
