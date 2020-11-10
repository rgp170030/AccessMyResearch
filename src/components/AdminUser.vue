<template>
  <div style="padding-top: 10px">
    <b-card
      bg-variant="primary"
      body-text-variant="white "
      style="text-align: left; height: 73px "
      sizes
      block>
      (username here)
      <div style="width: 300px; display: inline-block; padding-left: 100px">
        <multiselect
          v-model="value"
          :options="options"
          :close-on-select="false"
          :show-labels="false"
          placeholder="User role here"
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
  data() {
    return {
      value: "",
      options: ["admin", "expert", "user"],
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