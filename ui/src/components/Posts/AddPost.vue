<template>
  <v-container
    text-xs-center
    mt-5
    pt-5
  >

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
              <h1>Create a post</h1>
            </v-flex>
          </v-layout>
          <!-- Add Post Form -->
          <v-container>
            <v-form
              v-model="isFormValid"
              lazy-validation
              ref="form"
              @submit.prevent="addPost"
            >
              <!-- Title Input -->
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    :rules="titleRules"
                    v-model="title"
                    label="Post Title"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <!-- Image Url -->
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    :rules="imageRules"
                    v-model="imageUrl"
                    label="Image Url"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <!-- Image Preview -->
              <v-layout row>
                <v-flex xs12>
                  <img
                    :src="imagePreviewUrl"
                    height="300px"
                  >
                </v-flex>
              </v-layout>

              <!-- Categories Select -->
              <v-layout row>
                <v-flex xs12>
                  <v-select
                    v-model="categories"
                    :rules="categoriesRules"
                    :items="['Art', 'Education', 'Travel', 'Photography', 'Technology']"
                    multiple
                    label="Categories"
                  ></v-select>
                </v-flex>
              </v-layout>

              <!-- Description -->
              <v-layout row>
                <v-flex xs12>
                  <v-textarea
                    :rules="descriptionRules"
                    v-model="description"
                    label="Description"
                    type="text"
                    required
                  ></v-textarea>
                </v-flex>

              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-btn
                    :loading="loading"
                    color="accent"
                    type="submit"
                    :disabled="!isFormValid || loading"
                  >Create
                    <span
                      slot="loader"
                      class="custom-loader"
                    >
                      <v-icon light>cached</v-icon>
                    </span>
                  </v-btn>
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
import { setTimeout } from "timers";
export default {
  name: "AddPost",
  data() {
    return {
      isFormValid: true,
      title: "",
      imageUrl: "",
      imagePreviewUrl: "",
      categories: [],
      description: "",
      titleRules: [
        title => !!title || "Title is required",
        title =>
          title.length < 20 ||
          "Title must have less than 20 characters in length"
      ],
      imageRules: [image => !!image || "Image url is required"],
      categoriesRules: [
        categories =>
          categories.length >= 1 || "At least one category is  required"
      ],
      descriptionRules: [
        description => !!description || "Description is required",
        description =>
          description.length < 200 ||
          "Description must have less than 200 characters in length"
      ]
    };
  },
  watch: {
    imageUrl(value) {
      setTimeout(() => (this.imagePreviewUrl = this.imageUrl), 1000);
    }
  }
};
</script>
