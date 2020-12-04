<template>
  <div class="wrapper">
    <notifications/>
    <side-bar>
      <template slot="links">
        <div v-if="!signedIn">
          <b-alert show>
          <i class="fas fa-exclamation-circle fa-lg"></i>
          &nbsp; In order to access these features, you must login. You can login <router-link class="font-weight-bolder text-white" to="/login">here.</router-link></b-alert>
        </div>
        <div @click="redirect">
          <sidebar-item
          :link="{
            name: 'Add Research Material',
            path: '/upload',
            icon: 'fas fa-arrow-up text-pink'
          }"/>
        </div>
        <b-dropdown-divider/>
        <sidebar-item
        :link="{
          name: 'Home',
          path: '/home',
          icon: 'fas fa-home text-primary',
        }"/>
        <div @click="redirect">
          <sidebar-item
          :link="{
            name: 'Ask an Expert',
            path: '/ask',
            icon: 'fas fa-glasses text-red'
          }"/>
        </div>
        <div @click="redirect">
          <sidebar-item
          :link="{
            name: 'My Projects',
            path: '/projects',
            icon: 'fas fa-project-diagram text-green'
          }"/>
        </div>
        <div @click="redirect">
          <sidebar-item
          :link="{
            name: 'My Collections',
            path: '/collections',
            icon: 'fas fa-layer-group text-orange'
          }"/>
        </div>
        <div @click="toPaypal">
          <sidebar-item
          :link="{
            name: 'Donate',
            path: '/',
            icon: 'fas fa-donate',
          }"/>
        </div>
        <div>
          <sidebar-item :link="{
            name: 'Download',
            path: '/download',
            icon: 'fas fa-file-download',
          }"/>
        </div>
      </template>
    </side-bar>
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
  import { Auth } from 'aws-amplify';
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
  data() {
    return {
      signedIn: false
    };
  },
  created() {
    if(this.$store.state.signedIn)
    {
      this.signedIn = true;
    }
  },
    methods: {
      initScrollbar() {
        let isWindows = navigator.platform.startsWith('Win');
        if (isWindows) {
          initScrollbar('sidenav');
        }
      },
      redirect() {
        if(this.$store.state.signedIn === false)
        {
          this.$router.push('login');
        }
      },
      toPaypal() {
        window.open("https://www.paypal.com/donate?hosted_button_id=A2S4AUZ8RTDYS", "_blank");
      },
    },
    mounted() {
      this.initScrollbar();
    },
  };
</script>
<style lang="scss">
</style>
