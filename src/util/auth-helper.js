import { Auth } from "aws-amplify"

const GroupToRoles = {
    "AMR_Admin": "Administrator"
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
        let roles = [];

        if(user == null){
            user = await getCurrentUser();
            if(user == null)
                return roles;
        }

        const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
        for (var i = 0; i < groups.length; i++) {
            let role = GroupToRoles[groups[i]];
            if(role != null)
                roles.push(role);
        }

        return roles;
    },
    isAdmin: async function (user) {
        let roles = await AuthHelperRoles.getUserRoles(user);
        return roles.includes("Administrator");
    },
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