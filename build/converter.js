const fs = require("fs");
const path = require("path");
const setVar = require("./setVar.js");
let vars = [];
const converter = (objectArray = [
  {
    comand: [],
    comandText: [],
  }
],loop
) => {
  let finalresult = "";
  objectArray.map((object) => {
    object.comandText = object.comandText
      .join("")
      .split(" ")
      .filter((item) => item !== "");
    
    if (object.comand.join("") === "root") {
      if (!loop) {
        vars.push(setVar(object.comandText.join(" ").split("")));
      }
      }else {
      object.comandText.map((item) => {
          finalresult += `${object.comand.join("")}:${item} `;
      });
    }
  })
  return [finalresult,vars];
};
module.exports = converter;