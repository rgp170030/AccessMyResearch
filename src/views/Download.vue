<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"></base-header>
    <card class="min-vh-100 main_body center">
      <div class="row card text-black">
        <div class="col-lg mx-auto form p-4">
          <!-- <div>
            <b-button :disabled="selected[0]!=='agree'" size="lg" variant="primary" @click="popUp">Disabled</b-button>
          </div> -->
          <div>
            <!-- <p>
              To download, check this box here
            </p> -->
            <b-form-group>
            <b-form-checkbox-group v-model="selected" :options="options" plain='flase'>  </b-form-checkbox-group>
            <b-button :disabled="selected[0]!=='agree'" size="lg" variant="primary" @click="popUp">Download</b-button>
            </b-form-group>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
  export default {
    name: 'Download',
    data() {
      return {
        selected: '', // Must be an array reference!
        options: [
          { text: 'Accept the terms and conditons Agreement for AMR', value: 'agree' },
        ]
      }
    },
    methods: {
      popUp() {

      }
    }
  }
</script>