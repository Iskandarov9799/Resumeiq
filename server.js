const express = require("express");
const routes = require("./routes/routes");
const app = express();
const mongo = require("./modules/mongo");
const { router } = require("./routes/HomeRoute");

app.listen(process.env.PORT || 8090); //Default port

app.set(express.json());
app.use(express.urlencoded({
    extended: true,
})
);

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");


async function main(){
    const db = await mongo();
    
    await app.use((req, res, next) =>{
        req.db = db;
        next();
    })


    await routes(app) 
}

main();


