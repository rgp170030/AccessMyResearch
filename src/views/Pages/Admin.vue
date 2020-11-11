<template>
    <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary" ></base-header>
    <AdminUser 
      v-for="user in users" 
      :key="user.username" 
      v-model="user.roles"
      :username="user.username"
      :options="roles"
    >
    </AdminUser>
    </div>
  
</template>

<script>
import { Auth, AuthHelperAxios, AuthHelperRoles } from "@/util/auth-helper.js";
import axios from "axios";
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
    mounted: function(){
        this.loadUsers();
    },
    methods: {
        loadUsers: async function(){
            let options = {};
            await AuthHelperAxios.attachAuthenticationHeader(options);

            axios.get(this.$endpoints.aspnet + "api/admin/users", options)
              .then(res => {
                    let data = res.data;
                    let users = [];

                    for(let i=0;i<data.users.length;i++){
                        users.push({
                            username: data.users[i].username,
                            roles: []
                        })
                    }

                    this.users = users;
              })
              .catch(console.log);
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>