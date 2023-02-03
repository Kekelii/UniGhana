import Express from "express";
import cors from "cors";
// import cookieParser from 'cookie-parser'
import verfy from "./middlewares/verfy.js";
import { engine } from "express-handlebars";
import supertokens from "supertokens-node";
import variables from "./env_variables.js";
import {
    middleware,
    errorHandler,
} from "supertokens-node/framework/express/index.js";
import { verifySession } from "supertokens-node/recipe/session/framework/express/index.js";
import "./supertokens_init.js";
import db from './database/db.js'




//initializing express
const app = Express();


/* This is setting up the middlewares for the express server. */
app.use(Express.json());

/* This is setting up the handlebars templating engine. */
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");




/* This is setting up the middlewares for the express server. */
app.use("/app", Express.static("public"));
app.use(
    cors({
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        credentials: true,
    })
);
app.use(middleware());






//frontend routes
app.get("/", (req, res) => {
    res.redirect("/app/signup")
        // res.send('test')
})
app.get("/app/signup", (req, res) => {
    res.render("signup");
});
app.get("/app/signin", (req, res) => {
    res.render("signin");
});

app.get("/app/reset-password", (req, res) => {
    res.render("resetpassword");
});
app.get("/app/home", verfy, verifySession(), (req, res) => {


    res.render("home");



});


app.use(errorHandler());



app.listen(variables.Port, () => console.log(`listening on ${variables.Port}`));