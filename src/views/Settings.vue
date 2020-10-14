<template>
    <div>
        <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"></base-header>

        <b-tabs>
            <ignored-users-tab></ignored-users-tab>
        </b-tabs>

        <!--<card class="min-vh-100 main_body center">
            <div class="row card text-black">
                <div class="col-lg mx-auto form p-4">
                    <p> This will be the settings page</p>
                </div>
            </div>
        </card>-->
    </div>
</template>

<script>
import ManageIgnoredUsersTab from "@/components/Settings/ManageIgnoredUsersTab";

export default {
    components:{
        ignoredUsersTab: ManageIgnoredUsersTab
    }
}
</script>