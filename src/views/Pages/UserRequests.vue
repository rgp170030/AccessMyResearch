<template>
  <div>
    <base-header
      class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"
    ></base-header>

    <b-container fluid class="pb-4" id="suggested-people-container">
      <b-row no-gutters>
        <b-col cols="4" v-for="user in users" :key="user.username">
          <b-card
            tag="article"
            style="max-width: 20rem; max-height: 20rem;"
            class="mb-2 mr-3 ml-5 mt-5 mb-3 h-60 rounded-10"
          >
            <div class="text-right" v-if="user.usertype == 'expert'">
              <b-icon icon="star-fill" class="h2" variant="warning"></b-icon>
            </div>
            <div class="text-right" v-else>
              <b-icon icon="" class="h2" variant="warning"></b-icon>
            </div>

            <b-img
              left
              class="avatar avatar-lg rounded-circle"
              :src="user.imageurl"
              style="width: 80px; height: 80px;"
            ></b-img>
            <b-card-text class="text-right font-weight-bolder mr-2">
              {{ user.name }}

              <b-card-text class="text-dark">
                @{{ user.username }}
              </b-card-text>
            </b-card-text>

            <div class="text-right">
              <b-button
                class=""
                href="#"
                variant="primary"
                v-if="user.addStatus == 'Accept Invite'"
                @click="handleAddClick(user)"
                >Accept Invite</b-button
              >
              <b-button
                class=""
                href="#"
                variant="light"
                v-if="user.addStatus == 'Accepted'"
                @click="handleAddClick(user)"
                >Accepted</b-button
              >
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <div class="category-container">
      <!-- <b-button type="submit" variant="light" class="btn btn-info mr-4" inline>View More</b-button> -->
      <pulse-loader color="orange"></pulse-loader>
    </div>
  </div>
</template>
<script>
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries.js';
import * as mutations from '../../graphql/mutations.js';
import { getUser, listUsers, listRequestss, getRequests, listFriends } from '../../graphql/queries.js';
import { deleteRequests, createUserFriend } from '../../graphql/mutations.js';

export default {
  name: "suggestedpeople",
  props: {},
  data() {
    return {
      suggestions: [],
      storageUsers: '',
      users: [],
      userid: ''
    };
  },
  created() 
  {
    if(this.$store.state.signedIn)
    {
        this.signedIn = true;
    }

    this.listUsers();
  },
  methods: 
  {
    handleClick(user) 
    {
    },
    async handleAddClick(user) 
    {
      user.addStatus = 'Accepted';
      
      const addUser = {
        id: this.$store.state.user.username + "" + user.username, 
        userFriendUserId: this.$store.state.user.username,
        userFriendFriendId: user.username
      };

      const addUserT = {
        id: user.username + "" + this.$store.state.user.username, 
        userFriendUserId: user.username,
        userFriendFriendId: this.$store.state.user.username
      };

      const idOfDeletion = {
        id: user.username + "" + this.$store.state.user.username
      };

      const idOfDeletionT = {
        id: this.$store.state.user.username + "" + user.username
      };

      const deleteRequest = await API.graphql({ query: mutations.deleteRequests, variables: {input: idOfDeletion}});
      const deleteRequest2 = await API.graphql({ query: mutations.deleteRequests, variables: {input: idOfDeletionT}});
      
      const addingUserFriend = await API.graphql({ query: mutations.createUserFriend, variables: {input: addUser}});
      const addingUserFriend2 = await API.graphql({ query: mutations.createUserFriend, variables: {input: addUserT}});
    },
    async listUsers()
    {
        const listAllUsers = await API.graphql(graphqlOperation(listFriends));

        for (const [key, value] of Object.entries(listAllUsers.data.listFriends.items))
        {
            if(this.$store.state.user.username == value.username)
            {
                this.userid = value.id;
            }
        }

        const listRequests = await API.graphql(graphqlOperation(listRequestss));

        for(const [key, value] of Object.entries(listRequests.data.listRequestss.items))
        {
          if(value.friend.id == this.userid)
          {
              this.users.push({
                id: value.user.id,
                name: value.user.name,
                username: value.user.username,
                addStatus: "Accept Invite",
                requestId: value.id
              });
          }
        }
    },
  }
};
</script>

<style scoped>
.category-container {
  position: relative;
  width: 100%;
  text-align: center;
}
</style>
