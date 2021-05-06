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
                                <div class="text-center text-muted mb-1 md-0">
                                  <small>Sign in with</small>
                                  </div>
                                            <div class="btn-wrapper text-center" >
                                                <a href="#" class="btn btn-neutral btn-icon" @click="linkedInSignIn">
                                                <span class="btn-inner--icon"><img src="img/SSO/linkedin.svg"></span>
                                                <span class="btn-inner--text">LinkedIn</span>
                                                </a>
                                                <a href="#" class="btn btn-neutral btn-icon" @click="googleSignIn">
                                                <span class="btn-inner--icon"><img src="img/SSO/google.svg"></span>
                                                <span class="btn-inner--text">Google</span>
                                                </a>
                                                <div class="form-group">
                                                <a href="#" class="btn btn-neutral btn-icon" @click="facebookSignIn">
                                                <span class="btn-inner--icon"><img src="img/SSO/facebook.svg"></span>
                                                <span class="btn-inner--text">Facebook</span>
                                                </a>
                                                <a href="#" class="btn btn-neutral btn-icon">
                                                <span class="btn-inner--icon"><img src="img/SSO/orcid.svg"></span>
                                                <span class="btn-inner--text">ORCID</span>
                                                </a>
                                                </div>
                                            </div>
                                </div>

<div class="card-body">
                    <div class="form-group">
              <b-card-body class="px-lg-5 py-lg-2">
              <div class="text-center text-muted mb-1 md-0">
                <small>Or signup with us</small>
              </div>
              </b-card-body>
              
              <b-card-body class="px-lg-0 py-lg-2">
                <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                  <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                    <base-input alternative
                            class="mb-3"
                            name="Username"
                            :rules="{required: true}"
                            prepend-icon="fas fa-user"
                            placeholder="Username"
                            v-model="username">
                    </base-input>
                    <base-input alternative
                              class="mb-3"
                              prepend-icon="fas fa-envelope"
                              placeholder="Email"
                              name="Email"
                              :rules="{required: true, email: true}"
                              v-model="email">
                    </base-input>
                 <base-input alternative
                              class="mb-3"
                              prepend-icon="fas fa-lock-open"
                              placeholder="Password"
                              type="password"
                              name="Password"
                              :rules="{required: true, min: 6}"
                              v-model="password">
                  </base-input>
                 

                  
                  
                    <div class = "mb-4"> 
                    <b-form-checkbox v-model="rememberMe">Remember me</b-form-checkbox> </div>
                     <div class = "custom-control custom-checkbox checkbox-lg">
                <input type="checkbox" class="custom-control-input" id="checkbox-2" v-model="subscription" checked="">
                <label class="custom-control-label" for="checkbox-2">Would you like to subscribe to AMR Newsletter?</label>
               </div>
                    <div class="text-center mb--6">
                      <base-button type="primary" native-type="submit" class="my-4">Sign up</base-button>
                    </div>
                     <div class="mb--6">
                     </div>
                  </b-form>
                </validation-observer>
              
            </b-card-body>
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
                        <!--/card-block-->
                    </div>
                    <!-- /form card login -->

              



</template>

<script>
  import { AmplifyEventBus } from 'aws-amplify-vue';
  import { Auth } from 'aws-amplify';

  export default {
    mounted(){

      if(this.$store.state.signedIn === true)
      {
          this.$router.push('home');
      }

      AmplifyEventBus.$on('authState', info => {
        if(info == 'signedIn')
        {
          this.$router.push('home');
        }
      })
    },
    data() {
      return {
          username: '',
          email: '',
          password: '',
          agree: false
      }
    },
    name: 'register',
    components: {},
    methods: {
      onSubmit() {
        //if username provided does not exist in Cognito User Pool, then register the user
          Auth.signUp({
                username: this.username,
                password: this.password,
                attributes: {
                    email: this.email
                },
                validationData: [],  //optional
                })
                .then(data => {
                    this.user = data.user
                    this.$router.push('welcome'); //once registered, push to interests page
                  })
                .catch(err => console.log(err));
      },
      googleSignIn() {
        //can also be registered through Google
        Auth.federatedSignIn({ provider: 'Google' });
      },
      facebookSignIn() {
        //can also be registered through Facebook
        Auth.federatedSignIn({ provider: 'Facebook' });
      },
      linkedInSignIn() {
        //can also be registered through LinkedIn
        Auth.federatedSignIn({ provider: 'LinkedIn' });
      },
    }
  };
</script>