<template>
    <v-container text-xs-center mt-5 pt-5>
        <!-- Error Alert -->
        <v-layout row wrap v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <form-alert :message="error.message"></form-alert>
            </v-flex>
        </v-layout>
        <!-- Signin Form -->
        <v-layout row wrap>
            <v-flex xs-12 sm6 offset-sm3>
                <v-card>
                    <v-layout row wrap>
                        <v-flex xs12 sm6 offset-sm3 mt-3>
                            <h1>Welcome Back!</h1>
                        </v-flex>
                    </v-layout>
                    <v-container>
                        <v-form @submit.prevent="signinUser">
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="usernameRules" v-model="username" prepend-icon="face" label="Username" type="text" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="passwordRules" v-model="password" prepend-icon="extension" label="Password" type="password" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-btn :loading="loading" color="accent" type="submit">Log In
                                        <span slot="loader" class="custom-loader">
                                            <v-icon light>cached</v-icon>
                                        </span>
                                    </v-btn>
                                    <p>Don't have an account yet?
                                        <router-link to="/signup">Register </router-link>
                                    </p>
                                </v-flex>
                            </v-layout>

                        </v-form>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Signin',
  data: () => ({
    username: '',
    password: '',
    usernameRules: [
      // Check if username input
      username => !!username || 'Username is required',
      // Username should be less than 10 characters
      username =>
        username.length < 10 ||
        'Username should be less than 10 characters in length'
    ],
    passwordRules: [
      password => !!password || 'Password is required',
      // Ensure password is at least 7 characters in length
      password =>
        password.length >= 7 || 'Password must be at least 7 characters'
    ]
  }),
  computed: {
    ...mapGetters(['user', 'error', 'loading'])
  },
  watch: {
    user(value) {
      // if user value changes from null to object, redirect to home page
      if (value) {
        this.$router.push('/');
      }
    }
  },
  methods: {
    signinUser() {
      this.$store.dispatch('signinUser', {
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

