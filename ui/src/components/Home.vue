<template>
  <v-container text-xs-center>
    <!-- <ApolloQuery :query="getPostsQuery">
      <template slot-scope="{result: {loading, error, data}}">
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">Error {{error.message}}</div>
        <v-flex v-else-if="data" xs12>
          <v-carousel v-bind="{'cycle': true}" interval="3000">
            <v-carousel-item v-for="post in data.getPosts" :key="post._id" :src="post.imageUrl">
              <h1 id="carousel__title">{{post.title}}</h1>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </template>
    </ApolloQuery> -->
  </v-container>
</template>

<script>
import { gql } from 'apollo-boost';
export default {
  name: 'home',
  methods: {
    handleGetCarouselPosts() {
      // reach out to Vuex store, fire action that fetches posts for carousel
      this.$store.dispatch('getPosts');
    }
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
  color: white;
  border-radius: 5px 5px 0 0;
  padding: 0.5m;
  margin: 0 auto;
  bottom: 50px;
  left: 0;
  right: 0;
}
</style>

