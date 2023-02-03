/* eslint-disable no-undef */
/* Initialising the supertokens library. */
import variables from "../../env_variables";
// developmemt config
supertokens.init({
    appInfo: {
        apiDomain: `${variables.ip}`,
        apiBasePath: "/supertokens",
        appName: "Courage's Server",
    },
    recipeList: [supertokensEmailPassword.init(), supertokensSession.init()],
});