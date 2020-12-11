<template>
    <div>
        <base-header class="pb-8 pt-md-8 bg-gradient-primary"></base-header>
        <b-container fluid class="mt--9">
            <div class="row card text-black">
                <div class="col-lg mx-auto form p-4">
                    <div id="mainUpload">
                        <div class="form-group">
                            <label class="h2" for="pub-type">Publication Type</label>
                            <multiselect
                                v-model="pubType.value"
                                :options="pubType.options"
                                :allowEmpty="false"
                                :showLabels="false"
                            >
                            </multiselect>
                        </div>
                        <div class="form-group">
                            <label for="access-level">Publication Visibility</label>
                            <multiselect
                                v-model="visibility.value"
                                :options="visibility.options"
                                :allowEmpty="false"
                                :showLabels="false"
                            >
                            </multiselect>
                        </div>
                        <div class="form-group">
                            <label class="h2" for="title_of_publication">Title</label>
                            <input type="text" class="form-control" placeholder="Title" v-model="title">
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
                            <textarea type="text" class="form-control" placeholder="Abstract" rows="5" v-model="abstract"></textarea>
                        </div>
                        <div class="form-group" v-if="doiVisible">
                            <label class="h2" for="doi">DOI (Optional)</label>
                            <input type="text" class="form-control" placeholder="DOI" v-model="doi">
                        </div>
                        <div id="drop-area">
                            <div class="my-form">
                                <p>Upload a PDF version of the article</p>
                                <input type="file" id="fileElem" accept="application/pdf" @change="handleFiles">
                                <label class="btn btn-secondary" for="fileElem">Choose File(s)</label>
                                <button class="float-right btn btn-primary" @click="submitForm">Upload Publication</button>
                            </div>
                            <small id="fileWarning" class="form-text text-muted">PDF</small>
                            <progress id="progress-bar" max=100 value=0></progress>
                            <div id="gallery">
                                <b-button
                                    v-for="file in files" :key="file.name"
                                    disabled
                                >
                                    {{ file.name }}
                                </b-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import upload from '@/util/upload';
import calendar from '@/util/calendar';

export default {
    components: { Multiselect },
    data: function(){
        return {
            pubType: {
                value: 'Article',
                options: ["Article", "Book", "Chapter", "Code", "Conference Paper", "Cover Page", "Data", "Experiment Findings", "Method", "Negative Results", "Patent", "Poster",
                "Preprint", "Presentation", "Raw Data", "Technical Report", "Thesis", "Research"]
            },
            visibility:{
                value: 'Accessible to Anyone',
                options: ["Accessible to Anyone", "Accessible on Request", "Not Accessible"]
            },
            title: '',
            authors: {
                value: [],  
                options: [
                    {
                        name: "Samuel Bell",
                        code: "sib170001"
                    },
                    {
                        name: "Anon Laosirilurchakai",
                        code: "axl164630"
                    },
                ]
            },
            abstract: '',
            doi: '',
            date: {
                selected: {
                    day: 1,
                    month: calendar.months[0],
                    year: 1970,
                },
                options: {
                    days: [],
                    months: calendar.months,
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
    mounted: function(){
        var uploadElement = document.getElementById('drop-area');
        upload.init(uploadElement, this.files);

        var now = new Date();
        for(var i=now.getFullYear() + 2; i > 1940; i--)
            this.date.options.years.push(i);

        var selected = this.date.selected;
        selected.year = now.getFullYear();
        selected.month = this.date.options.months[now.getMonth()];
        selected.day = now.getDate();

        this.updateDayOptions();
    },
    methods:{
        handleFiles: function(event){
            let selectedFiles = [...event.target.files];
            
            this.files.length = 0;
            selectedFiles.forEach(file => {
                this.files.push(file);
            });
        },
        addTag: function (newTag) {
            const tag = {
                name: newTag,
                //"But random isn't unique!" - tell it to the docs: https://vue-multiselect.js.org/#sub-tagging
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }

            var authors = this.authors;
            authors.options.push(tag);
            authors.value.push(tag);
        },
        submitForm: function(){
            this.$ga.event('expert', 'upload', this.title);
            upload.upload(
                this.$endpoints.aspnet + 'upload',
                {
                    type: this.pubType.value,
                    visibility: this.visibility.value,
                    title: this.title,
                    authors: this.authors.value.map(x => x.name),
                    date: {
                        day: this.date.selected.day,
                        month: this.date.selected.month.index,
                        year: this.date.selected.year
                    },
                    abstract: this.abstract,
                    doi: this.doi
                },
                this.files,
                document.getElementById('progress-bar')
            );
        },
        //Update the days options for the multiselect to reflect the number of days of the selected month.
        updateDayOptions: function(){
            let selected = this.date.selected;

            let numDays = calendar.getNumDays(selected.month.index, selected.year);
            let days = this.date.options.days;
            if(days.length === numDays)
                return;

            days.length = 0;
            for(let i=1; i <= numDays; i++)
                days.push(i);

            if(selected.day > numDays)
                selected.day = numDays;
        },
        //Make sure that the days dropdown has 28/29 days in the month of February depending on if it's a leap year.
        updateIsLeapYear: function(){
            if(this.date.selected.month.index === 1){
                this.updateDayOptions();
            }
        }
    },
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