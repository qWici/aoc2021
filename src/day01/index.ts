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
  const sums: number[] = [];
  measurements.map((item, index) => {
    if (measurements.length >= index + 2) {
      sums.push(Number(item) + Number(measurements[index + 1]) + Number(measurements[index + 2]))
    }
  })

  let counter = 0;
  sums.reduce((acc, cur) => {
    if (cur > acc) counter++;
    return cur;
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
