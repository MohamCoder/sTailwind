const { writeFileSync } = require("fs");
const path = require("path");
const getFunc = (refFunctionNames, toRef = "") => {
    const functionName = toRef.split("(")[0].trim();
    const args = toRef.slice(toRef.indexOf("("), toRef.indexOf(")") + 1);

    if (refFunctionNames.includes(functionName)) {
        const filePath = path.resolve("build", "getFuncContant.js");
        writeFileSync(
            filePath, 
            `const ${functionName} = require('./functions/${functionName}.js');
            let contant = ${functionName}${args};
            module.exports = contant;`
        );
        delete require.cache[require.resolve(filePath)];
        const contant = require(filePath);
        return contant;
    }
};

module.exports = getFunc;
