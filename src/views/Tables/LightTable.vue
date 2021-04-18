<template>
    <b-card no-body style="box-shadow: 0 3px 5px #8898AA;">
        <b-card-header class="border-1" style = "height: 110px;">
            <span>
                <!-- <dropdown title="Most Recent" items="options1" style="text-align:left; float:left;"/> -->
                <CustomSelect
                    :options="['Most Recent', 'Most Citied', 'Most Discussed', 'Trending']"
                    :default="'Most Recent'"
                    Selector="Sort by: "
                    Icon="fas fa-chevron-down"
                    class="select my-select"
                    style="text-align:left; float:left; "
                    @input="alert(displayToKey($event))"/>
                <span style="text-align:right; float:right; font-family:Roboto; font-size: 16px;" class="form-text text-muted">in 0.56 seconds</span> 
                <span class="text-muted d-flex justify-content-center" style="font-family:Roboto; font-size: 16px;">1-25 of 6604 results</span>
            </span>  
              
                <br>
            <span style="position:relative; top:-25px;">
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
                     </span>

            <!-- Creates a pagination with the class name main and is displayed only for certain window size  -->
            <template>
            <div id = "main" class="window-size">
                 <b-pagination id = "browser_size2" v-model="currentPage" :per-page="10" :total-rows="100" 
                 first-text="First" prev-text="Prev" next-text="Next" last-text="Last" size="sm" 
                 style="float:right; padding-left:1px;"></b-pagination>
            </div>
            </template>

            <!-- Creates a new button for prev and next with the class name but which is used later to display for certain window size -->
            <template>
            <div class ="but">
               <button type="button" class="btn btn-outline-primary btn-sm" style="position: relative; top: -10px; left: 150px; padding: 2px;">Prev</button>
               <button type="button" class="btn btn-outline-primary btn-sm" style="position: relative; top: -10px; left: 150px; padding: 2px; ">Next</button>
            </div>
            </template>
        
        </b-card-header>
        <div style="height: 77vh">
        <splitpanes class="default-theme">
        <pane class="scroll">
        <el-table class="table-responsive table-light"
                  :data="articles"
                  :row-style="tableRowStyle"
                  :show-header="false"
                  :cell-style="{padding: '0', height: '12px'}"
                  size="small"
                  style="width: 100%;"
                  >
            <el-table-column type="expand">
                <template v-slot="{row}">
                    <!--TODO: Indicate the availability of an article <p > Status: 
                        <span class="font-weight-700 name mb-0 text-blue">{{row.status}}</span>
                        <span style="float:right">{{row.date}}</span>
                    </p> -->
                    <!--<span style="float:right">{{row.date}}</span>-->
                    <div style="font-family:Roboto; font-size: 17px; font-weight: 400; padding-bottom:0px; position:relative; top:-15px; margin-bottom:-25px;">
                        <span class="text-black" >{{row.abstract}}</span>
                    </div>
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
            <el-table-column prop="name" >
                <template v-slot="{row}">
                    <b-media no-body class="align-items-center" style="padding-top: 8px">
                        <b-media-body>
                            <span style="font-family:Roboto; font-size: 18px;" class="font-weight-400 name mb-0">{{row.name}}</span>
                        </b-media-body>
                    </b-media>
                    <b-media no-body class="align-items-center" style="position: relative; top:-10px; margin-bottom: -10px;">
                        <!--<a href="#" class="mr-3">
                            <b-img class="avatar" rounded="circle" alt="Article Image" :src="row.img" />
                        </a>-->
                        <p class="font-weight-400 name mb-0 text-blue" style="font-family:Roboto; font-size: 16px;">{{row.author}}</p>
                        <pre> </pre>
                        <p class="font-weight-200 name mb-0" style="font-family:Roboto; font-size: 16px;"> &#8211; {{row.journal}}</p>
                        <pre> </pre>
                        <p class="font-weight-200 name mb-0" style="font-family:Roboto; font-size: 16px;"> &#8211; ({{row.year}})</p>
                        <!--TODO: Add ratings <span class="font-weight-400 name mb-0 text-black right"> Rating
                            <base-progress :type="row.statusType" :value="row.rating"/>
                        </span> -->
                    </b-media>
                    <span class="button-options border-0" style="padding-left: 10px; position: relative; top:-5px; margin-bottom: -20px;">
                        <button id = "button1" @click="hidePane2 = !hidePane2" title="View" title2=row.author class="far fa-eye fa-lg button-options"> </button>
                        <button @click = "download" title="Download" class="fas fa-file-download fa-lg button-options" ></button>
                        <button title="Links" class="fas fa-external-link-alt fa-lg button-options" ></button>
                        <button title="E-Mail" class="fas fa-envelope fa-lg button-options" ></button>
                        <button title="Collections" v-b-modal.modal class="fas fa-layer-group fa-lg button-options"></button>
                        <button title="Cite" class="fas fa-quote-left fa-lg button-options"></button>
                    </span>

                </template>
            </el-table-column>
        </el-table>
        
        
        </pane>
        <pane v-if="!hidePane2" class="scroll">
                <template>
                    <CustomPDF></CustomPDF>
                </template>
        </pane>
        </splitpanes>
        </div>
    </b-card>
