const getFunc = require('./getFunc')
const getVars = (
    contantApp,
    refVars,
    refunctionNames,
    spacalInMain
) => {
    let appContatn="";
    const getVarsHelper = (contant,spacalIn) => {
        let dolar = contant.indexOf("$");
        if(spacalIn){dolar=contant.indexOf('#')}
        if (dolar === -1) return contant;
        contant[dolar] = "";
        //before text
        let toRef = "";
        let contantToPlace = contant.split("");
        //the on work text
        let onWorkContant = contantToPlace.splice(dolar + 1);
        //start building the input
        contantToPlace[contantToPlace.length - 1] = "";
        let comapre = onWorkContant.indexOf("$");
        if (spacalIn) {
            comapre = onWorkContant.indexOf('#')
            onWorkContant[comapre]=""
        }
        for (let i = 0; i < comapre; i++) {
            toRef += onWorkContant[i];
            onWorkContant[i] = "";
        }
        if (toRef.includes("(") || toRef.includes(")")) {
            toRef = getVars(toRef, refVars, refunctionNames, true);
            contantToPlace.push(getFunc(refunctionNames, toRef));
        }
        onWorkContant[onWorkContant.indexOf("$")] = "";
        refVars.map((item) => {
            item.map((items) => {
                if (items.varName === toRef) {
                    if (spacalIn) {
                        contantToPlace.push(items.varValue);
                    } else {
                        contantToPlace.push(items.varValue.split("").filter((item) => item !== "'").join(""));
                    }
                }
            });
        });
        return (contantToPlace.join("") + getVarsHelper(onWorkContant.join("")));
    }
    if (spacalInMain) {
        appContatn = getVarsHelper(contantApp,true);
        while (appContatn.split("").indexOf("$") !== -1) {
            appContatn = getVarsHelper(appContatn,false);
        }
        return appContatn
    }
    appContatn = getVarsHelper(contantApp);
    while (appContatn.split("").indexOf("$") !== -1) {
        appContatn = getVarsHelper(appContatn,false);
    }
    return appContatn
};
module.exports = getVars