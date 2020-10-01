<template>
<div class="interest-tab">
    <base-button type="primary" class="my-4" @click="$emit('category-select', model.topics)">{{ prop.topic }}</base-button>
</div>
</template>

<script>
export default {
    props: ["prop"],
    data: function () {
        return {
            model: {
                icon: '123123123',
                topics: [
                    {
                        name: 'Topic 1',
                        isSet: false
                    },
                    {
                        name: 'Topic 2',
                        isSet: false
                    },
                    {
                        name: 'Topic 3',
                        isSet: false
                    },
                    {
                        name: 'Topic 4',
                        isSet: false
                    }
                ]
            }
        };
    }
}
</script>

<style scoped>
.interest-tab {
    display: inline-block;
    padding-left: 10px;
}
</style>