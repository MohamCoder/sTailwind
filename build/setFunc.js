const { writeFileSync } = require("fs");

const setFunctions = (comandText,comand=[]) => {
    let start = comand.join('').indexOf("function");
    const functionProp = getFunctionArgs(comand)
    comand.splice(start, 9)
    //convertToBrackets(comandText)
    //write file not async:
    writeFileSync(`build/functions/${comand.filter((item) => item !== " ").join("")}.js`, `function ${comand.join('')}(${functionProp}){${comandText.join('')}};module.exports=${comand.join("")};`)
    return comand.join("")
}
const getFunctionArgs = (text) => {
    let start = text.indexOf('(')
    if (start === -1) {
        throw new Error("unexpected '(' at a function name");
    }
    text[start] = "";
    let end = text.indexOf(')')
    if (end === -1) {
        console.log(text,start,end);
        throw new Error("unexpected ')' at a function name");
    }
    text[end] = "";
    let FunctionArgs =text.splice(start + 1, end - start - 1);
    return FunctionArgs.join("").split(",");
}
module.exports=setFunctions
