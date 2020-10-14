<template>
  <b-card no-body class="card-profile" alt="Image placeholder" img-top>
    <b-row class="justify-content-center">
      <b-col lg="3" class="order-lg-2">
        <div class="card-profile-image">
          <a href="#">
            <b-img src="img/theme/team-4.jpg" rounded="circle" />
          </a>
        </div>
      </b-col>
    </b-row>

    <b-card-header class="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
      <div class="d-flex justify-content-between">
        <a href="#" class="btn btn-sm btn-info mr-4">Connect</a>
        <a href="#" class="btn btn-sm btn-default float-right">Message</a>
      </div>
      <UserActionDropdown></UserActionDropdown>
    </b-card-header>

    <b-card-body class="pt-0">
      <b-row>
        <b-col >
          <div class="card-profile-stats d-flex justify-content-center mt-md-5">
            <div>
              <span class="heading">3</span>
              <span class="description">Articles</span>
            </div>
            <div>
              <span class="heading">41</span>
              <span class="description">Friends</span>
            </div>
            <div>
              <span class="heading">89</span>
              <span class="description">Comments</span>
            </div>
          </div>
        </b-col>
      </b-row>
      <div class="text-center">
        <h5 class="h3">
          Jesse Jones<span class="font-weight-light">, PhD</span>
        </h5>
        <div class="h5 font-weight-300">
          <i class="ni location_pin mr-2"></i>Richardson, TX, United States
        </div>
        <div class="h5 mt-4">
          <i class="ni business_briefcase-24 mr-2"></i>Doctorate of Computer Science
        </div>
        <div>
          <i class="ni education_hat text-white mr-2"></i>University of Texas at Dallas
        </div>
        <hr class="my-4">
        <p>I am very interested in artificial intelligence and machine learning</p>
        <a href="#">Show more</a>

      </div>
    </b-card-body>
  </b-card>
</template>
<script>
import UserActionDropdown from "./UserActionsDropdown.vue";

export default {
  components:{
    UserActionDropdown
  }
};
</script>

<style>
</style>