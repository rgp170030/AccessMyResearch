<template>
  <div v-if="dataloaded">
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
        style="min-height: 600px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-primary opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center">
          <b-row >
            <b-col lg="7" md="10">
              <h1 class="display-2 text-white">Hello {{ user.firstName }}</h1>
              <p class="text-white mt-0 mb-5">This is your profile page. Here, you can edit what people see on your profile. Add some of your hobbies and interests to stand out.</p>
              <a href="#!" class="btn btn-info">Edit profile</a>
              <b-button type="submit" variant="primary" class="btn btn-info" to="interests">Edit Fields of Interest</b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row>
        <b-col xl="4" class="order-xl-2 mb-5">
          <user-card></user-card>
        </b-col>
        <b-col xl="8" class="order-xl-1">
          <edit-profile-form></edit-profile-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  import EditProfileForm from './UserProfile/EditProfileForm.vue';
  import UserCard from './UserProfile/UserCard.vue';
  import { Auth } from 'aws-amplify';

  export default {
    components: {
      EditProfileForm,
      UserCard
    },
    data() {
      return {
        dataloaded: false,
        signedIn: false,
        data: '',
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
      };
    },
    async created() {
      await this.getUserData();
      if(this.$store.state.signedIn)
      {
        this.signedIn = true;
      }
    },
    methods: {
      getUserData() {
        Auth.currentAuthenticatedUser().then((value) => {
        var values = value.storage;


        for (const [key, value] of Object.entries(values)) {
          if(value.substring(0, 15) == "{\"UserAttribute")
          {
            this.data = value;
            break ;
          }
        }

        var obj = JSON.parse(this.data);

        for(const [key, value] of Object.entries(obj.UserAttributes))
        {
          if(value.Name == "custom:first_name")
          {
            this.user.firstName = value.Value;
            this.dataloaded = true;
          }
        }
      });
      }
    }
  };
</script>