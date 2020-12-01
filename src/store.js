import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    signedIn: false,
    username: "",
    user: {
      company: 'Access My Research',
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
      university: ''
    },
  },
  mutations: {

  },
  actions: {

  }
})