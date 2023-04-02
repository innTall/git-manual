import { createApp, provide, h } from 'vue';
import { createPinia } from 'pinia';
import './index.css';
import App from './App.vue';
import router from './router';

import { createApolloClient } from './apolloClient';
import { DefaultApolloClient } from '@vue/apollo-composable';
const app = createApp({
  setup() {
    provide(DefaultApolloClient, createApolloClient())
  },
  render: () => h(App)
});

app.use(createPinia()).use(router).mount('#app');
