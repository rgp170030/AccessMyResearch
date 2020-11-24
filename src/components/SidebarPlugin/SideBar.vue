<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
        <div class="container-fluid">
            <!--Toggler-->
            <navbar-toggle-button @click.native="showSidebar">
            </navbar-toggle-button>
            <router-link class="navbar-brand" to="/">
                <img :src="logo" class="navbar-brand-img" alt="...">
            </router-link>
            <slot name="mobile-right">
                <ul class="nav align-items-center d-md-none">
                    <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
                        <a slot="title-container" class="nav-link nav-link-icon" href="#" role="button"
                           aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-bell"></i>
                        </a>
                        <a class="dropdown-item" to="/notifications"> <!--TODO: Link to notification-->
                          <i class="fas fa-book-open"></i>
                          New Article by: Mehmet Günal
                          <small class="form-text text-muted">Yesterday</small>
                        </a>
                        <a class="dropdown-item" to="/notifications">
                          <i class="fas fa-user-friends"></i>
                          New friend: Mehmet Günal
                          <small class="form-text text-muted">1 week ago</small>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" to="/notifications">
                          <i class="fas fa-clock"></i>
                          All Notifications
                        </a>
                    </base-dropdown>
                          <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
                            <a slot="title-container" class="nav-link nav-link-icon" href="#" role="button"
                                aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-comment"></i>
                            </a>
                            <a class="dropdown-item" to="/messages"> <!-- TODO: Link to Messages-->
                              <i class="fas fa-comment"></i>
                              Mehmet Günal: Check out my research!
                              <small class="form-text text-muted">Yesterday</small>
                            </a>
                            <a class="dropdown-item" to="/messages">
                              <i class="far fa-comment"></i>
                              Greg Kitchen: Check out his research!
                              <small class="form-text text-muted">1 week ago</small>
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" to="/messages">
                              <i class="fas fa-clock"></i>
                              All Messages
                            </a>
                          </base-dropdown>
                    <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
                        <a slot="title-container" class="nav-link" href="#" role="button">
                            <div class="media align-items-center">
                              <span class="avatar avatar-sm rounded-circle">
                                <img alt="Image placeholder" src="img/theme/team-4.jpg"> <!--TODO: Show profile pic-->
                              </span>
                            </div>
                        </a>
                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Welcome!</h6>
                        </div>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="fas fa-user"></i>
                            <span>My profile</span>
                        </router-link>
                        <router-link to="/activity" class="dropdown-item">
                            <i class="far fa-calendar-alt"></i>
                            <span>Activity</span>
                        </router-link>
                        <router-link to="/settings" class="dropdown-item">
                            <i class="fas fa-cog"></i>
                            <span>Settings</span>
                        </router-link>
                        <router-link to="/donate" class="dropdown-item">
                            <i class="fas fa-donate"></i>
                            <span>Donate</span>
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <a to="/login" class="dropdown-item">
                            <i class="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </a>
                    </base-dropdown>
                </ul>
            </slot>
            <slot></slot>
            <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show" id="sidenav-collapse-main">

                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                                <img :src="logo">
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
                        </div>
                    </div>
                </div>
                <ul class="navbar-nav">
                    <slot name="links">
                    </slot>
                </ul>
            </div>
            </div>
    </nav>
</template>
<script>
  import NavbarToggleButton from '@/components/NavbarToggleButton'

  export default {
    name: 'sidebar',
    components: {
      NavbarToggleButton
    },
    props: {
      logo: {
        type: String,
        default: '/img/brand/orange.png',
        description: 'Access My Research Logo'
      },
      autoClose: {
        type: Boolean,
        default: true,
        description: 'Whether sidebar should autoclose on mobile when clicking an item'
      }
    },
    provide() {
      return {
        autoClose: this.autoClose
      };
    },
    methods: {
      closeSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      showSidebar() {
        this.$sidebar.displaySidebar(true)
      }
    },
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false;
      }
    }
  };
</script>
