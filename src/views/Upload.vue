<template>
    <div>
        <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"></base-header>
        <card class="min-vh-100 main_body center">
            <div class="row card text-black">
                <div class="col-lg mx-auto form p-4">
                    <form>
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
                                <input type="file" id="fileElem" multiple accept="image/*" @change="handleFiles">
                                <label class="btn btn-secondary" for="fileElem">Choose File(s)</label>
                                <button type="submit" class="float-right btn btn-primary">Upload Article</button>
                                <small id="fileWarning" class="form-text text-muted">PDF/PNG/JPEG</small>
                            </form>
                            <progress id="progress-bar" max=100 value=0></progress>
                            <div id="gallery" ></div>
                        </div>
                    </form>
                </div>
            </div>
        </card>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect';

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
                    month: 0,
                    year: 1970,
                },
                options: {
                    months: [
                        {
                            name: "January",
                            days: 31
                        },
                        {
                            name: "February",
                            days: 28
                        },
                        {
                            name: "March",
                            days: 31
                        },
                        {
                            name: "April",
                            days: 30
                        },
                        {
                            name: "May",
                            days: 31
                        },
                        {
                            name: "June",
                            days: 30
                        },
                        {
                            name: "July",
                            days: 31
                        },
                        {
                            name: "August",
                            days: 31
                        },
                        {
                            name: "September",
                            days: 30
                        },
                        {
                            name: "Spooktober",
                            days: 31
                        },
                        {
                            name: "November",
                            days: 30
                        },
                        {
                            name: "December",
                            days: 31
                        },
                    ],
                    years: []
                }
            }
        };
    },
    computed: {
        doiVisible: function(){
            return this.pubType.value === "Article";
        }
    },
    methods:{
        handleFiles: function(event){
            console.log(event.target.files);
        },
        tag: function (args){
        },
        addTag: function (newTag) {
            const tag = {
                name: newTag,
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }
            this.options.push(tag)
            this.value.push(tag)
        }
    },
    mounted: function(){
        var now = new Date();
        var selected = this.date.selected;
        selected.day = now.getDay();
        selected.month = now.getMonth();
        selected.year = now.getFullYear();

        for(var i=now.getFullYear() + 2; i > 1940; i--){
            this.date.options.years.push(i);
        }
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
</style>