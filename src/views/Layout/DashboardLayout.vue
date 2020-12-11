<template>
  <div class="wrapper">
    <notifications/> <!--TODO: Add some code back here for mobile navigation -->
    <!--<side-bar/>-->
    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"/>
      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view/>
        </fade-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"/>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import { Auth, AuthHelperRoles } from "@/util/auth-helper.js"
import DashboardNavbar from './DashboardNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import DashboardContent from './Content.vue';
import { FadeTransition } from 'vue2-transitions';

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    // DashboardContent,
    FadeTransition
  },
  computed:{
    signedIn() {
      return this.$store.state.signedIn;
    },
    isAdmin() {
      return this.$store.state.isAdmin;
    },
    isExpert() {
      return this.$store.state.isExpert;
    },
  },
  methods: {
    initScrollbar() {
      if (navigator.platform.startsWith('Win')) { //Checks if platform is Windows
        initScrollbar('sidenav');
      }
    },
    updateUserStatus: async function() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.$store.state.signedIn = true;
        this.$store.state.user = user;
        this.$store.state.isAdmin = await AuthHelperRoles.isAdmin(user);
        this.$store.state.isExpert = await AuthHelperRoles.isExpert(user);
      }
      catch(err){
        this.$store.state.signedIn = false;
        this.$store.state.user = null;
        this.$store.state.isAdmin = false;
        this.$store.state.isExpert = false;
      }
    },
    redirect() {
      if(!this.signedIn)
      {
        this.$router.push('/login'); //if not signed in, the page will redirect to login page
      }
    },
  },
  mounted() {
    this.updateUserStatus();
    this.initScrollbar();
  },
};
</script>