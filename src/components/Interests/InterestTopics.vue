<template>
<div class="topic-list">
    <b-form-checkbox
        v-for="topic in topics" :key="topic.name"
        v-model="topic.isSet"
        inline
    >
    {{ topic.name }}
    </b-form-checkbox>
</div>
</template>

<script>
export default {
    props: ["topics"],
    data: function() {
        return {
        };
    }
};
</script>

<style scoped>
</style>