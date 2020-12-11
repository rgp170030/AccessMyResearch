<template>
  <div>
    <base-header
      class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"
    ></base-header>

    <h1 class="pl-5 pt-4">Add Users</h1>

    <b-container fluid class="pb-4" id="suggested-people-container">
      <b-row no-gutters>
        <b-col cols="4" v-for="user in users" :key="user.username">
          <b-card
            tag="article"
            style="max-width: 20rem; max-height: 20rem;"
            class="mb-2 mr-3 ml-5 mt-5 mb-3 h-60 rounded-10"
          >
            <div class="text-right" v-if="user.usertype == 'expert'">
              <b-icon icon="star-fill" class="h2" variant="warning"/>
            </div>
            <div class="text-right" v-else>
              <b-icon icon="" class="h2" variant="warning"/>
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
                v-if="user.addStatus == 'Add User'"
                @click="handleAddClick(user)"
                >Add User</b-button
              >
              <b-button
                class=""
                href="#"
                variant="light"
                v-if="user.addStatus == 'Pending'"
                @click="handleAddClick(user)"
                >Pending</b-button
              >
              <b-button
                class="mt-2 mr-2"
                href="#"
                v-if="user.following == 'Follow'"
                variant="warning"
                id="button"
                @click="handleClick(user)"
                >Follow</b-button
              >
              <b-button
                class="mt-2 mr-2"
                href="#"
                v-if="user.following == 'Unfollow'"
                variant="youtube"
                id="button"
                @click="handleClick(user)"
                >Unfollow</b-button
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
import { getUser, listUsers, listFriends, getUserFriend } from '../../graphql/queries';
import { deleteRequests } from '../../graphql/mutations';

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
      const addUser = {
        id: this.$store.state.user.username + "" + user.username, 
        requestsUserId: this.$store.state.user.username,
        requestsFriendId: user.username
      };

      const addUserT = {
        id: user.username + "" + this.$store.state.user.username, 
        requestsUserId: user.username,
        requestsFriendId: this.$store.state.user.username
      };

      const addingUser = await API.graphql({ query: mutations.createRequests, variables: {input: addUser}});
      const addingUser2 = await API.graphql({ query: mutations.createRequests, variables: {input: addUserT}});
    },
    async listUsers()
    {
        const listAllUsers = await API.graphql(graphqlOperation(listFriends));

        for (const [key, value] of Object.entries(listAllUsers.data.listFriends.items))
        {
            const friend = await API.graphql({query: queries.getUserFriend, variables: {id: this.$store.state.user.username + "" + value.username}});

            if(this.$store.state.user.username != value.username)
            {
              if(friend.data.getUserFriend == null)
              {
                  this.users.push({
                  id: value.id,
                  name: value.name,
                  username: value.username,
                  following: "Follow",
                  addStatus: "Add User"
                });
              }
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
