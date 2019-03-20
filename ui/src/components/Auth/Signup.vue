<template>
  <v-container
    text-xs-center
    mt-5
    pt-5
  >
    <!-- Error Alert -->
    <v-layout
      row
      wrap
      v-if="error"
    >
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>
    <!-- Signup Form -->
    <v-layout
      row
      wrap
    >
      <v-flex
        xs-12
        sm6
        offset-sm3
      >
        <v-card>
          <v-layout
            row
            wrap
          >
            <v-flex
              xs12
              sm6
              offset-sm3
              mt-3
            >
              <h1>Get Started Here</h1>
            </v-flex>
          </v-layout>
          <v-container>
            <v-form
              v-model="isFormValid"
              lazy-validation
              ref="form"
              @submit.prevent="signupUser"
            >
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    :rules="usernameRules"
                    v-model="username"
                    prepend-icon="face"
                    label="Username"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    :rules="emailRules"
                    v-model="email"
                    prepend-icon="email"
                    label="Email"
                    type="email"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    :rules="passwordRules"
                    v-model="password"
                    prepend-icon="extension"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    :rules="passwordRules"
                    v-model="passwordConfirmation"
                    prepend-icon="gavel"
                    label="Confirm Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn
                    :loading="loading"
                    color="accent"
                    type="submit"
                    :disabled="!isFormValid || loading"
                  >Sign Up
                    <span
                      slot="loader"
                      class="custom-loader"
                    >
                      <v-icon light>cached</v-icon>
                    </span>
                  </v-btn>
                  <p>Already have an account?
                    <router-link to="/signin">Sign In </router-link>
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
import { mapGetters } from "vuex";
export default {
  name: "Signup",
  data() {
    return {
      isFormValid: true,
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      usernameRules: [
        // Check if username input
        username => !!username || "Username is required",
        // Username should be less than 10 characters
        username =>
          username.length < 10 ||
          "Username should be less than 10 characters in length"
      ],
      emailRules: [
        email => !!email || "Email is required",
        email => /.@+./.test(email) || "Email must be valid"
      ],
      passwordRules: [
        password => !!password || "Password is required",
        // Ensure password is at least 7 characters in length
        password =>
          password.length >= 7 || "Password must be at least 7 characters",
        confirmation => confirmation === this.password || "Passwords must match"
      ]
    };
  },
  computed: {
    ...mapGetters(["error", "loading", "user"])
  },
  watch: {
    user(value) {
      // if user value changes from null to object, redirect to home page
      if (value) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    signupUser() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("signupUser", {
          username: this.username,
          email: this.email,
          password: this.password
        });
      }
    }
  }
};
</script>
