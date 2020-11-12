<template>
  <div>
    <base-header
      class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"
    ></base-header>
    <!--<AdminUser 
      v-for="user in users" 
      :key="user.username" 
      v-model="user.roles"
      :username="user.username"
      :options="roles"
    >
    </AdminUser>-->
    <div class="col-lg mx-auto form p-4">
      <el-table :data="users">
        <el-table-column prop="username" label="username" sortable>
        </el-table-column>        
        <el-table-column prop="roles" label="roles" sortable>
          <template v-slot="{ row }">
            <b-icon icon="eye-fill" font-scale="2"  @click="getRole( row );">
            </b-icon>
          </template>
        </el-table-column>
        <el-table-column prop="" label="" width="135">
          <b-icon icon="trash-fill" font-scale="2" v-b-modal.deleteUserModal>
          </b-icon>
        </el-table-column>
      </el-table>
     
      <b-modal
        v-model="showRole"
        id="userRoleModal"
        :title=" currentUser.username "
        ok-title="Confirm"
        @ok="say('Role Changed')"
      >
        Role:
        <multiselect
        :value="currentUser.groups"
        :options="roles"
        >
        </multiselect>
      </b-modal>
      
      <b-modal
        id="deleteUserModal"
        title="Delete user"
        @ok="say('user deleted')"
        ok-title="Delete"
      >
        Are you sure you want to delete x?</b-modal
      >
    </div>
  </div>
</template>

<script>
import { Auth, AuthHelperAxios, AuthHelperRoles } from "@/util/auth-helper.js";
import axios from "axios";
import AdminUser from "@/components/AdminUser.vue";
import { Table, TableColumn, Input } from "element-ui";
import Multiselect from "vue-multiselect";

export default {
  components: {
    AdminUser,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    Multiselect,
    [Input.name]: Input,
  },
  data: function () {
    return {
      users: [
        {
          username: "samuelb",
        },
        {
          username: "testuser",
        },
      ],
      currentUser:
        {
        },
      roles: AuthHelperRoles.userRoles,
      showRole: false,
    };
  },
  mounted: function () {
    this.loadUsers();
  },
  methods: {
    loadUsers: async function () {
      let options = {};
      await AuthHelperAxios.attachAuthenticationHeader(options);

      axios
        .get(this.$endpoints.aspnet + "api/admin/users", options)
        .then((res) => {
          let data = res.data;
          let users = [];

          for (let i = 0; i < data.users.length; i++) {
            users.push({
              username: data.users[i].username,
              roles: [],
            });
          }

          this.users = users;
        })
        .catch(console.log);
    },
    say: function (message) {
      alert(message);
    },
    getRole: function (username) {
      axios
        .get(this.$endpoints.aspnet + "api/admin/get-user", username)
        .then((res) => {
          this.currentUser=res.data;
          this.showRole=true;
          
        })
        .catch(console.log);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
</style>