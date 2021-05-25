import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signedIn: false,
    isAdmin: false,
    isExpert: false,
    username: "",
    user: {
      company: 'AccessMyResearch',
      username: '',
      email: '',


      firstName: '',
      lastName: '',
      education: '',
      city: '',
      country: '',
      state: '',
      aboutMe: '',
      expertise: '',
      university: '',
    },
    requests: [],
    follows: [],
    articles: [],
    search: {
      query: '',
      totalResults: 0,
      resultsPerPage: 25,
      timeElapsed: 0,
      pageNum: 1,
      filters: {
        databases: [],
        minYear: -1,
        maxYear: -1,
      },
    },
  },
  mutations: {

  },
  actions: {

  }
})