<template>
<div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"></base-header>
    <div class="category-container">
        <InterestCategory 
            v-for="(topic, index) in model.categories" :key="topic"
            :prop="{topic: topic, index: index}"
            v-on:category-select="selectCategory">
        </InterestCategory>
    </div>
    
    <InterestTopics
        :topics="model.selectedTopics"
    >
    </InterestTopics>
    <div class="category-container">
        <b-button type="submit" variant="danger" class="btn btn-info" inline @click="dbStuff">Save</b-button>
        <b-button type="submit" variant="danger" class="btn btn-info" to="home" inline>Skip</b-button>
    </div>
</div>
</template>

<script>
import InterestCategory from '@/components/Interests/InterestCategory.vue';
import InterestTopics from '@/components/Interests/InterestTopics.vue';

export default {
    data: function() {
        return {
            model: {
                categories: ["Category 1", "Category 2"],
                selectedTopics: []
            }
        };
    },
    methods: {
        selectCategory: function (topics) {
            this.model.selectedTopics = topics;
        },
        dbStuff: function(event){
            alert("dbStuff");
        }
    },
    components: {
        InterestCategory,
        InterestTopics
    }
};
</script>

<style scoped>
.category-container {
    position: relative;
    width: 100%;
    text-align: center;
}
</style>
