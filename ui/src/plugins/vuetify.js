import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#1E88E5',
    secondary: '#64B5F6',
    accent: '#29B6F6',
    error: '#F4511E',
    warning: '#FF8F00',
    info: '#455A64',
    success: '#689F38'
  }
});
