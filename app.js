//requires
const fs = require("fs");
const path = require("path");
const buildApp = require("./build/builder.js");
const getVars = require("./build/getVars.js");
const { create } = require("domain");
//input
console.time("time");
let contant = fs.readFileSync(path.resolve("src", "input.html"), "utf-8");
if (!fs.existsSync(path.resolve('build', 'functions'))) {
    fs.mkdir(path.resolve('build', 'functions'), (err) => {
        if (err) {
            throw err;
        }
        console.log('Directory created!');
    });
}
if (contant.indexOf("class") === -1) {
    //no classes
    fs.writeFileSync(path.resolve("src", "index.html"), contant);
} else {
    //app
    let { app, vars, functionNames } = buildApp(contant, false);
    let appWithVars = getVars(contant, vars, functionNames,false);
    app = buildApp(appWithVars, true);
    fs.writeFileSync(path.resolve("src", "index.html"), app.app);
}
console.timeEnd("time");
console.log("done");