</template>
<script>
import articles from './articles' //TODO: Replace with AWS source
import {Table, TableColumn} from 'element-ui'
import Dropdown from '../../components/Dropdown.vue'
import CustomSelect from "../../components/CustomSelect.vue";
import CustomPDF from "../../components/CustomPDF.vue";
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

//import profileinformation from '../../pages/profileinformation.vue'

export default {
    name: 'light-table',
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        //Dropdown,
        CustomSelect,
        CustomPDF,
        Splitpanes, 
        Pane,
        


    },
    data() {

        return {
            articles,
            currentPage: 1,
            index: 1,
            count:0,
            url: 'https://bitcoin.org/bitcoin.pdf',
            hidePane2:true,
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
          },
          //function that will run once the download buttton is clicked
          download(){
              //counterlook function that will run when looking for how many pdfs the user has downloaded 
              async function counterlook(){
                    const { GoogleSpreadsheet } = require('google-spreadsheet');
                    const{google} = require('googleapis');
                    const creds = require('./GSkeys.json'); //this file has the credentials that helps connect it 
                  // spreadsheet key is the long id in the sheets URL
                  const doc = new GoogleSpreadsheet('1lskc6a6JsvDb4ZcqsGpUqQ0zmHHbh4msFQs7d-kJfiE'); //create the doc that has the id of the google sheets
                  //authenticate the sheets with keys and information that can be found from the GSkeys.json file
                  await doc.useServiceAccountAuth({
                    client_email: creds.client_email,
                    private_key: creds.private_key,
                    }); //information that is from the GSkeys.json files 
                    await doc.loadInfo(); // loads document properties and worksheets
                    console.log(doc.title);

                    const sheet = doc.sheetsByIndex[0];

                    //counter variable that will count how many pdfs the user had downloaded 
                    var counter =0; 

                    //try-catch block for implemntaiotn of getting the rows with query of the username
                    try{  
                      var rows = await(sheet.getRows)({
                        query: 'this.email'
                     })
                     //go through each row and have a counter variable for each time 
                     rows.forEach(row => {
                        counter = counter+1;
                     })
                    }
                    catch(error){
                        alert(error);
                         
                    }
                    //if counter is 10 or greater than 10, then send an email 
                    if(counter>=10){
                    try{
                        const sheet2 = doc.sheetsByIndex[1];
                        const row = {
                        email: 'this.email',
                        counter: "10",
                        Email: "Send",
                        } //row instance that will be added to google sheet *test*
                        await (sheet2.addRow)(row); //add the row

            
                        
                        }     
                        
                        
                    
                      
                        
                        catch(error){
                            alert(error);
                        }
                    
                  }
         

                  }
                //function that will set connection to google sheet and insert row each time user downloads pdf 
                   async function accessSpreadsheet() {
                       const { GoogleSpreadsheet } = require('google-spreadsheet');
                  const creds = require('./GSkeys.json'); //this file has the credentials that helps connect it 
                  // spreadsheet key is the long id in the sheets URL
                  const doc = new GoogleSpreadsheet('1lskc6a6JsvDb4ZcqsGpUqQ0zmHHbh4msFQs7d-kJfiE'); //create the doc that has the id of the google sheets
                    await doc.useServiceAccountAuth({
                      client_email: creds.client_email,
                      private_key: creds.private_key,
                      }); //information that is from the GSkeys.json files 
                      await doc.loadInfo(); // loads document properties and worksheets
                      console.log(doc.title);
                      const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]

                      //insert row that will insert a new row 
                      const row = {
                        email: 'this.email',
                        counter: "1",
                        } //row instance that will be added to google sheet *test*
                        await (sheet.addRow)(row); //add the row
                  }
                  accessSpreadsheet(); //call function that will insert row each time user clicks download pdf 
                  counterlook(); //call function that will check the google sheet on how many rows the user has which tells us how many pdfs the user has downloaded
     

 

                        
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

/* If the windown size is between 1600 px and 1244 px, show the pagination and hide the prev and next buttons */
@media screen and (max-width: 1600px) and (min-width: 1244px)  {
    .window-size{
    align-self: baseline;
    width: 810px;
    }
    .but{
    backface-visibility: hidden;
    visibility: hidden;
    content-visibility: hidden;
}
}

/* If the windown size is 1244px or less, hide the pagination and only show the prev and next button */
@media screen and (max-width: 1244px)  {
    .window-size{
    align-self: baseline;
    width: 810px;
    backface-visibility: hidden;
    visibility: hidden;
    content-visibility: hidden; 
}
}

.scroll{
    overflow-y: scroll;
}


 .but{
     height: 1px;
 }   


.btn-group button:not(:last-child) {
  border-bottom: none; /* Prevent double borders */
}

.button-options{
    width: 20px;
    border: 0px;
    background-color: inherit;
    padding: 10px 45px 10px 0px;
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