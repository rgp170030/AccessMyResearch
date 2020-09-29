<template>
<base-nav container-classes="container-fluid" class="navbar-top navbar-expand" :class="{'navbar-dark': type === 'default'}">
    <a href="#" aria-current="page" class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block active router-link-active"> {{$route.name}} </a>
    <!-- Navbar links -->
    <b-navbar-nav class="align-items-center ml-md-auto">
        <!-- This item dont have <b-nav-item> because item have data-action/data-target on tag <a>, wich we cant add -->
        <li class="nav-item d-sm-none">
            <a class="nav-link" href="#" data-action="search-show" data-target="#navbar-search-main">
                <i class="ni ni-zoom-split-in"></i>
            </a>
        </li>
    </b-navbar-nav>
    <b-navbar-nav class="align-items-center ml-auto ml-md-0">
        <b-form class="navbar-search form-inline mr-sm-3" :class="{'navbar-search-dark': type === 'default', 'navbar-search-light': type === 'light'}" id="navbar-search-main">
            <b-form-group class="mb-0">
                <b-input-group class="input-group-alternative input-group-merge">
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="fas fa-search"></i></span>
                    </div>
                    <b-form-input placeholder="Search by Keyword or Author" type="text"> </b-form-input>
                    <!-- start here  -->
                    <div class="SearchDropDown">
                        <b-dropdown variant="Primary" right text="">
                            <b-dropdown-group header="Sort By" class="small">
                                <b-dropdown-divider></b-dropdown-divider>
                                <b-form-select v-model="selectedSortBy" :options="sortBy"></b-form-select>
                            </b-dropdown-group>
                            <b-dropdown-divider></b-dropdown-divider>

                            <div class="accordion" role="tablist">
                                <b-card no-body class="mb-1">
                                    <b-card-header header-tag="header" class="p-1" role="tab">
                                        <b-button block v-b-toggle.areaAccordion variant="primary">Area</b-button>
                                    </b-card-header>
                                    <b-collapse id="areaAccordion" accordion="my-accordion" role="tabpanel">
                                        <b-card-body>
                                            <b-dropdown-group class="small">
                                                <b-form-checkbox-group id="areaFilter" v-model="selectedAreas" :options="areas" name="area"></b-form-checkbox-group>
                                                <!-- <div>Selected: <strong>{{ selectedAreas }}</strong></div>   -->
                                            </b-dropdown-group>
                                        </b-card-body>
                                    </b-collapse>
                                </b-card>
                            </div>

                            <div class="accordion" role="tablist">
                                <b-card no-body class="mb-1">
                                    <b-card-header header-tag="header" class="p-1" role="tab">
                                        <b-button block v-b-toggle.expertiseAccordion variant="primary">Expertise</b-button>
                                    </b-card-header>
                                    <b-collapse id="expertiseAccordion" accordion="my-accordion" role="tabpanel">
                                        <b-card-body>
                                            <b-dropdown-group class="small">
                                                <b-form-checkbox-group id="expertiseFilter" v-model="selectedExpertise" :options="expertise" name="expertise"></b-form-checkbox-group>
                                            </b-dropdown-group>
                                        </b-card-body>
                                    </b-collapse>
                                </b-card>
                            </div>

                            <div class="accordion" role="tablist">
                                <b-card no-body class="mb-1">
                                    <b-card-header header-tag="header" class="p-1" role="tab">
                                        <b-button block v-b-toggle.viewAccordion variant="primary">View Count</b-button>
                                    </b-card-header>
                                    <b-collapse id="viewAccordion" accordion="my-accordion" role="tabpanel">
                                        <b-card-body>
                                            <b-dropdown-group class="small">
                                                <b-form-checkbox-group id="viewCountFilter" v-model="selectedViewCount" :options="views" name="viewcount"></b-form-checkbox-group>
                                            </b-dropdown-group>
                                        </b-card-body>
                                    </b-collapse>
                                </b-card>
                            </div>
                        </b-dropdown>
                    </div>
                    <!-- end here -->
                </b-input-group>
            </b-form-group>
        </b-form>
        <base-dropdown menu-on-right class="nav-item" tag="li" title-tag="a" title-classes="nav-link pr-0">
            <a href="#" class="nav-link pr-0" @click.prevent slot="title-container">
                <b-media no-body class="align-items-center">
                    <span class="avatar avatar-sm rounded-circle">
                        <img alt="Image placeholder" src="img/theme/team-4.jpg">
                    </span>
                    <b-media-body class="ml-2 d-none d-lg-block">
                        <span class="mb-0 text-sm  font-weight-bold">Jesse Jones</span>
                    </b-media-body>
                </b-media>
            </a>

            <template>
                <b-dropdown-header class="noti-title">
                    <h6 class="text-overflow m-0">Welcome!</h6>
                </b-dropdown-header>
                <b-dropdown-item to="/profile">
                    <i class="ni ni-single-02"></i>
                    <span>My profile</span>
                </b-dropdown-item>
                <b-dropdown-item to="/notifications">
                    <i class="ni ni-bell-55"></i>
                    <span>Notifications</span>
                </b-dropdown-item>
                <b-dropdown-item to="/activity">
                    <i class="ni ni-calendar-grid-58"></i>
                    <span>Activity</span>
                </b-dropdown-item>
                <div class="dropdown-divider"></div>
                <b-dropdown-item to="/settings">
                    <i class="ni ni-settings-gear-65"></i>
                    <span>Settings</span>
                </b-dropdown-item>
                <b-dropdown-item to="/donate">
                    <i class="ni ni-satisfied"></i>
                    <span>Donate</span>
                </b-dropdown-item>
                <b-dropdown-item to="/login">
                    <i class="ni ni-user-run"></i>
                    <span>Logout</span>
                </b-dropdown-item>

            </template>
        </base-dropdown>
    </b-navbar-nav>
