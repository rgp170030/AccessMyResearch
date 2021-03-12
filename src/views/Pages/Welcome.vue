<template>
  <div>
    <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9"> <!-- format for the header !-->
      <b-container>
        <div class="header-body text-center mb-7"> <!-- formats the page !-->
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Thanks for creating a AccessMyResearch account</h1> <!-- text is displayed in the center as white !-->
              <p class="text-lead text-white">You're almost done!</p>
              <p class="text-lead text-white">Please check your inbox and click the "Verfiy Email" link to validate your email address</p>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </div>
  </div>
</template>

<!-- script with the name of the welcome file !-->
<script>
  import { Auth } from 'aws-amplify';
  import { AmplifyEventBus } from 'aws-amplify-vue';

  export default {
    name: 'welcome', 
    data() {
      return {
      }
    }
  }
</script>
