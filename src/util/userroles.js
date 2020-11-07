

export default {
    isAdmin: function (user) {
        // the array of groups that the user belongs to
        const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
        for (var i = 0; i < groups.length; i++) {
            switch (groups[i]) {
                case "AMR_Admin":
                    return true;
            }
        }

        return false;
    },
    getUserRoles: function (user) {
        // the array of groups that the user belongs to
        var roles = [];

        const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
        for (var i = 0; i < groups.length; i++) {
            switch (groups[i]) {
                case "AMR_Admin":
                    roles.push("Administrator");
                    break;
            }
        }

        return roles;
    }
}