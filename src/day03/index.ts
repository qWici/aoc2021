import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getInputArray = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.split("\n");
}

const part1 = (rawInput: string) => {
  const input = getInputArray(rawInput);
  let common = "";
  let rare = "";

  for (let i = 0; i < input[0].length; i++) {
    let values: Record<string, number> = {}

    for (let j = 0; j < input.length; j++) {
      const value = input[j][i];
      values[value] = values[value] ? values[value] + 1 : 1;
    }

    const keys = Object.keys(values).map(item => Number(item));

    const rareKey = keys.reduce((a, b) => {
      return values[a] < values[b] ? a : b;
    });
    rare = `${rare}${rareKey}`

    const commonKey = rareKey === 1 ? 0 : 1;
    common = `${common}${commonKey}`
  }

  return parseInt(common, 2) * parseInt(rare, 2);
};

const filterValue = (values: string[], type: "common" | "rare", index = 0): string => {
  if (values.length === 1) return values[0];

  let bitCount: Record<number, number> = {};
  values.map((item) => {
    const value = Number(item[index]);
    bitCount[value] = bitCount[value] ? bitCount[value] + 1 : 1;
  })

  const bitKey = () => {
    if (bitCount[0] === bitCount[1]) {
      return type === "common" ? 1 : 0;
    }
    return Object.keys(bitCount)
        .map(item => Number(item))
        .reduce((a, b) => {
          return type === "common"
              ? bitCount[a] > bitCount[b] ? a : b
              : bitCount[a] < bitCount[b] ? a : b;
        });
  }

  const resultArray = values.filter((item) => Number(item[index]) === bitKey());

  return filterValue(resultArray, type, index + 1);
}

const part2 = (rawInput: string) => {
  const input = getInputArray(rawInput);
  const common = filterValue(input, "common");
  const rare = filterValue(input, "rare");

  return parseInt(common, 2) * parseInt(rare, 2);
};

run({
  part1: {
    tests: [
      {
        input: `00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010`,
        expected: 198
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010`,
        expected: 230
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
