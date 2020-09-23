<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary">
    <b-row>
      <b-col xl="3" md="6">
        <stats-card title="Fresh"
                    type="gradient-green"
                    sub-title="Articles"
                    icon="fas fa-book-open"
                    class="mb-4">
          <template slot="footer">
            <span class="text-success mr-2">31</span>
            <span class="text-nowrap">Articles posted today</span>
          </template>
        </stats-card>
      </b-col>
      <b-col xl="3" md="6">
        <stats-card title="Featured"
                    type="gradient-orange"
                    sub-title="Articles"
                    icon="fas fa-award"
                    class="mb-4">
          <template slot="footer">
            <span class="text-success mr-2">10</span>
            <span class="text-nowrap">Articles we love</span>
          </template>
        </stats-card>
      </b-col>
      <b-col xl="3" md="6">
        <stats-card title="Popular"
                    type="gradient-red"
                    sub-title="Articles"
                    icon="fas fa-star"
                    class="mb-4">
          <template slot="footer">
            <span class="text-success mr-2">100</span>
            <span class="text-nowrap">Top Articles</span>
          </template>
        </stats-card>
      </b-col>
    </b-row>
    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <light-table/>
        </b-col>
      </b-row>
      <div class="mt-5"></div>
    </b-container>
  </div>
</template>
<script>
  import { Dropdown, DropdownItem, DropdownMenu, Table, TableColumn } from 'element-ui';
  import projects from './Tables/projects'
  import users from './Tables/users'
  import LightTable from "./Tables/RegularTables/LightTable";
  import DarkTable from "./Tables/RegularTables/DarkTable";

  export default {
    components: {
      LightTable,
      DarkTable,
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data() {
      return {
        projects,
        users
      };
    }
  };
</script>
<style>
.el-table.table-dark{
  background-color: #172b4d;
  color: #f8f9fe;
}

.el-table.table-dark th,
.el-table.table-dark tr{
  background-color: #172b4d;
}

.el-table.table-dark td,
.el-table.table-dark th.is-leaf{
  border-bottom: none;
}
</style>