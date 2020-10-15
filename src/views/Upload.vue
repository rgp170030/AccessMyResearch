<template>
    <div>
        <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"></base-header>
        <card class="min-vh-100 main_body center">
            <div class="row card text-black">
                <div class="col-lg mx-auto form p-4">
                    <form @submit.prevent="submitForm">
                        <div class="form-group">
                            <label class="h2" for="pub-type">Publication Type</label>
                            <multiselect
                                v-model="pubType.value"
                                :options="pubType.options"
                            >
                            </multiselect>
                        </div>
                        <div class="form-group">
                            <label for="access-level">Publication Visibility</label>
                            <multiselect
                                v-model="visibility.value"
                                :options="visibility.options"
                            >
                            </multiselect>
                        </div>
                        <div class="form-group">
                            <label class="h2" for="title_of_publication">Title</label>
                            <input type="text" class="form-control" placeholder="Title">
                        </div>
                        <div class="form-group">
                            <label class="h2" for="Authors">Author(s)</label>
                            <multiselect 
                                v-model="authors.value"
                                :options="authors.options"
                                label="name"
                                track-by="code"
                                :multiple="true"
                                :taggable="true"
                                @tag="addTag"
                            >
                            </multiselect>
                        </div>

                        <div>
                            <label class="h2">Date</label>
                            <div>
                                <multiselect 
                                    class="dateSelect"
                                    v-model="date.selected.day"
                                    :options="date.options.days"
                                    :allowEmpty="false"
                                    :showLabels="false"
                                >
                                </multiselect>

                                <multiselect 
                                    class="dateSelect"
                                    v-model="date.selected.month"
                                    :options="date.options.months"
                                    label="name"
                                    track-by="index"
                                    :allowEmpty="false"
                                    :showLabels="false"
                                    @input="updateDayOptions"
                                >
                                </multiselect>

                                <multiselect 
                                    class="dateSelect"
                                    v-model="date.selected.year"
                                    :options="date.options.years"
                                    :allowEmpty="false"
                                    :showLabels="false"
                                    @input="updateIsLeapYear"
                                >
                                </multiselect>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="h2" for="Abstract">Abstract</label>
                            <textarea type="text" class="form-control" placeholder="Abstract" rows="5"></textarea>
                        </div>
                        <div class="form-group" v-if="doiVisible">
                            <label class="h2" for="doi">DOI (Optional)</label>
                            <input type="text" class="form-control" placeholder="DOI">
                        </div>
                        <div id="drop-area">
                            <form class="my-form">
                                <p>Upload a PDF version of the article and any images that should be attached</p>
                                <input type="file" id="fileElem" accept="application/pdf" @change="handleFiles">
                                <label class="btn btn-secondary" for="fileElem">Choose File(s)</label>
                                <button type="submit" class="float-right btn btn-primary">Upload Article</button>
                                <small id="fileWarning" class="form-text text-muted">PDF/PNG/JPEG</small>
                            </form>
                            <progress id="progress-bar" max=100 value=0></progress>
                            <div id="gallery" ></div>
                        </div>
                        <div>
                            <ul>
                                <li v-for="(file, index) in files" :key="file.name">
                                    {{ index }}. {{ file.name }}
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </card>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import upload from '@/util/upload';

export default {
    data: function(){
        return {
            pubType: {
                value: null,
                options: ["Article", "Book", "Chapter", "Code", "Conference Paper", "Cover Page", "Data", "Experiment Findings", "Method", "Negative Results", "Patent", "Poster",
                "Preprint", "Presentation", "Raw Data", "Technical Report", "Thesis", "Research"]
            },
            visibility:{
                value: null,
                options: ["Public", "Private", "Personal"]
            },
            authors: {
                value: [],  
                options: [
                    {
                        name: "Javascript",
                        code: "js"
                    }
                ]
            },
            doi: {
                
            },
            date: {
                selected: {
                    day: 1,
                    month: {
                        index: 0,
                        name: "January",
                        days: 31
                    },
                    year: 1970,
                },
                options: {
                    days: [],
                    months: [
                        {
                            index: 0,
                            name: "January",
                            days: 31
                        },
                        {
                            index: 1,
                            name: "February",
                            days: 28
                        },
                        {
                            index: 2,
                            name: "March",
                            days: 31
                        },
                        {
                            index: 3,
                            name: "April",
                            days: 30
                        },
                        {
                            index: 4,
                            name: "May",
                            days: 31
                        },
                        {
                            index: 5,
                            name: "June",
                            days: 30
                        },
                        {
                            index: 6,
                            name: "July",
                            days: 31
                        },
                        {
                            index: 7,
                            name: "August",
                            days: 31
                        },
                        {
                            index: 8,
                            name: "September",
                            days: 30
                        },
                        {
                            index: 9,
                            name: "Spooktober",
                            days: 31
                        },
                        {
                            index: 10,
                            name: "November",
                            days: 30
                        },
                        {
                            index: 11,
                            name: "December",
                            days: 31
                        }
                    ],
                    years: []
                }
            },
            files: []
        };
    },
    computed: {
        doiVisible: function(){
            return this.pubType.value === "Article";
        }
    },
    methods:{
        handleFiles: function(event){
            upload.setFiles(event.target.files); 
        },
        addTag: function (newTag) {
            const tag = {
                name: newTag,
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }

            var authors = this.authors;
            authors.options.push(tag);
            authors.value.push(tag);
        },
        submitForm: function(){
            upload.upload();
        },
        isLeapYear: function(year){
            if(year % 4 === 0){
                if(year % 100 === 0){
                    return year % 400 === 0;
                }

                return true;
            }

            return false;
        },
        updateDayOptions: function(){
            var month = this.date.selected.month;

            var daysArray = this.date.options.days;
            if(daysArray.length === month.days){
                return;
            }

            daysArray.length = 0;
            for(var i=1; i <= month.days; i++){
                daysArray.push(i);
            }

            if(this.date.selected.day > month.days){
                this.date.selected.day = month.days;
            }
        },
        updateIsLeapYear: function(year){
            var year = this.date.selected.year;

            var february = this.date.options.months[1];
            if(this.isLeapYear(year)){
                february.days = 29;
            }else{
                february.days = 28;
            }

            if(this.date.selected.month.index === february.index){
                this.updateDayOptions();
            }
        }
    },
    mounted: function(){
        var uploadElement = document.getElementById('drop-area');
        upload.init(uploadElement, {
            files: this.files,
            urls: {
                uploadEndpoint: 'https://localhost:5001/api/upload'
            }
        });

        var now = new Date();
        for(var i=now.getFullYear() + 2; i > 1940; i--){
            this.date.options.years.push(i);
        }

        var selected = this.date.selected;
        selected.year = now.getFullYear();
        this.updateIsLeapYear();

        selected.month = this.date.options.months[now.getMonth()];
        
        selected.day = now.getDate();
        this.updateDayOptions();
    },
    components: {
        Multiselect
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
#drop-area {
    border: 3px dashed #CCCCCC;
    border-radius: 20px;
    width: 60%;
    margin: auto;
    padding: 20px;
}
#progress-bar {
    width: 100%;
}
#drop-area.highlight {
    border-color: purple;
}
.my-form {
    margin-bottom: 10px;
}
#gallery {
    margin-top: 10px;
}
#gallery img {
    width: 15%;
    margin-bottom: 10px;
    margin-right: 10px;
    vertical-align: middle;
}
#fileElem {
    display: none;
}

.dateSelect {
    display: inline-block;
    width: 25%;
}
</style>