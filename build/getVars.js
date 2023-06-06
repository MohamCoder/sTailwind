const getVars = (
    contantApp,
    refVars
) => {
    let appContatn="";
    const getVarsHelper = (contant) => {
        let dolar = contant.indexOf("$");
        if (dolar === -1) return contant;
        contant[dolar] = "";
        //before text
        let toRef = "";
        let contantToPlace = contant.split("");
        //the on work text
        let onWorkContant = contantToPlace.splice(dolar + 1);
        //start building the input
        contantToPlace[contantToPlace.length - 1] = "";
        for (let i = 0; i < onWorkContant.indexOf("$"); i++) {
            toRef += onWorkContant[i];
            onWorkContant[i] = "";
        }
        onWorkContant[onWorkContant.indexOf("$")] = "";
        refVars.map((item) => {
            item.map((items) => {
                if (items.varName === toRef) {
                    contantToPlace.push(items.varValue.split("").filter((item) => item !== "'").join(""));
                }
            })
        });
        return (contantToPlace.join("") + getVars(onWorkContant.join(""), refVars));
    }
    appContatn = getVarsHelper(contantApp);
    for (; appContatn.split("").indexOf("$") !== -1;) {
        appContatn = getVarsHelper(appContatn);
    }
    return appContatn
};
module.exports = getVars