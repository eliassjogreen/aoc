function zip(left, right) {
  const result = new Array(Math.max(left.length, right.length));
  for (let i = 0; i < result.length; i++) {
    result[i] = [left[i], right[i]];
  }
  return result;
}

function unzip(array) {
  const left = new Array(array.length);
  const right = new Array(array.length);
  for (let i = 0; i < array.length; i++) {
    left[i] = array[i][0];
    right[i] = array[i][1];
  }
  return { left, right };
}

const input = unzip(
  readTextFile("./2024/solutions/01.input")
    .split("\n")
    .map((line) =>
      line
        .split(" ")
        .filter((n) => n !== "")
        .map((n) => Number.parseInt(n))
    )
    .filter((line) => line.length !== 2),
);

const distance = zip(input.left.toSorted(), input.right.toSorted())
  .reduce(
    (accumulator, [left, right]) => accumulator + Math.abs(left - right),
    0,
  );

print("Total distance: " + distance);

const appearences = input.right.reduce((map, value) => {
  map.set(value, (map.get(value) ?? 0) + 1);
  return map;
}, new Map());
const similarity = input.left.reduce((accumulator, value) => {
  const appearence = appearences.get(value) ?? 0;
  return accumulator + (value * appearence);
}, 0);

print("Similarity: " + similarity);
