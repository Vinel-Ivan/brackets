module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const buffer = [];

  for (let i=0; i < str.length; i++) {
    const conf = str[i];
    const rule1 = bracketsConfig.filter(i => i[0] === conf);
    const rule2 = bracketsConfig.filter(i => i[1] === conf);
    const rule3 = (popedItem) => !rule2.some(i => i[0] === popedItem);

    if (rule1.length !== 0 && rule2.length === 0) {
      stack.push(conf);
      continue;
    } else if (rule2.length !== 0 && rule1.length === 0) {
      const popedItem = stack.pop();
      if (rule3(popedItem)) {
        return false;
      }
      continue;
    }

    if(rule1.length !== 0 && buffer[buffer.length - 1] !== conf) {
      stack.push(conf);
      buffer.push(conf);
    } else {
      stack.pop();
      buffer.pop();
    }
  }

  return stack.length === 0;
}

