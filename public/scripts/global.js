/* eslint-disable no-undef */
/* Initialising the supertokens library. */

// developmemt config
supertokens.init({
    appInfo: {
        apiDomain: "http://localhost:3000",
        apiBasePath: "/supertokens",
        appName: "Courage's Server",
    },
    recipeList: [supertokensEmailPassword.init(), supertokensSession.init()],
});