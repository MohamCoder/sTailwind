const searchComponent = (arry = []) => {
  propertys = [
    {
      comand: [],
      comandText: [],
    },
  ];
  arry = arry.map((s) => s.replace(/[\n\r]/g, " "));
  for (let j = 0; ; j++) {
    let charp = arry.indexOf("#");
    let pushAble = false;
    let runSharp = false;
    if (charp === -1) {
      return { propertys ,arry};
    } else {
      arry[charp] = " ";
    }
    for (let i = charp + 1; i < arry.length; i++) {
      if (arry[i] !== "#") {
        if (!runSharp) {
          propertys[j].comand.push(arry[i]);
          arry[i] = " ";
        }
      } else {
        runSharp = true;
        arry[i] = " ";
      }
      if (arry[i] === "(") {
          pushAble = true;
          arry[i] = " ";
      }
      if (arry[i] === ")") {
        pushAble = false;
        arry[i] = " ";
        propertys.push({
          comand: [],
          comandText: [],
        });
        break;
      }
      pushAble && propertys[j].comandText.push(arry[i]);
      arry[i] = " ";
    }
  }
};
module.exports = searchComponent;