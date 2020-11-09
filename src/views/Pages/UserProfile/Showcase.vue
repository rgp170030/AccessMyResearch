<template>
  <div>
    <b-table striped
             hover
             :items="messages[0].selected"
             :fields="['title', 'author','type']">
            <template v-slot:cell(doi)="abc">
            <a :href="`http://${abc.value}`">{{ abc.value }}</a>
            </template>
    </b-table>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Showcase",
  data(){
    return {
      messages: [],
    }
  },
  methods: {
    fetchMessages(){
      db.collection('chat').onSnapshot((querySnapshot)=>{
        let allMessages= [];
        querySnapshot.forEach(doc=>{
          allMessages.push(doc.data())
        })
        this.messages= allMessages
      });

    },
  },

  mounted: function(){
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchMessages();

    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.authUser=user;
      }else{
        this.authUser={}
      }
    });
  }

}

</script>

<style scoped>

</style>
