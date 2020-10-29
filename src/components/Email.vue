<template>
  <div>
    <multiselect
      v-model="selectedEmails"
      :options="emails"
      :multiple="true"
      :close-on-select="false"
      :preserve-search="true"
      placeholder="Choose Emails"
      :preselect-first="true"
      class="form-pad"
    >
    </multiselect>

    <input
      type="text"
      v-model="subject"
      class="form-control form-pad"
      placeholder="Subject"
    />
    <textarea
      type="text"
      v-model="message"
      class="form-control form-pad"
      placeholder=""
      rows="7"
    ></textarea>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  props: ["emails"],
  data() {
    return {
      selectedEmails: [],
      subject: "",
      message: "\n\n\n\n\nSent from AccessMyResearch (AMR)",
    };
  },
  components: {
    Multiselect
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.interest-tab {
  display: inline-block;
  padding-left: 10px;
}

.form-pad {
  margin-bottom: 20px;
}
</style>