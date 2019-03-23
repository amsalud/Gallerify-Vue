import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

import FormAlert from './components/shared/FormAlert';

// Register Global Components
Vue.component('form-alert', FormAlert);

Vue.use(VueApollo);

// Setup ApolloClient
export const defaultClient = new ApolloClient({
  uri: '/graphql',
  // include auth token with request made to backend
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    // If no token in local storage, set it
    if (!localStorage.token) {
      localStorage.setItem('token', '');
    }
    //Operation adds the token to an authorization header
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token')
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log('[NetworkError]', networkError);
    }

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.dir(err);
        if (err.name === 'AuthenticationError') {
          // Set auth error in state (to display in snackbar)
          store.commit('setAuthError', err);
          // Signout user to clear token
          store.dispatch('signoutUser');
        }
      }
    }
  }
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  router,
  store,
  render: h => h(App),
  created() {
    // Execute getCurrentUser query
    this.$store.dispatch('getCurrentUser');
  }
}).$mount('#app');
