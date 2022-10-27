import './services/firebase';
import './services/firestore';
import {createApp} from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/css/vue-skeletor.css';



const app = createApp(App);
app.use(router);
app.mount('#app');