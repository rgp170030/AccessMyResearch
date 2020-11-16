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
      db.collection('showcase').onSnapshot((querySnapshot)=>{
        let allMessages= [];
        querySnapshot.forEach(doc=>{
          allMessages.push(doc.data())
        })
        this.messages= allMessages
      });

    },
  },
created() {
  this.fetchMessages();

},
  mounted: function(){
    // fetch the data when the view is created and the data is
    // already being observed

  }

}

</script>

<style scoped>

</style>
