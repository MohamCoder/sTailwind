//requires
const fs = require("fs");
const path = require("path");
const buildApp = require("./build/builder.js");
const getVars = require("./build/getVars.js");
//input
console.time("time");
let contant = fs.readFileSync(path.resolve("src", "input.html"), "utf-8");
if (contant.indexOf("class") === -1) {
    //no classes
    fs.writeFileSync(path.resolve("src", "index.html"), contant);
} else {
    //app
    let { app, vars } = buildApp(contant, false);
    let appWithVars = getVars(contant, vars);
    app = buildApp(appWithVars, true);
    fs.writeFileSync(path.resolve("src", "index.html"), app.app);
}
console.timeEnd("time");
console.log("done");