<template>
  <div>
    <base-header
      class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"
    ></base-header>
    <Email ref="doiEmailModal" :emails="emailModal.emailOpts"></Email>
    <b-card-header class="border-0">
      <h3 class="mb-0">
        About {{ results.length }} results ({{ timeTotal }} ms)
      </h3>
      <h4>{{ searchStatus }}</h4>
    </b-card-header>
    <card class="min-vh-100 main_body center">
      <div class="row card text-black">
        <div class="col-lg mx-auto form p-4">
          <el-table
            class="table-responsive table"
            header-row-class-name="thead-light"
            :data="results"
          >
            <el-table-column label="Title" min-width="300px" prop="name">
              <template v-slot="{ row }">
                <b-media no-body class="align-items-center">
                  <b-media-body>
                    <span class="font-weight-600 name mb-0 text-sm">{{
                      row._source.title
                    }}</span>
                  </b-media-body>
                </b-media>
              </template>
            </el-table-column>
            <el-table-column
              label="Author"
              prop="_source.author"
              min-width="150px"
            >
              <template v-slot="{ row }">
                {{row._source.author}}
     
                  <div 
                    class="emailIcon"
                    @click="doiEmailIconClick(row._source.doi)"
                    v-if="row._source.isDoi"
                  >
                    <b-icon
                        icon="envelope-fill"
                        font-scale="2"
                        aria-hidden="true"
                        ><span class="sr-only">Email Author</span>
                    </b-icon>
                  </div>

              </template>
            </el-table-column>
            <el-table-column
              label="Message"
              prop="_source.message"
              min-width="350px"
            >
            </el-table-column>
            <el-table-column
              label="View Count"
              prop="_source.count"
              min-width="200px"
              sortable
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import LightTable from "./Tables/LightTable";
import { Client } from "elasticsearch";
import { Table, TableColumn } from "element-ui";
import axios from "axios";
import Email from '@/components/Email.vue';

const client = new Client({ node: "http://localhost:9600/" });

export default {
  components: {
    LightTable,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    Email
  },
  data() {
    return {
      results: [],
      searchStatus: '',
      timeTotal: 0,
      blacklistText: "",
      emailModal: {
        emailOpts: []
      }
    };
  },
  computed: {
    text() {
      this.blacklistText = " ";
      //this.rawText = this.$route.query.text;
      //alert(this.rawText)
      var re = /(?:^|\s)(-[a-z0-9]\w*)/gi; // finding words starting with -
      var match;
      while ((match = re.exec(this.$route.query.text)) != null) {
        this.blacklistText = this.blacklistText + " " + match[0].substring(2); //extracting filtered words
      }
      //alert(this.blacklistText)
      return this.$route.query.text || 1;
    },
    doiEndpoint(){
      return this.$endpoints.aspnet + "api/doi";
    },
  },
  watch: {
    async text() {
      this.timeTotal = 0;
      this.performSearch();
    },
  },
  mounted() {
    this.performSearch();
  },
  methods: {
    async performSearch() {
      var startTime, endTime;
      this.results = [];

      startTime = new Date();
      const searchQuery = {};
      searchQuery[startTime] = this.$route.query.text;

      // axios
      //   .post("http://localhost:3000/search", searchQuery)
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });

      this.searchStatus = 'Searching AMR Database...';
      let searchResults = await client
        .search({
          index: "amr",
          body: {
            query: {
              bool: {
                must_not: {
                  query_string: {
                    fields: ["title", "author", "message", "count"],
                    query: this.blacklistText,
                  },
                },
                should: {
                  query_string: {
                    fields: ["title", "author", "message", "count"],
                    query: this.$route.query.text,
                  },
                },
              },
            },
          },
        })
        .then((res) => res)
        .catch((e) => {
          console.log(e);
        });

      this.searchStatus = '';

      endTime = new Date();
      var timeDiff = endTime - startTime;
      this.timeTotal = this.timeTotal + timeDiff;
      if (searchResults)
        this.results.push(...searchResults.hits.hits);

      //Subject to change - if Elasticsearch doesn't get any results from this search (i.e., we don't have anything about DOI in our data),
      // then check to see if there is a valid in the query string (e.g. 10.1510/12616/asghja/125)
      // If there is a valid DOI, check Crossref.org for some basic details (author name & article title).
      if (this.results.length === 0) {
        this.checkDoi();
      }
    },
    checkDoi() {
      var self = this;
      //Regex for matching DOIs.
      var reg = /10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i;
      var search = reg.exec(this.$route.query.text);
      if (search.length > 0) {
        //matched a doi in the string.
        this.searchStatus = 'Recognized DOI. Checking Crossref.org for info...';

        var doi = search[0]; //This is the first match for the regex. This currently only searches the first under the assumption that only one would be searched at a time...
        axios.get(this.$endpoints.crossref + 'works/' + doi) //sends a query to Crossref.org for basic article details like title and author.
          .then(function (response) {
            if (response && response.status === 200) {
              var newRow = {
                _source: {
                  title: response.data.message.title[0],
                  author: response.data.message.author[0].family + ", " + response.data.message.author[0].given,
                  isDoi: true,
                  doi: doi
                },
              };

              self.results.push(newRow);
            }
          })
          .catch(function (error) {
            alert("invalid or no doi result");
          })
          .then(function(){
            self.searchStatus = '';
          });
      }
    },
    doiEmailIconClick(doi){
      const self = this;

      this.searchStatus = 'Getting email from publisher...';
      axios.get(this.doiEndpoint + '/' + doi)
        .then(function (response) {
          if (response) {
            if(response.status === 200){
              self.emailModal.emailOpts = response.data;
              self.$refs.doiEmailModal.showModal();
            }
          }
        })
        .catch(function (error) {
          if(error.response && error.response.data && error.response.data.detail){
            alert(error.response.data.detail);
          }
        })
        .then(function() {
          self.searchStatus = '';
        });
    },
  },
};
</script>

<style>
div.emailIcon {
  display: inline-block;
  cursor: pointer;
}
</style>