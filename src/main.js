/*!
=========================================================
* BootstrapVue Argon Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/bootstrap-vue-argon-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Coded by www.creative-tim.com
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';
import store from './store';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import infiniteScroll from 'vue-infinite-scroll';
import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

Vue.use(AmplifyPlugin, AmplifyModules);
Vue.component('pulse-loader', require('vue-spinner/src/PulseLoader.vue').default);
Vue.use(infiniteScroll);

// router setup
import router from './routes/router';
// plugin setup
Vue.use(DashboardPlugin);

// start firebase
import firebase from 'firebase'

// connection  to the firebase  start here
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyBGxWWqFYjRu21BOjj91og_cxf08icUVXc",
  authDomain: "chatv-8e71f.firebaseapp.com",
  databaseURL: "https://chatv-8e71f.firebaseio.com",
  projectId: "chatv-8e71f",
  storageBucket: "chatv-8e71f.appspot.com",
  messagingSenderId: "106853411080",
  appId: "1:106853411080:web:3366c1332654d18a3064bd",
  measurementId: "G-H4S1P2530C"
};
firebase.initializeApp(config);

var db = firebase.firestore();
window.db = db;
// end firebase

// added for sliders in year filter
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
Vue.component('VueSlider', VueSlider)
// end of code added

Vue.prototype.$endpoints = {
  aspnet: 'https://localhost:5001/',
  crossref: 'https://api.crossref.org/',
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});
