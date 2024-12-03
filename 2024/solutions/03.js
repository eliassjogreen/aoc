function evaluate(string) {
  let enabled = true;
  let sum = 0;
  for (let i = 0; i < string.length; i++) {
    if (string.slice(i, i + 7) === "don't()") {
      i += 7;
      enabled = false;
    }

    if (string.slice(i, i + 4) === "do()") {
      i += 4;
      enabled = true;
    }

    if (string.slice(i, i + 4) === "mul(") {
      i += 4;

      let l = "";
      while (string[i].charCodeAt(0) >= 48 && string[i].charCodeAt(0) <= 57) {
        l += string[i++];
      }

      if (string[i++] !== ",") {
        continue;
      }

      let r = "";
      while (string[i].charCodeAt(0) >= 48 && string[i].charCodeAt(0) <= 57) {
        r += string[i++];
      }

      if (string[i] !== ")") {
        continue;
      }

      if (enabled) {
        sum += Number.parseInt(l) * Number.parseInt(r);
      }
    }
  }
  return sum;
}

print(evaluate(readTextFile("./2024/solutions/03.input")));
