const converter = require("./converter.js");
const searchComponent = require("./searchComponent.js");
let vars = [];
const buildApp = (contantForBuild,loop) => {
    const builder = (contant) => {
        let startByClass = contant.indexOf("class");
        if (startByClass === -1) return console.error("class not found");
        //before text
        let contantToPlace = contant.split("");
        //the on work text
        let onWorkContant = contantToPlace.splice(startByClass);
        //start building the input
        let firstQuote = onWorkContant.indexOf('"');
        if (firstQuote === -1) return contant;
        onWorkContant = onWorkContant.splice(firstQuote + 1);
        contantToPlace = contantToPlace.join("") + 'class="';
        let lastQuote = onWorkContant.indexOf('"');
        //input build
        InputComands = onWorkContant.splice(0, lastQuote);
        //set uped
        let { propertys, arry } = searchComponent(InputComands);
        const willBuild = (work) => {
            if (work.indexOf("class") === -1) return work;
            return builder(work);
        }
        const [finalresult, converterVars] = converter(propertys,loop);
        vars = converterVars;
        return (
            contantToPlace +
            arry
                .join("")
                .split(" ")
                .filter((items) => items !== "")
                .join(" ") +
            " " +
            finalresult +
            willBuild(onWorkContant.join(""))
        );
    }
    let app = builder(contantForBuild);
    return { app, vars };
}
module.exports = buildApp;