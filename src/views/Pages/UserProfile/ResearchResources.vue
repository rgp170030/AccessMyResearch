<template>
  <div>
    <card class="min-vh-100 main_body center">
      <div class="row card text-black">
        <div class="col-lg mx-auto form p-4">
          <div id="mainUpload">
            <div class="form-group">
              <label class="h2" for="pub-type">Resources</label>
              <multiselect
                v-model="pubType.value"
                :options="pubType.options"
                :allowEmpty="false"
                :showLabels="false"
              >
              </multiselect>
            </div>
            <div class="form-group" v-if="pubType.value==='fMRI Machines'">
              <label for="access-level">Sub options</label>
              <multiselect
                v-model="visibility.value"
                :options="visibility.options"
                :allowEmpty="false"
                :showLabels="false"
              >
              </multiselect>
            </div>
            <div>
              <label class="h2">Date</label>
              <div>
                <b-form-datepicker v-model="value" :min="min" :max="max" locale="en"></b-form-datepicker>
              </div>
            </div>

            <div class="form-group">
              <label class="h2" for="Abstract">Add Note</label>
              <textarea type="text" class="form-control" placeholder="Any special accommodations?" rows="5" v-model="abstract"></textarea>
            </div>

            <button class="float-right btn btn-primary" @click="submitForm">Submit Request</button>

          </div>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  name: 'ResearchResources',
  data(){
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    // min and max date

    const minDate = new Date(today)
    minDate.setMonth(today.getMonth())
    minDate.setDate(today.getDay()+1)
    const maxDate = new Date(today)
    maxDate.setMonth(today.getMonth()+1)
    maxDate.setDate(today.getDay()+1)
    return {
      value: '',
      min: minDate,
      max: maxDate,
      pubType: {
        value: '',
        options: ['Clean Labs', 'fMRI Machines']
      },
      visibility:{
        value: 'fMRI 1',
        options: ["fMRI 1", "fMRI 2", "fMRI 3"]
      },

      abstract: '',

    };
  },
  methods:{
    submitForm: function(){
      console.log('Submitted')
    },
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
