<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top navbar-expand"
    :class="{'navbar-dark': type === 'default'}"
  >
    <a href="#" aria-current="page" class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block active router-link-active"> {{$route.name}} </a>
    <!-- Navbar links -->
    <b-navbar-nav class="align-items-center ml-auto">
      <b-form class="navbar-search form-inline mr-sm-3"
            :class="{'navbar-search-dark': type === 'default', 'navbar-search-light': type === 'light'}"
            id="navbar-search-main">
        <b-form-group class="mb-0">
          <b-input-group class="input-group-alternative input-group-merge">
            <div class="input-group-append">
              <span class="input-group-text"><i class="fas fa-search"></i></span>
            </div>
            <!-- <b-form-input placeholder="Search by Keyword or Author" type="text"> </b-form-input>-->
            <b-form-input
              @input="search_text()"
              v-model="search.text"
              type="text"
              placeholder="Search by Keyword or Author"
            ></b-form-input>
          <!-- start here  -->
          <div class="SearchDropDown">
            <b-dropdown variant="Primary" right text="">
            <b-dropdown-group header="Sort By" class="small">
              <b-dropdown-divider></b-dropdown-divider>
                <b-form-select @input="sort()" v-model="selectedSortBy" :options="sortBy"></b-form-select>
              </b-dropdown-group>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-group header="Area" class="small">
              <b-dropdown-divider></b-dropdown-divider>
                <b-form-checkbox-group
                  id="areaFilter"
                  v-model="selectedAreas"
                  :options="areas"
                  name="area"
                ></b-form-checkbox-group>
                <!-- <div>Selected: <strong>{{ selectedAreas }}</strong></div>   -->
              </b-dropdown-group>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-group header="Expertise" class="small">
              <b-dropdown-divider></b-dropdown-divider>
                <b-form-checkbox-group
                  id="expertiseFilter"
                  v-model="selectedExpertise"
                  :options="expertise"
                  name="expertise"
                ></b-form-checkbox-group>
              </b-dropdown-group>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-group header="View Count" class="small">
              <b-dropdown-divider></b-dropdown-divider>
                <b-form-checkbox-group
                  id="viewCountFilter"
                  v-model="selectedViewCount"
                  :options="viewCount"
                  name="viewcount"
                ></b-form-checkbox-group>
              </b-dropdown-group>
            </b-dropdown>
          </div>
          <!-- end here -->
          </b-input-group>
        </b-form-group>
      </b-form>
      <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
        <a slot="title-container" class="nav-link nav-link-icon" href="#" role="button"
            aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-bell"></i>
        </a>
        <a class="dropdown-item" to="/notifications"> <!-- TODO: Link to Notification-->
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
      <base-dropdown menu-on-right
                     class="nav-item"
                     tag="li"
                     title-tag="a"
                     title-classes="nav-link pr-0">
        <a href="#" class="nav-link pr-0" @click.prevent slot="title-container">
          <b-media no-body class="align-items-center">
                  <span class="avatar avatar-sm rounded-circle">
                    <img alt="Image placeholder" src="img/theme/team-4.jpg"> <!--TODO: Show profile pic-->
                  </span>
          </b-media>
        </a>

        <template>
          <b-dropdown-header class="noti-title">
            <h6 class="text-overflow m-0">Welcome!</h6>
          </b-dropdown-header>
          <b-dropdown-item to="/profile">
            <i class="fas fa-user"></i>
            <span>My profile</span>
          </b-dropdown-item>
          <b-dropdown-item to="/activity">
            <i class="far fa-calendar-alt"></i>
            <span>Activity</span>
          </b-dropdown-item>
          <div class="dropdown-divider"></div>
          <b-dropdown-item to="/settings">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
          </b-dropdown-item>
          <b-dropdown-item to="/donate">
            <i class="fas fa-donate"></i>
            <span>Donate</span>
          </b-dropdown-item>
          <b-dropdown-item to="/login">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </b-dropdown-item>
        </template>
      </base-dropdown>
    </b-navbar-nav>
  </base-nav>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions';
import { BaseNav, Modal } from '@/components';

export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal
  },
  props: {
    type: {
      type: String,
      default: 'default', // default|light
      description: 'Look of the dashboard navbar. Default (Green) or light (gray)'
    }
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  mounted() {
    this.hover_flag = false;
    var inside = this;
    axios
      .get("https://www.mocky.io/v2/5c7b98562f0000c013e59f07")
      .then(function(response) {
        //console.log(response);
    inside.wonders_data_actual = response.data.data;
    response.data.data.map(function(wonder) {
      inside.likes.count += wonder.likes;
    });
    inside.wonders_data_actual = inside.wonders_data_actual.map(function(
          wonder
        ) {
          wonder.active_like = false;
          return wonder;
        });
        inside.wonders_data = response.data.data;
      })
      .catch(function(error) {
        // console.log(error);
      });
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: '',
      results_data_actual: [],
      results_data: [],
      search: { filter: null, text: "" },
      selectedSortBy: "most-recent",
      sortBy: [
        { text: 'Most Recent', value: 'most-recent'},
        { text: 'Most Cited', value: 'most-cited'},
        { text: 'Most Discussed', value: 'most-discussed'},
        { text: 'Most Rated', value: 'most-rated'},
        { text: 'Highest Rated', value: 'highest-rated'},
        { text: 'Trending', value: 'trending'},
        { text: 'Expertise', value: 'expertise'}
      ],
      selectedAreas: [],
      areas: [
        { text: 'Computer Science', value: 'cs'},
        { text: 'Electrical Engineering', value: 'ee'},
        { text: 'Neuroscience', value: 'ns'}
      ],
      selectedExpertise: [],
      expertise: [
        { text: 'Anyone', value: 'any'},
        { text: '1-5 Peer Review Publications', value: '1-5'},
        { text: '5-20 Peer Review Publications', value: '5-20'},
        { text: '20-100 Peer Review Publications', value: '20-100'},
        { text: '100+ Peer Review Publications', value: '100+'}
      ],
      selectedViewCount: [],
      viewCount: [
        { text: 'Any view count', value: 'anyCount'},
        { text: '1-100 views', value: '1-100'},
        { text: '100-500 views', value: '100-500'},
        { text: '500-1000 views', value: '500-1000'},
        { text: '1000+ views', value: '1000+'}
      ]
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    sort() {
      //make a if-statement for the Sort By filter. 
      //console.log(this.search.filter);
      //this.search.filter == "b"
      //  ? this.results_data.sort(function(a, b) {
      //      return b.likes - a.likes;
      //    })
      //  : this.results_data.sort(function(a, b) {
      //      return b.ratings - a.ratings;
      //    });
    },
    search_text() {
      //console.log(this.search.text);
      var inside = this;
      this.results_data = this.results_data_actual.filter(function(results) {
        if (
          results.place //https://www.freecodecamp.org/news/how-to-set-up-responsive-ui-search-in-vue-js-bf6007b7fc0f/
            .toLowerCase()
            .indexOf(inside.search.text.toLowerCase()) != "-1"
        ) {
          return AMR;
        }
      });
    }
  }
};
</script>