</base-nav>
</template>

<script>
import {
    CollapseTransition
} from 'vue2-transitions';
import {
    BaseNav,
    Modal
} from '@/components';

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
            const {
                name
            } = this.$route;
            return this.capitalizeFirstLetter(name);
        }
    },
    data() {
        return {
            activeNotifications: false,
            showMenu: false,
            searchModalVisible: false,
            searchQuery: '',
            selectedSortBy: "most-recent",
            sortBy: [{
                    text: 'Most Recent',
                    value: 'most-recent'
                },
                {
                    text: 'Most Cited',
                    value: 'most-cited'
                },
                {
                    text: 'Most Discussed',
                    value: 'most-discussed'
                },
                {
                    text: 'Most Rated',
                    value: 'most-rated'
                },
                {
                    text: 'Highest Rated',
                    value: 'highest-rated'
                },
                {
                    text: 'Trending',
                    value: 'trending'
                },
                {
                    text: 'Expertise',
                    value: 'expertise'
                }
            ],
            selectedAreas: [],
            areas: [{
                    text: 'Computer Science',
                    value: 'cs'
                },
                {
                    text: 'Electrical Engineering',
                    value: 'ee'
                },
                {
                    text: 'Neuroscience',
                    value: 'ns'
                }
            ],
            selectedExpertise: [],
            expertise: [{
                    text: 'Anyone',
                    value: 'any'
                },
                {
                    text: '1-5 Peer Review Publications',
                    value: '1-5'
                },
                {
                    text: '5-20 Peer Review Publications',
                    value: '5-20'
                },
                {
                    text: '20-100 Peer Review Publications',
                    value: '20-100'
                },
                {
                    text: '100+ Peer Review Publications',
                    value: '100+'
                }
            ],
            selectedViewCount: [],
            views: [{
                    text: 'Ascending',
                    value: 'ascend'
                },
                {
                    text: 'Descending',
                    value: 'descend'
                }

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
    }
};
</script>