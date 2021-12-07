import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getInputArray = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.split("\n");
}

const part1 = (rawInput: string) => {
  const input = getInputArray(rawInput);

  return;
};

const part2 = (rawInput: string) => {
  const input = getInputArray(rawInput);

  return;
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
