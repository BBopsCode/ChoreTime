import {createApp, createSSRApp} from 'vue';
import App from './App.vue';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import '../src/assets/main.css'
import { createVuetify } from 'vuetify';
import {createPinia} from 'pinia'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import router from "./router";

const vuetify = createVuetify({
    components,
    directives,
});

const app = createApp(App)
app.use(createPinia())
app.use(vuetify)
app.use(router)
app.use(createVuestic())

app.mount('#app')
