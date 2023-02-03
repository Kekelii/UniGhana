/* eslint-disable no-undef */
/* Initialising the supertokens library. */

// developmemt config
supertokens.init({
    appInfo: {
        apiDomain: "http://172.104.244.82:3000",
        apiBasePath: "/supertokens",
        appName: "Courage's Server",
    },
    recipeList: [supertokensEmailPassword.init(), supertokensSession.init()],
});