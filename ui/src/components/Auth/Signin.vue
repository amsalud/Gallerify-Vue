<template>
    <v-container text-xs-center mt-5 pt-5>
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
                                    <v-text-field v-model="username" prepend-icon="face" label="Username" type="text" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field v-model="password" prepend-icon="extension" label="Password" type="password" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-btn color="accent" type="submit">Log In</v-btn>
                                    <p>Don't have an account yet?
                                        <router-link to="/signup">Register</router-link>
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
export default {
  name: 'Signin',
  data: () => ({
    username: '',
    password: ''
  }),
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
