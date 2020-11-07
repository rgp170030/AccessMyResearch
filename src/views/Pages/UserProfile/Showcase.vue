<template>
  <div>
    <!-- Description -->
    <h6 class="heading-small text-muted mb-4">Publication</h6>
    <div>
      <ul id="example-1">
        <li v-for="item in publications.data" :key="item.type">
          {{ item.type }}
        </li>
      </ul>
    </div>


  </div>
</template>

<script>
export default {
name: "Showcase",
  data(){
  return {
    selected: [],
    selectAll: false,
    publications: {
      fields: [
        {
          key: 'title',
          sortable: true,
          label: 'Title'
        },
        {
          key: 'date',
          sortable: true,
          label: 'Date Published',
          formatter: (dateObj) => `${(dateObj.month + 1)}/${dateObj.day}/${dateObj.year}`
        },
        {
          key: 'doi',
          sortable: false,
          label: 'DOI Link'
        }
      ],
      data: []
    }
  }
  },
  methods: {
    select() {
      this.selected = [];
      if (!this.selectAll) {
        for (let i in this.items) {
          this.selected.push(this.items[i].id);
        }
      }
    }
  },
  mounted: function(){
    var self = this;

    // 1. Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configure it: GET-request for the URL /article/.../load
    xhr.open('GET', this.$endpoints.aspnet + 'api/publications');

    // 3. Send the request over the network
    xhr.send();

    // 4. This will be called after the response is received
    xhr.onload = function() {
      if (xhr.status === 200) { // analyze HTTP status of the response
        const response = xhr.response;
        console.log(response)

        self.publications.data = JSON.parse(response);
        console.log(JSON.parse(response))

      }
    };

    xhr.onerror = function() {
      console.error("Request failed.");
    };
  }

}

</script>

<style scoped>

</style>
