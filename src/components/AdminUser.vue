<template>
  <div style="padding-top: 10px">
    <b-card
      bg-variant="primary"
      body-text-variant="white "
      style="text-align: left; "
      sizes
      block
    >
      {{ username }}
      <div style="max-width: 600px; display: inline-block; padding-left: 100px">
        <multiselect
          :value="value"
          @input="$emit('input', $event)"
          :options="options"
          :close-on-select="false"
          :show-labels="false"
          placeholder="User roles here"
          :multiple="true"
        >
        </multiselect>
      </div>
      <div style="display: inline-block; padding-left: 100px">
        <b-icon
          icon="x-circle"
          animation="fade"
          @click="say('something')"
          font-scale="2"
        ></b-icon>
      </div>
    </b-card>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  components: {
    Multiselect,
  },
  props: {
    value:{
      type: Array,
      required: true
    },
    username:{
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    };
  },
  methods: {
    say: function (message) {
      alert(message);
    },
  },
};
</script>

<style scoped>
</style>