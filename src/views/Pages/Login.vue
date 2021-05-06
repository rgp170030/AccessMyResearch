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
                <small>Or sign in with us</small>
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
                                name="Password"
                                :rules="{required: true, min: 6}"
                                prepend-icon="fas fa-lock-open"
                                type="password"
                                placeholder="Password"
                                v-model="password">
                    </base-input>
                  

                    <b-form-checkbox v-model="rememberMe">Remember me</b-form-checkbox>
                    <div class="text-center mb--6">
                      <base-button type="primary" native-type="submit" class="my-4">Sign in</base-button>
                    </div>
                     <div class="mb--6">
                     </div>
                  </b-form>
                </validation-observer>
              
            </b-card-body>
                    </div>
</div>
   </form>
 <b-row class="mt-3 mb--1">
            <b-col cols="6">
              <router-link to="/forgotpassword" class="text-light"><small>Forgot password?</small></router-link>
            </b-col><!--TODO: Make forgot password-->
            <b-col cols="6" class="text-right">
            <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
            </b-col>
 </b-row>
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

              



<!--/container-->
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import { Auth } from 'aws-amplify';
import { AmplifyEventBus } from 'aws-amplify-vue';

export default {
      name: 'login',
    data() {
      return {
        username: '',
        password: '',
        rememberMe: false
      }
    },
    created() {
      this.$forceUpdate();
      this.findUser();

      if(this.$store.state.signedIn)
      {
          this.$router.push('home');
      }

      AmplifyEventBus.$on('authState', info => {
          //check if there is a logged in user. if yes, change store signedIn property to true.
        if(info === 'signedIn') {
          this.findUser();
        } else {
          this.$store.state.signedIn = false;
          this.$store.state.user = null;
        }
      });
    },
    computed: {
      signedIn(){
        return this.$store.state.signedIn;
      }
    },
    methods: {
      onSubmit() {
        //if username, password provided exists in Cognito User Pool, then log the user in -- set store property signedIn to true and user to current user
        Auth.signIn(this.username, this.password).then(user => {
            this.$store.state.signedIn = !!user;
            this.$store.state.user = user;
            this.$router.push('home'); //render homepage
          })
          .catch(err => console.log(err));
      },
      googleSignIn() {
        //redirects to the Google sign in to login to the webpage thru Google
        Auth.federatedSignIn({ provider: 'Google' });
      },
      facebookSignIn() {
        //redirects to the Facebook sign in to login to the webpage thru Facebook
        Auth.federatedSignIn({ provider: 'Facebook' });
      },
      linkedInSignIn() {
        //redirects to the LinkedIn sign in to login to the webpage thru LinkedIn
        Auth.federatedSignIn({ provider: 'LinkedIn' });
      },
      async findUser() 
      {
        try {
          //check if there is a logged in user. if yes, change store signedIn property to true.
          const user = await Auth.currentAuthenticatedUser();
          this.$store.state.signedIn = true;
          this.$store.state.user = user;
        }
        catch(err){
          this.$store.state.signedIn = false;
          this.$store.state.user = null;
        }
      }
    }
  };
  
     
</script>

