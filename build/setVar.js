const setVar = (comandText) => {
    let vars = [
        {
            varName: "",
            varValue: [],
        },
    ];
    let comandSimulator = JSON.parse(JSON.stringify(comandText));
    let smiqulenoutCounter = 0;
    for (let i = 0; comandSimulator.indexOf(";") !== -1; i++) {
        comandSimulator[comandSimulator.indexOf(";")] = " ";
        smiqulenoutCounter++;
    }
    for (let j = 0; ; j++) {
        smiqulenout = comandText.indexOf(";");
        let dolar = comandText.indexOf("$");
        comandText[dolar] = " ";
        for (let i = dolar + 1; i < comandText.indexOf("$"); i++) {
            vars[j].varName += comandText[i];
            comandText[i] = " ";
        }
        dolar = comandText.indexOf("$");
        //repace any inner text by a tag like [s,m,i,$,%] and than serch and replace it by ;
        comandText[dolar] = " ";
        let singleQuoteFillterSmiqulenout = comandText.indexOf("'");
        if (singleQuoteFillterSmiqulenout !== -1) {
            if (
                comandText.indexOf("$") > singleQuoteFillterSmiqulenout ||
                comandText.indexOf("$") === -1
            ) {
                comandText[singleQuoteFillterSmiqulenout] = "";
                for (
                    let i = singleQuoteFillterSmiqulenout + 1;
                    i < comandText.indexOf("'");
                    i++
                ) {
                    if (comandText[i] === ";") {
                        comandText[i] = { call: "smiqulenoutCounter" };
                        smiqulenoutCounter--;
                    }
                    if (comandText[i] === "=") {
                        comandText[i] = { call: "equal" };
                    }
                }
                comandText[singleQuoteFillterSmiqulenout] = "'";
            }
        }
        let equal = comandText.indexOf("=");
        comandText[equal] = " ";
        for (let i = equal + 1; i < comandText.indexOf(";"); i++) {
            vars[j].varValue.push(comandText[i]);
            comandText[i] = " ";
        }
        smiqulen = comandText.indexOf(";");
        comandText[smiqulen] = " ";
        if (vars[j].varValue.indexOf("'") === -1) {
            vars[j].varValue = vars[j].varValue.filter((item) => item !== " ");
        } else {
            let singleQuote = vars[j].varValue.indexOf("'");
            vars[j].varValue = vars[j].varValue;
            for (let i = 0; i < singleQuote; i++) {
                vars[j].varValue[i] = "";
            }
            vars[j].varValue[singleQuote] = "";
            singleQuote = vars[j].varValue.indexOf("'");
            for (let i = singleQuote + 1; i < vars[j].varValue.length; i++) {
                vars[j].varValue[i] = "";
            }
            vars[j].varValue.unshift("'");
        }
        vars[j].varValue.map((item, index) => {
            if (item.call==="smiqulenoutCounter") {
                //replace the item with ; in the varvalue
                vars[j].varValue[index] = ";";
            }
            if (item.call==="equal") {
                //replace the item with = in the varvalue
                vars[j].varValue[index] = "=";
            }
        });
        vars[j].varValue = vars[j].varValue.join("");
        if (comandText.indexOf("$") === -1) {
            if (vars.length !==1) {
                if (vars.length !== smiqulenoutCounter) {
                    console.log(vars.length+"\n"+smiqulenoutCounter);
                    throw new Error("2:un expected amound of smiqulenout in the varubals");
                }
            }
            vars.push({
                varName: "q",
                varValue: '"',
            });
            vars.push({
                varName: "a",
                varValue: '@',
            });
            return vars;
        } else {
            vars.push({
                varName: "",
                varValue: [],
            });
        }
    }
};
module.exports = setVar;
