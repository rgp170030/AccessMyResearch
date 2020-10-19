<template>
<card>
  <b-row align-v="center" slot="header" >
    <b-col cols="8">
      <h3 class="mb-0">Edit profile </h3>
    </b-col>
    <b-col cols="4" class="text-right">
      <a href="#!" class="btn btn-sm btn-primary">Settings</a>
    </b-col>
  </b-row>

  <b-form @submit.prevent="updateProfile">
    <h6 class="heading-small text-muted mb-4">User information</h6>

    <div class="pl-lg-4">
      <b-row>
        <b-col lg="6">
          <base-input
            type="text"
            label="Username"
            placeholder="Jesse_Jones2"
            v-model="user.username"
            disabled
          >
          </base-input>
        </b-col>
        <b-col lg="6">
          <base-input
            type="email"
            label="Email address"
            placeholder="example@email.com"
            v-model="user.email"
          >
          </base-input>
        </b-col>
      </b-row>
      <b-row >
        <b-col lg="6">
          <base-input
            type="text"
            label="First Name"
            placeholder="First Name"
            v-model="user.firstName"
          >
          </base-input>
        </b-col>
        <b-col lg="6">
          <base-input
            type="text"
            label="Last Name"
            placeholder="Last Name"
            v-model="user.lastName"
          >
          </base-input>
        </b-col>
      </b-row>
    </div>
    <hr class="my-4">

    <!-- Address -->
    <h6 class="heading-small text-muted mb-4">Contact information</h6>

    <div class="pl-lg-4">
      <b-row>
        <b-col md="12">
          <base-input
            type="text"
            label="Address"
            placeholder="Home Address"
            v-model="user.address"
          >
          </base-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4">
          <base-input
            type="text"
            label="City"
            placeholder="City"
            v-model="user.city"
          >
          </base-input>
        </b-col>
        <b-col lg="4">
          <base-input
            type="text"
            label="Country"
            placeholder="Country"
            v-model="user.country"
          >
          </base-input>
        </b-col>
        <b-col lg="4">
          <base-input
            label="Postal Code"
            placeholder="ZIP Code"
            v-model="user.postalCode"
          >
          </base-input>
        </b-col>
      </b-row>
    </div>

    <hr class="my-4">
    <!-- Description -->
    <h6 class="heading-small text-muted mb-4">Overview</h6>
    <div class="pl-lg-4">
      <b-form-group label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
        <!--  <label class="form-control-label">About Me</label> -->
        <b-form-textarea rows="4" value="A few words about you." id="about-form-textaria" placeholder="A few words about you"></b-form-textarea>
      </b-form-group>
    </div>


    <hr class="my-4">
    <!-- Description -->
    <h6 class="heading-small text-muted mb-4">Education</h6>
    <div class="pl-lg-4">
      <b-form-group label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
        <!--  <label class="form-control-label">About Me</label> -->
        <b-form-textarea rows="4" value="Your past and current education." id="about-form-textaria" placeholder="A few words about you"></b-form-textarea>
      </b-form-group>
    </div>

    <hr class="my-4">
    <!-- Description -->
    <h6 class="heading-small text-muted mb-4">Statistic</h6>
    <div class="pl-lg-4">
      <b-form-group label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
        <!--  <label class="form-control-label">About Me</label> -->
        <b-form-textarea rows="4" value="Some helpful statistic." id="about-form-textaria" placeholder="A few words about you"></b-form-textarea>
      </b-form-group>
    </div>

    <hr class="my-4">
    <!-- Description -->
    <h6 class="heading-small text-muted mb-4">Grant Information</h6>
    <div class="pl-lg-4">
      <b-form-group label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
        <!--  <label class="form-control-label">About Me</label> -->
        <b-form-textarea rows="4" value="Information about your grants." id="about-form-textaria" placeholder="A few words about you"></b-form-textarea>
      </b-form-group>
    </div>


    <hr class="my-4">
    <!-- Description -->
    <h6 class="heading-small text-muted mb-4">Publication</h6>
    <div class="pl-lg-4">
      <b-form-group label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
        <!--  <label class="form-control-label">About Me</label> -->
        <b-form-textarea rows="4" value="What you have published so far." id="about-form-textaria" placeholder="A few words about you"></b-form-textarea>
      </b-form-group>
    </div>

  </b-form>
</card>
</template>
<script>
export default {
  data() {
    return {
      user: {
        company: 'Access My Research',
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: 'Richardson',
        country: 'United States',
        postalCode: '',
        aboutMe: ``
      }
    };
  },
  methods: {
    updateProfile() {
      alert('Your data: ' + JSON.stringify(this.user)); //TODO: Remove test alert
    }
  }
};
</script>