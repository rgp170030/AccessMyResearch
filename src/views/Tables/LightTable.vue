<template>
    <b-card no-body style="box-shadow: 0 3px 5px #8898AA;">
        <b-card-header class="border-1" style = "height: 100px;">
            <span>
                <!-- <dropdown title="Most Recent" items="options1" style="text-align:left; float:left;"/> -->
                <CustomSelect
                    :options="['Most Recent', 'Most Citied', 'Most Discussed', 'Trending']"
                    :default="'Most Recent'"
                    Selector="Sort by: "
                    Icon="fas fa-chevron-down"
                    class="select my-select"
                    style="text-align:left; float:left;"
                    @input="alert(displayToKey($event))"/>
                <h5 style="text-align:right; float:right;" class="form-text text-muted">in 0.56 seconds</h5> 
                <h5 class="text-muted d-flex justify-content-center">1-25 of 6604 publications</h5>
            </span>    
                <br>
            <span style="position:relative; top:-20px;">
               <CustomSelect
                    :options="['25', '50', '100', '200']"
                    :default="'25'"
                    Selector="Results per page: "
                    Icon="fas fa-chevron-down"
                    class="select my-select-2 size-sm"
                    style="text-align:left; float:left;"
                    @input="alert(displayToKey($event))"/>
                <CustomSelect
                    :options="['Mini ', 'Compact ', 'Expanded ']"
                    :default="'Compact '"
                    Icon="fas fa-expand-arrows-alt"
                    class="select my-select-2 size-sm"
                    style="text-align:right; float:right; "
                    @input="alert(displayToKey($event))"/>
                <b-pagination v-model="currentPage" :per-page="10" :total-rows="100" first-text="First" prev-text="Prev" next-text="Next" last-text="Last" size="sm" style="float:left; padding-left:350px;"></b-pagination>
            </span>
        </b-card-header>
        <div style="height: 67vh" class="scroll">
        <el-table class="table-responsive table-light"
                  :data="articles"
                  :show-header="false"
                  size="small"
                  style="width: 100%;"
                  >
            <el-table-column type="expand" >
                <template v-slot="{row}">
                    <!--TODO: Indicate the availability of an article <p > Status: 
                        <span class="font-weight-700 name mb-0 text-blue">{{row.status}}</span>
                        <span style="float:right">{{row.date}}</span>
                    </p> -->
                    <!--<span style="float:right">{{row.date}}</span>-->
                    <div style="font-size: 16px; font-weight: 400; padding-bottom:5px;">
                        <span class="text-black" >{{row.abstract}}</span>
                    </div>
                    <span class="button-options border-0" style="padding-left: 10px;">
                        <button title="View"  class="far fa-eye fa-lg button-options"></button>
                        <button title="Download" class="fas fa-file-download fa-lg button-options"></button>
                        <button title="E-Mail" class="fas fa-envelope fa-lg button-options"></button>
                        <button title="Collections" v-b-modal.modal class="fas fa-layer-group fa-lg button-options"></button>
                        <button title="Cite" class="fas fa-quote-left fa-lg button-options"></button>
                    </span>
                    <b-modal id="modal" title="Add article to Collection"> <!--TODO: Move this modal to separate function-->
                        <b-list-group>
                            <button class="btn btn-primary">Artificial Intelligence Collection</button>
                            <button class="btn btn-primary">Articles about electricity</button>
                            <button class="btn btn-primary">My favorites</button>
                            <button class="btn btn-light">Create new Collection</button>
                        </b-list-group>
                    </b-modal>
                </template>
            </el-table-column>
            <el-table-column prop="name">
                <template v-slot="{row}">
                    <b-media no-body class="align-items-center">
                        <b-media-body>
                            <span style="font-family:Verdana" class="font-weight-800 name mb-0 text-sm">{{row.name}}</span>
                        </b-media-body>
                    </b-media>
                    <b-media no-body class="align-items-center">
                        <!--<a href="#" class="mr-3">
                            <b-img class="avatar" rounded="circle" alt="Article Image" :src="row.img" />
                        </a>-->
                        <p class="font-weight-600 name mb-0 text-blue">{{row.author}}</p>
                        <pre> </pre>
                        <p class="font-weight-400 name mb-0"> &#8211; {{row.journal}}</p>
                        <pre> </pre>
                        <p class="font-weight-400 name mb-0"> &#8211; ({{row.year}})</p>
                        <!--TODO: Add ratings <span class="font-weight-400 name mb-0 text-black right"> Rating
                            <base-progress :type="row.statusType" :value="row.rating"/>
                        </span> -->
                    </b-media>
                </template>
            </el-table-column>
        </el-table>
        </div>
    </b-card>
</template>
<script>
import articles from './articles' //TODO: Replace with AWS source
import {Table, TableColumn} from 'element-ui'
import Dropdown from '../../components/Dropdown.vue'
import CustomSelect from "../../components/CustomSelect.vue";

export default {
    name: 'light-table',
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        //Dropdown,
        CustomSelect

    },
    data() {
        return {
            articles,
            currentPage: 1,
            index: 1,
            options1: [{
                title:'Most Recent',
                link: '#'
            },{
                title:'Most Citied',
                link: '#'
            }],
           
            placement:'down',
            selected: 
                {text: "Most Recent",
                value: "most-recent"} 
            ,
            options: [
                {
                text: "c",
                value: "most-recent",
                link: '#'
                },
                {
                text: "Most Cited",
                value: "most-cited",
                link: '#'
                },
                {
                text: "Most Discussed",
                value: "most-discussed",
                link: '#'
                },
                {
                text: "Most Rated",
                value: "most-rated",
                link: '#'
                },
                {
                text: "Highest Rated",
                value: "highest-rated",
                link: '#'
                },
                {
                text: "Trending",
                value: "trending",
                link: '#'
                },
                {
                text: "Expertise",
                value: "expertise",
                link: '#'
                },
            ]
        };
    },
    methods: {
          methodToRunOnSelect(payload) {
            this.object = payload;
          }
        }
}
</script>
<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}
.right {
    width: 15%;
    margin-left: auto;
    float: right;
}
.bForms {
    border: 0px;
    width: 250px;
}

.my-select {
  max-width: 210px;
  height: 15px;
  }

.my-select-2 {
    max-width: 210px;
}

.scroll{
    overflow-y: scroll;
}

::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}

.btn-group button:not(:last-child) {
  border-bottom: none; /* Prevent double borders */
}

.button-options{
    width: 20px;
    border: 0px;
    padding: 10px 45px 10px 0px;
    background-color: white;
    color:  #4577B8;
}

.button-options :hover{
    color: #F78626;
}

.button-options :focus{
    color: #F78626;
    border: 0px;
}
.button-options :active{
    border: 0px;
}
.open-item{
    background-color:#DEE2E6;
    background: #DEE2E6;
}

</style>