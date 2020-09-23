<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <sidebar-item
                  :link="{
                    name: 'Upload Article',
                    path: '/upload',
                    icon: 'ni ni-fat-add text-pink'
                  }">
        </sidebar-item>

        <b-dropdown-divider> </b-dropdown-divider>

        <sidebar-item
          :link="{
            name: 'Home',
            path: '/home',
            icon: 'fas fa-home text-primary',
          }"
        >
        </sidebar-item>

        <sidebar-item
            :link="{
              name: 'Ask an Expert',
              path: '/ask',
              icon: 'ni ni-paper-diploma text-purple'
              }"
            >
        </sidebar-item>

        <sidebar-item
              :link="{
                name: 'My Collections',
                path: '/collections',
                icon: 'ni ni-books text-orange'
                }">
        </sidebar-item>

        <sidebar-item
                  :link="{
                    name: 'Messages',
                    path: '/messages',
                    icon: 'ni ni-chat-round text-green'
                  }">
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
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

  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import DashboardContent from './Content.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      DashboardContent,
      FadeTransition
    },
    methods: {
      initScrollbar() {
        let isWindows = navigator.platform.startsWith('Win');
        if (isWindows) {
          initScrollbar('sidenav');
        }
      }
    },
    mounted() {
      this.initScrollbar()
    }
  };
</script>
<style lang="scss">
</style>