<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"></base-header>
    <card class="min-vh-100 main_body center">
      <div class="row card text-black">
<<<<<<< HEAD
        <div >
          <!-- <div>
            <b-button :disabled="selected[0]!=='agree'" size="lg" variant="primary" @click="popUp">Disabled</b-button>
          </div> -->
=======
        <div class="col-lg mx-auto form p-4">
>>>>>>> 63646c7d58b6cc3681abd4cc3ede79be5ff4e912
          <div>
            <b-form-group>
<<<<<<< HEAD
            <b-form-checkbox-group v-model="selected" :options="options" plain='flase'>  </b-form-checkbox-group>
            <b-button :disabled="selected[0]!=='agree'" size="lg" variant="primary" @click="popUp">Download</b-button>
             
=======
            <b-form-checkbox-group v-model="selected" :options="options" plain='false'>  </b-form-checkbox-group>
              <br>
              <button type="button" class="a" :disabled="selected[0]!=='agree'" @click="popUp">Download</button>
>>>>>>> 63646c7d58b6cc3681abd4cc3ede79be5ff4e912
            </b-form-group>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
  import VueHcaptcha from '@hcaptcha/vue-hcaptcha';
  export default {
    name: 'Download',
    components: { VueHcaptcha },

    data() {
      return {
        selected: '', // Must be an array reference!
        options: [
          { text: 'Accept the terms and condition agreement for AMR', value: 'agree' },
        ],
        showModal: false,
        modalText: '',
      }
    },
    methods: {
      popUp() {
        window.alert("Download will begin now")
      },
      popupCenter(url, title, w, h) {
        const left = (screen.width / 2) - (w / 2);
        const top = (screen.height / 2) - (h / 2);
        return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
  }
    }
  }


</script>

<style>
.a {
  background-color: #4566b8;
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.a:disabled {
  background-color: #4566b8;
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  opacity: 0.6;
  cursor: not-allowed;
}
</style>