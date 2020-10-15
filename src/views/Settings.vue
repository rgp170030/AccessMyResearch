<template>
    <div>
        <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"></base-header>
        <card class="min-vh-100 main_body center">
            <div class="row card text-black">
                <div class="col-lg mx-auto form p-4">
                    <b-tabs>
                        <ignored-users-tab></ignored-users-tab>
                    </b-tabs>
                    <button type="button" class="btn" @click="currentTabComponent ='Account'" >Acount</button>
                    <button type="button" class="btn" @click="currentTabComponent ='Privacy'" >Privacy</button>
                    <button  type=" button"  class="btn"  @click="currentTabComponent ='Display'" >Display </button>
                    <button   type=" button"  class="btn"  @click="currentTabComponent ='Payment'"  >Payment</button>
                    <button   type=" button"  class="btn"  @click="currentTabComponent ='Security'" >Security</button>
                    <button   type=" button"  class="btn"  @click="currentTabComponent ='Localization'">Localization </button>
                    <!--  <p> {{currentTabComponent}} </p> -->
                    <component v-bind:is ="currentTabComponent" ></component>
                    <!-- <p> This will be the settings page</p> -->
                </div>
            </div>
        </card>
    </div>
</template>
<!-- <template>
    <div>
        <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"></base-header>

        <b-tabs>
            <ignored-users-tab></ignored-users-tab>
        </b-tabs>

        <card class="min-vh-100 main_body center">
            <div class="row card text-black">
                <div class="col-lg mx-auto form p-4">
                    <p> This will be the settings page</p>
                </div>
            </div>
        </card>
    </div> 
</template> -->

<script>
import ManageIgnoredUsersTab from "@/components/Settings/ManageIgnoredUsersTab";
import Account from  './SettingsTabs/Account.vue';
import Privacy from  './SettingsTabs/Privacy.vue';
import Security from  './SettingsTabs/Security.vue';
import Display from   './SettingsTabs/Display.vue';
import Payment from   './SettingsTabs/Payment.vue';
import Localization from './SettingsTabs/Localization.vue';

export default {
    components:{
        ignoredUsersTab: ManageIgnoredUsersTab,
        'Account': Account,
        'Privacy': Privacy,
        'Security': Security,
        'Display': Display,
        'Payment': Payment,
        'Localization': Localization
    },
    data() {
        return {
            currentTabComponent:"Account"
        };
    }
}
</script>