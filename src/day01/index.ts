import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const measurements = input.split("\n");
  let counter = 0;
  measurements.reduce((acc, cur) => {
    if (Number(cur) > Number(acc)) counter++;
    return cur;
  })

  return counter;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const measurements = input.split("\n");
  let prevSum = 0;
  let counter = 0;
  measurements.map((item, index) => {
    if (index === 0) {
      prevSum = Number(item) + Number(measurements[index + 1]) + Number(measurements[index + 2]);
    }

    const currentSum = Number(item) + Number(measurements[index + 1]) + Number(measurements[index + 2]);
    if (currentSum > prevSum) counter++;
    prevSum = currentSum;
  })

  return counter;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
