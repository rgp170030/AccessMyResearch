<template>
  <div class="login-modal" > 
        
         <!-- <base-header class="pb-5 pt-md-3 bg-gradient-primary"></base-header> 
        <b-container fluid class="mt-4"> </b-container> -->
  
<div class="container">
    <div class="row">
        <div class="col-md-12 min-vh-100 d-flex flex-column justify-content-center">
            <div class="row">
                <div class="col-lg-5.5 col-md-0 mx-auto">

                    <!-- form card login -->
                    <div class="card rounded shadow shadow-sm">
                        <div class="card-header">
                            <form class="form" role="form" autocomplete="off" id="formLogin" novalidate="" method="POST">
                                <div class="form-group">
                                <div class="text-center text mb-1 md-0">
                                 <h1 class="text">Thank you for creating an AccessMyResearch account!</h1> <!-- text is displayed in the center as white !-->
                                 <p class="text-lead text">You're almost done.</p>
                                 <p class="text-lead text">Please check your inbox and click the "Verfiy Email" link to validate your email address.</p>
                                  </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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