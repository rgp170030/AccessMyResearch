<template>
    <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary" ></base-header>
    <AdminUser 
      v-for="(user) in users" 
      :key="user.username" 
      v-model="user.roles"
      :username="user.username"
      :options="roles"
    >
    </AdminUser>
    </div>
  
</template>

<script>
import { Auth, AuthHelperRoles } from "@/util/auth-helper.js";
import AdminUser from '@/components/AdminUser.vue';

export default {
    components: {
        AdminUser      
    },
    data: function(){
        return {
            users: [
                {
                    username: "samuelb",
                    roles: ["Administrator"],
                },
                {
                    username: "testuser",
                    roles: ["Expert"]
                }
            ],
            roles: AuthHelperRoles.userRoles
        };
    },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>