import { Auth } from "aws-amplify"

const GroupToRoles = {
    "AMR_Admin": "Administrator",
    "AMR_Expert": "Expert"
}

const RolesToGroups = {
    "Administrator": "AMR_Admin",
    "Expert": "AMR_Expert"
}

async function getCurrentUser(){
    try{
        return await Auth.currentAuthenticatedUser();
    }catch(e){
        return null;
    }
}

let AuthHelperRoles = {
    userRoles: ["Administrator", "Expert"],
    getUserRoles: async function (user) {
        // the array of groups that the user belongs to
        if(user == null){
            user = await getCurrentUser();
            if(user == null)
                return [];
        }

        const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
        return AuthHelperRoles.translateGroupsToRoles(groups).roles;
    },
    isAdmin: async function (user) {
        let roles = await AuthHelperRoles.getUserRoles(user);
        return roles.includes("Administrator");
    },
    isExpert: async function (user) {
        let roles = await AuthHelperRoles.getUserRoles(user);
        return roles.includes("Expert");
    },
    translateGroupsToRoles: function(groups){
        let roles = [];
        let nativeGroups = [];

        if(!groups) groups = [];

        for (var i = 0; i < groups.length; i++) {
            let role = GroupToRoles[groups[i]];
            if(role != null)
                roles.push(role);
            else nativeGroups.push(groups[i]);
        }

        return { roles, nativeGroups };
    },
    translateRolesToGroups: function(roles, nativeGroups){
        let groups = [];

        if(!roles) roles = [];

        for(var i=0;i<roles.length;i++){
            let group = RolesToGroups[roles[i]];
            if(group != null)
                groups.push(group);
        }

        if(nativeGroups == null)
            nativeGroups = [];

        return groups.concat(nativeGroups);
    }
}

let AuthHelperAxios = {
    attachAuthenticationHeader: async function(options){
        let user = await getCurrentUser();
        if(user == null)
            return;

        if(options.headers == null){
            options.headers = {};
        }

        options.headers["Authorization"] = `Bearer ${user.signInUserSession.accessToken.jwtToken}`;
    }
}

export { Auth, AuthHelperRoles, AuthHelperAxios };