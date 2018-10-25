<template>
    <v-alert type="error" v-model="alert" :value="true" dismissible>
        <h3>{{message}}</h3>
    </v-alert>
</template>

<script>
export default {
  props: ['message ']
};
</script>
