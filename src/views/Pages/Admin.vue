<template>
    <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary" ></base-header>
    <AdminUser >
    </AdminUser>
    <AdminUser >
    </AdminUser>
    </div>
  
</template>

<script>

import AdminUser from '@/components/AdminUser.vue';

export default {
        components: {
        AdminUser      
    }
    
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>