import Vue from 'vue';
import Vuex from 'vuex';

import { defaultClient as apolloClient } from './main';
import { gql } from 'apollo-boost';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    getPosts: () => {
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
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
});
