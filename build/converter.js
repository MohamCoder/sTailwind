const fs = require("fs");
const path = require("path");
const setVar = require("./setVar.js");
const setFunctions = require("./setFunc.js");
let vars = [];
let functionNames=[]
const converter = (objectArray = [
  {
    comand: [],
    comandText: [],
  }
], loop
) => {
  let finalresult = "";
  objectArray.map((object) => {
    if (object.comand.join("").includes("function")) {
      if (!loop){
        functionNames.push(setFunctions(object.comandText, object.comand));
      }
    } else if (object.comand.join("") === "root") {
      object.comandText = object.comandText
        .join("")
        .split(" ")
        .filter((item) => item !== "");
      if (!loop) {
        vars.push(setVar(object.comandText.join(" ").split("")));
      }
    } else {
      object.comandText = object.comandText
        .join("")
        .split(" ")
        .filter((item) => item !== "");
      object.comandText.map((item) => {
        finalresult += `${object.comand.join("")}:${item} `;
      });
    }
  })
  return [finalresult, vars, functionNames];
};
module.exports = converter;