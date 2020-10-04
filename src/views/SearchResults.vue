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
          <el-table
            class="table-responsive table"
            header-row-class-name="thead-light"
            :data="results"
          >
            <el-table-column label="Title" min-width="310px" prop="name">
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
              min-width="450px"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import LightTable from "./Tables/RegularTables/LightTable";
import DarkTable from "./Tables/RegularTables/DarkTable";
import { Client } from "elasticsearch";
import { Table, TableColumn } from "element-ui";

const client = new Client({ node: "http://localhost:9600/" });

export default {
  components: {
    LightTable,
    DarkTable,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      results: [],
      timeTotal: 0,
    };
  },
  computed: {
    text() {
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
    async performSearch() {
      var startTime, endTime;
      this.results = [];

      startTime = new Date();
      let searchResults = await client
        .search({
          index: "amr",
          body: {
            query: {
              query_string: {
                fields: ["title", "author", "message"],
                query: this.$route.query.text,
              },
            },
          },
        })
        .then((res) => res)
        .catch((e) => {
          console.log(e);
        });
      endTime = new Date();
      var timeDiff = endTime - startTime;
      this.timeTotal = this.timeTotal + timeDiff;
      this.results.push(...searchResults.hits.hits);
    },
  },
};
</script>
<style>
.el-table.table-dark {
  background-color: #172b4d;
  color: #f8f9fe;
}

.el-table.table-dark th,
.el-table.table-dark tr {
  background-color: #172b4d;
}

.el-table.table-dark td,
.el-table.table-dark th.is-leaf {
  border-bottom: none;
}
</style>