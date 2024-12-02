function isSafe(report) {
  let isSortedIncreasing = true;
  let isSortedDecreasing = true;

  for (let i = 1; i < report.length; i++) {
    isSortedIncreasing &&= report[i - 1] < report[i];
    isSortedDecreasing &&= report[i - 1] > report[i];
    if (!(isSortedIncreasing || isSortedDecreasing)) {
      return false;
    }

    const difference = Math.abs(report[i - 1] - report[i]);
    if (difference < 1 || difference > 3) {
      return false;
    }
  }

  return true;
}

function isSafeDampened(report) {
  return report.some((_, i) => {
    // TODO: Implement `toSpliced`
    // const copy = report.toSpliced(i, 1);
    const copy = [...report];
    copy.splice(i, 1);
    return isSafe(copy);
  });
}

const input = readTextFile("./2024/solutions/02.input")
  .split("\n")
  .map((line) =>
    line
      .split(" ")
      .filter((n) => n !== "")
      .map((n) => Number.parseInt(n))
  )
  .filter((line) => line.length !== 0);

const safeReports = input
  .filter(isSafe);
print("Safe reports: " + safeReports.length);

const safeDampenedReports = input
  .filter(isSafeDampened);
print("Safe dampened reports: " + safeDampenedReports.length);
