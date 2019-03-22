<template>
  <div id="app">
    <v-app style="background:#E3E3EE">
      <!-- Side Navbar -->
      <v-navigation-drawer
        app
        temporary
        fixed
        v-model="sideNavVisible"
      >
        <v-toolbar
          color="accent"
          dark
          flat
        >
          <v-toolbar-side-icon @click="toggleSideNav"></v-toolbar-side-icon>
          <router-link
            to="/"
            tag="span"
            style="cursor:pointer"
          >
            <h1 class="title pl-3">Gallerify</h1>
          </router-link>
        </v-toolbar>
        <v-divider></v-divider>
        <!-- Side Navbar Links -->
        <v-list>
          <v-list-tile
            ripple
            v-for="item in sideNavItems"
            :key="item.title"
            :to="item.link"
          >
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              {{item.title}}
            </v-list-tile-content>
          </v-list-tile>
          <!-- Signout Button-->
          <v-list-tile
            ripple
            v-if="user"
            @click="signoutUser"
          >
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>Sign Out</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <!-- Horizontal Navbar -->
      <v-toolbar
        fixed
        color="primary"
        dark
      >
        <!-- App Title -->
        <v-toolbar-side-icon @click="toggleSideNav"></v-toolbar-side-icon>
        <v-toolbar-title class="hidden-xs-only">
          <router-link
            to="/"
            tag="span"
            style="cursor:pointer;"
          >Gallerify</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- Search Input -->
        <v-text-field
          v-model="searchTerm"
          clearable
          @input="debounceInput(handleSearchPosts)"
          flex
          prepend-icon="search"
          placeholder="Search for posts"
          color="accent"
          single-line
          hide-details
        ></v-text-field>

        <!-- Search Results Card  -->
        <v-card
          light
          v-if="searchResults.length"
          id="card__search"
        >
          <v-list>
            <v-list-tile
              @click="goToSearchResult(result._id)"
              v-for="result in searchResults"
              :key="result._id"
            >
              <v-list-tile-title>
                {{result.title}} -
                <span class="font-weight-thin">{{formatDescription(result.description)}}</span>
              </v-list-tile-title>
              <!-- Show icon if post is liked by user -->
              <v-list-tile-action v-if="checkIfUserFavourite(result._id)">
                <v-icon color="red">favorite</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>

        <v-spacer></v-spacer>
        <!-- Horizontal Navbar Links -->
        <v-toolbar-items class="hidden-xs-only">
          <v-btn
            flat
            v-for="item in horizontalNavItems"
            :key="item.title"
            :to="item.link"
          >
            <v-icon
              left
              class="hidden-sm-only"
            >{{item.icon}}</v-icon>
            {{item.title}}
          </v-btn>
          <!-- Profile Button -->
          <v-btn
            flat
            to="/profile"
            v-if="user"
          >
            <v-icon
              class="hidden-sm-only"
              left
            >account_box</v-icon>
            <v-badge
              right
              color="blue darken-2"
              :class="{ 'bounce': badgeAnimated }"
            >
              <span
                slot="badge"
                v-if="userFavourites.length"
              >{{userFavourites.length}}</span>
              Profile
            </v-badge>
          </v-btn>
          <!-- Signout Button -->
          <v-btn
            flat
            v-if="user"
            @click="signoutUser"
          >
            <v-icon
              class="hidden-sm-only"
              left
            >exit_to_app</v-icon>
            <v-badge
              right
              color="blue darken-2"
            >
              Sign Out
            </v-badge>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <!-- App Content -->
      <main>
        <v-container class="mt-4">
          <transition name="fade">
            <router-view />
          </transition>
          <!-- Auth Snackbar -->
          <v-snackbar
            v-model="authSnackbar"
            color="success"
            :timeout="2000"
            top
            right
          >
            <v-icon class="mr-3">
              check_circle
            </v-icon>
            <h3>You are now signed in!</h3>
            <v-btn
              dark
              flat
              @click="authSnackbar =  false"
            >Close</v-btn>
          </v-snackbar>

          <!-- Auth Error Snackbar -->
          <v-snackbar
            v-if="authError"
            v-model="authErrorSnackbar"
            color="warning"
            :timeout="2000"
            top
            right
          >
            <v-icon class="mr-3">
              cancel
            </v-icon>
            <h3>{{authError.message}}</h3>
            <v-btn
              dark
              to="/signin"
            >Sign in</v-btn>
          </v-snackbar>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { setTimeout } from "timers";
export default {
  name: "App",
  data() {
    return {
      searchTerm: "",
      sideNavVisible: false,
      authSnackbar: false,
      authErrorSnackbar: false,
      badgeAnimated: false,
      timeoutRef: null
    };
  },
  watch: {
    user(newValue, oldValue) {
      //If we had no value for user before, show snackbar
      if (oldValue === null) {
        this.authSnackbar = true;
      }
    },
    authError(value) {
      // If authError is not null show authError snackbar
      if (value !== null) {
        this.authErrorSnackbar = true;
      }
    },
    userFavourites(value) {
      // If user favourites value changed
      if ((this.badgeAnimated = true));
      setTimeout(() => (this.badgeAnimated = false), 1000);
    }
  },
  computed: {
    ...mapGetters(["authError", "user", "userFavourites", "searchResults"]),
    horizontalNavItems() {
      let items = [
        { icon: "chat", title: "Posts", link: "/posts" },
        { icon: "lock_open", title: "Sign In", link: "/signin" },
        { icon: "create", title: "Sign Up", link: "signup" }
      ];

      if (this.user) {
        items = [{ icon: "chat", title: "Posts", link: "/posts" }];
      }

      return items;
    },
    sideNavItems() {
      let items = [
        { icon: "chat", title: "Posts", link: "/posts" },
        { icon: "lock_open", title: "Sign In", link: "/signin" },
        { icon: "create", title: "Sign Up", link: "signup" }
      ];

      if (this.user) {
        items = [
          { icon: "chat", title: "Posts", link: "/posts" },
          { icon: "stars", title: "Create a Post", link: "/post/add" },
          { icon: "account_box", title: "Profile", link: "/profile" }
        ];
      }

      return items;
    }
  },
  methods: {
    formatDescription(desc) {
      return desc.length > 30 ? `${desc.slice(0, 30)}...` : desc;
    },
    checkIfUserFavourite(resultId) {
      return (
        this.userFavourites &&
        this.userFavourites.some(fave => fave._id === resultId)
      );
    },
    goToSearchResult(resultId) {
      // Clear search term
      this.searchTerm = "";
      // Go to desired result
      this.$router.push(`/posts/${resultId}`);
      // Clear search results
      this.$store.commit("clearSearchResults");
    },
    handleSearchPosts() {
      this.$store.dispatch("searchPosts", {
        searchTerm: this.searchTerm
      });
    },
    toggleSideNav() {
      this.sideNavVisible = !this.sideNavVisible;
    },
    signoutUser() {
      this.$store.dispatch("signoutUser");
    },
    debounceInput(callbackMethod) {
      if (!this.timeoutRef) {
        this.timeoutRef = setTimeout(() => {
          callbackMethod();
          this.timeoutRef = null;
        }, 1000);
      }
    }
  }
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}
.fade-enter-active {
  transition-delay: 0.25s;
}
.fade-enter,
fade-leave-active {
  opacity: 0;
}

/* Search Results Card */
#card__search {
  position: absolute;
  width: 100vw;
  z-index: 8;
  top: 100%;
  left: 0%;
}

/* User Favourite Animation */
.bounce {
  animation: bounce 1s both;
}

@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    transform: translate3d(0, -20px, 0);
  }
  70% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}
</style>


