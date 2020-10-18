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
import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

Vue.use(AmplifyPlugin, AmplifyModules);

// router setup
import router from './routes/router';
// plugin setup
Vue.use(DashboardPlugin);


// start firebase here

// end firebase
import  firebase from 'firebase'



// connection  to the firebase  start here


require("firebase/firestore");

var config = {
  apiKey: "AIzaSyDACi1PfVrV1sMl_WAfeQ5FuMQm5fEl5jE",
  authDomain: "chatv-85249.firebaseapp.com",
  databaseURL: "https://chatv-85249.firebaseio.com",
  projectId: "chatv-85249",
  storageBucket: "chatv-85249.appspot.com",
  messagingSenderId: "1071441139587",
  appId: "1:1071441139587:web:9d2cfb4b4409fc58c108b6",
  measurementId: "G-DTXHZ2CSJR"
  };
  firebase.initializeApp(config);

  var db = firebase.firestore();

  window.db=db;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});
