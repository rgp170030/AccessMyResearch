<template>
  <div>
    <base-header
      class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"
    ></base-header>
    <b-card-header class="border-0">
      <h3 class="mb-0" >About {{results.length}} results ({{timeTotal}} ms) </h3>
    </b-card-header>
    <card class="min-vh-100 main_body center">
      <div class="row card text-black">
        <div class="col-lg mx-auto form p-4">


          <!--  <b-table striped hover :items="results" :fields="fields"></b-table>  -->
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
          
                <div class="accordion" role="tablist">
                  <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button block v-b-toggle.doajAccordion variant="primary"
                        >DOAJ: About {{results_doaj.length}} results ({{timeTotal}} ms)</b-button>
                    </b-card-header>
                    <b-collapse
                      id="doajAccordion"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card-body>
                          <div v-for="(result, i) in results_doaj" :key="i + result.bibjson.title">
                            <p v-html="result.bibjson.title"></p>
                                <p>Published Date: {{result.created_date}}</p>
                                <p>Author: </p>
                                <p v-for="(author, ii) in result.bibjson.author" :key="ii + author.name">
                                  {{author.name}}
                                </p>
                                <p v-for="(link, iii) in result.bibjson.link" :key="iii + link.url"> 
                                  Link/URL: <a :href="link.url">{{ link.url}}</a>
                                </p>
                                <p>Description/Abstract: {{result.bibjson.abstract}}</p>
                                <hr role="separator" aria-orientation="horizontal" class="dropdown-divider">
                          </div>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </div>

              
                <div class="accordion" role="tablist">
                  <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button block v-b-toggle.unpaywallAccordion variant="primary"
                        >DOI: About {{results_doi.length}} results ({{elapsed_time}} ms)</b-button>
                    </b-card-header>
                    <b-collapse
                      id="unpaywallAccordion"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card-body>
                          <div v-for="(result, i) in results_doi" :key="i + result"><p v-html="result.snippet">
                            </p><a :href="result.response.doi_url">{{ result.response.doi_url}}</a>
                                <hr role="separator" aria-orientation="horizontal" class="dropdown-divider">
                          </div>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </div>

        </div>
      </div>
    </card>
  </div>
</template>
<script>
import LightTable from "./Tables/LightTable";
import { Client } from "elasticsearch";
import { Table, TableColumn } from "element-ui";
import axios from 'axios';

const client = new Client({ node: "http://localhost:9600/" });

export default {
  components: {
    LightTable,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      results:[],
      results_doaj: [],
      results_doi: [],
      fields: ['snippet', 'response.doi_url'],
      elapsed_time: 0,
      timeTotal: 0,
      blacklistText:"",
      lengthResults: 0,
    };
  },
  computed: {
    text() {
      this.blacklistText = " ";
      //this.rawText = this.$route.query.text;
      //alert(this.rawText)
      var re = /(?:^|\s)(-[a-z0-9]\w*)/gi; // finding words starting with -
      var match;
      while ((match = re.exec(this.$route.query.text)) != null){
        this.blacklistText = this.blacklistText + " " + match[0].substring(2); //extracting filtered words 
      }
      //alert(this.blacklistText)
      return this.$route.query.text || 1;
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
    postSearchHistory(startTime, totalResults, queryText){
      const searchQuery = {};
      var queryTime = startTime.toDateString();
      searchQuery[startTime] =  JSON.stringify({ time: queryTime, total: totalResults, query: queryText });
      //searchQuery[queryTime] =  queryText;
      axios
      .post('http://localhost:3000/search', searchQuery)
      .then(function (response) {
         console.log(response);
      })
       .catch(function (error) {
          console.log(error);
       });
    },

    async performSearch() {
       var startTime, endTime;
       this.results = [];
       this.lengthResults = 0; 
       startTime = new Date();

       let searchResults = await client
         .search({
           index: "amr",
           body: {
             query: {
               bool: {
                 must_not:{
                   query_string: {
                     fields: [ "title", "author", "message", "count"],
                     query: this.blacklistText,
                   }
                 },
                 should:{
                   query_string: {
                     fields: [ "title", "author", "message", "count"],
                     query: this.$route.query.text,
                   }
                 },
               },
             },
           },
         })
         .then((res) => res)
         .catch((e) => {
           console.log(e);
         });
         
       endTime = new Date();

      axios
      .get(`https://doaj.org/api/v1/search/articles/${this.$route.query.text}?page=1&pageSize=100`)
      .then((response) => {
          //this.elapsed_time = response.data.elapsed_seconds
          this.results_doaj = response.data.results;
          this.lengthResults = response.data.total;
          console.log(this.lengthResults);
          //var numberResultsDate =  startTime + "; Number of Results " + this.lengthResults; 
          this.postSearchHistory(startTime,this.lengthResults, this.$route.query.text);
       });
    
      axios
      .get(`https://api.unpaywall.org/v2/search/?query=${this.$route.query.text}&email=your_email&is_oa=true`)
      .then((response) => {
          this.elapsed_time = response.data.elapsed_seconds;
          this.results_doi = response.data.results;
       });

       var timeDiff = endTime - startTime;
       this.timeTotal = timeDiff;
       this.results.push(...searchResults.hits.hits);
      
    },
  },
};
</script>
