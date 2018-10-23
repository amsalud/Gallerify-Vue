import Vue from 'vue';
import Vuex from 'vuex';

import { defaultClient as apolloClient } from './main';
import { gql } from 'apollo-boost';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    }
  },
  getters: {
    posts: state => state.posts
  },
  actions: {
    getPosts: ({ commit }) => {
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
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
});
