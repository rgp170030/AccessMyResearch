<template>
<div>
    <input type="text" class="form-control" :placeholder="email" disabled>
    <input v-model="message" type="text" class="form-control" placeholder="Subject">
    <textarea type="text" class="form-control" placeholder="" rows="7">
        
        
        


Sent from AMR</textarea></div>
</template>

<script>    
export default {
    props: ['email'],
    
}
</script>

<style scoped>
.interest-tab {
    display: inline-block;
    padding-left: 10px;
}
</style>