// deno-fmt-ignore-file

function matchXmas(rows) {
  let matches = 0;

  const height = rows.length;
  for (let i = 0; i < rows.length; i++) {
    const width = rows[i].length;
    for (let j = 0; j < rows[i].length; j++) {
      const middle = rows[i][j];
      if (middle !== "X") continue;

      const spaceWest = j >= 2;
      const spaceEast = j <= width - 4;
      const spaceNorth = i >= 2;
      const spaceSouth = i <= height - 4;

      const west      = spaceWest               ? middle + rows[i][j - 1]     + rows[i][j - 2]     + rows[i][j - 3]     : null;
      const east      = spaceEast               ? middle + rows[i][j + 1]     + rows[i][j + 2]     + rows[i][j + 3]     : null;
      const north     = spaceNorth              ? middle + rows[i - 1][j]     + rows[i - 2][j]     + rows[i - 3][j]     : null;
      const south     = spaceSouth              ? middle + rows[i + 1][j]     + rows[i + 2][j]     + rows[i + 3][j]     : null;
      const nortwest  = spaceNorth && spaceWest ? middle + rows[i - 1][j - 1] + rows[i - 2][j - 2] + rows[i - 3][j - 3] : null;
      const northeast = spaceNorth && spaceEast ? middle + rows[i - 1][j + 1] + rows[i - 2][j + 2] + rows[i - 3][j + 3] : null;
      const southwest = spaceSouth && spaceWest ? middle + rows[i + 1][j - 1] + rows[i + 2][j - 2] + rows[i + 3][j - 3] : null;
      const southeast = spaceSouth && spaceEast ? middle + rows[i + 1][j + 1] + rows[i + 2][j + 2] + rows[i + 3][j + 3] : null;

      const directions = [west, east, north, south, nortwest, northeast, southwest, southeast];
      matches += directions.filter((match) => match === "XMAS").length;
    }
  }

  return matches;
}

function matchMas(rows) {
  let matches = 0;

  const height = rows.length;
  for (let i = 0; i < rows.length; i++) {
    const width = rows[i].length;
    for (let j = 0; j < rows[i].length; j++) {
      const middle = rows[i][j];
      if (middle !== "A") continue;

      const spaceWest = j >= 1;
      const spaceEast = j <= width - 2;
      const spaceNorth = i >= 1;
      const spaceSouth = i <= height - 2;

      if (!(spaceWest && spaceEast && spaceNorth && spaceSouth)) continue;

      const diagonals = [
        rows[i - 1][j - 1] + middle + rows[i + 1][j + 1],
        rows[i + 1][j - 1] + middle + rows[i - 1][j + 1],
      ];

      if (diagonals.filter((match) => match === "MAS" || match === "SAM").length === 2) {
        matches++;
      }
    }
  }

  return matches;
}

print(
  matchMas(
    readTextFile("./2024/solutions/04.input")
      .split("\n")
      .filter((n) => n !== ""),
  ),
);
