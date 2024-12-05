// deno-fmt-ignore-file

const [pageOrderingRules, pageNumberingUpdates] = readTextFile(
  "./2024/solutions/05.input",
)
  .split("\n\n")
  .map((part, i) =>
    part
      .split("\n")
      .filter((row) => row !== "")
      .map((rule) =>
        rule
          .split(i === 0 ? "|" : ",")
          .map((value) => Number.parseInt(value))
      )
  );

const correctlyOrderedPages = pageNumberingUpdates.filter((pageNumberingUpdate) => {
  const applicableRules = pageOrderingRules.filter((rule) => pageNumberingUpdate.includes(rule[0]) || pageNumberingUpdate.includes(rule[1]));

  return pageNumberingUpdate.every((pageNumber, i) => {
    const comesAfter = applicableRules.filter((rule) => rule[0] === pageNumber).map((rule) => rule[1]);
    const comesBefore = applicableRules.filter((rule) => rule[1] === pageNumber).map((rule) => rule[0]);

    return pageNumberingUpdate.every((pageNumber, j) => {
      if (i < j) return comesAfter.includes(pageNumber);
      if (i > j) return comesBefore.includes(pageNumber);
      return true;
    });
  })
});

const middleNumberOfCorrectlyOrderedPages = correctlyOrderedPages.map((page) => page[Math.floor(page.length / 2)]);
const sumOfMiddleNumbers = middleNumberOfCorrectlyOrderedPages.reduce((sum, number) => sum + number, 0);

print(sumOfMiddleNumbers);