<template>
  <v-container
    text-xs-center
    mt-3
  >
    <!-- Loading Spinner -->
    <v-layout row>
      <v-dialog
        v-model="loading"
        persistent
        fullscreen
      >
        <v-container fill-height>
          <v-layout
            row
            justify-center
            align-center
          >
            <v-progress-circular
              indeterminate
              :size="70"
              :width="7"
              color="secondary"
            ></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>

    <!-- Posts Carousel -->
    <v-flex xs12>
      <v-carousel
        v-if="!loading && posts.length > 0"
        v-bind="{'cycle': true}"
        interval="3000"
      >
        <v-carousel-item
          v-for="post in posts"
          :key="post._id"
          :src="post.imageUrl"
          @click.native="goToPost(post._id)"
        >
          <h1 id="carousel__title">{{post.title}}</h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
    <!-- Explore Posts Button -->
    <v-layout
      class="mt-3 mb-3"
      row
      wrap
      v-if="!loading"
    >
      <v-flex xs12>
        <v-btn
          class="secondary"
          to="/posts"
          large
          dark
        >
          Explore Posts
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "home",
  methods: {
    handleGetCarouselPosts() {
      // reach out to Vuex store, fire action that fetches posts for carousel
      this.$store.dispatch("getPosts");
    },
    goToPost(postId) {
      this.$router.push(`/posts/${postId}`);
    }
  },
  computed: {
    ...mapGetters(["loading", "posts"])
  },
  created() {
    this.handleGetCarouselPosts();
  }
};
</script>

<style>
#carousel__title {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  color: white;
  border-radius: 5px 5px 0 0;
  padding: 0.5m;
  margin: 0 auto;
  bottom: 50px;
  left: 0;
  right: 0;
}
</style>

