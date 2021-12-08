import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getInputArray = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.split("\n")[0].split(",").map((item) => Number(item));
}

const median = (values: number[]) => {
  const mid = Math.floor(values.length / 2);
  const nums = [...values].sort((a, b) => a - b);
  return values.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

const part1 = (rawInput: string) => {
  const input = getInputArray(rawInput);
  const bestPosition = median(input);
  let spentFuel = 0;

  input.map((pos) => {
    spentFuel += Math.abs(pos - bestPosition);
  })

  return spentFuel;
};

const part2 = (rawInput: string) => {
  const input = getInputArray(rawInput);
  const max = Math.max(...input);
  const result: Record<string, number> = {}

  const calcSpentFuel = (diff: number, spent = 0): number => {
    if (diff === 0) return spent;

    return calcSpentFuel(diff - 1, spent + diff);
  }

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < max; j++) {
      const diff = Math.abs(input[i] - j);
      const spent = calcSpentFuel(diff);
      result[j] = result[j] ? result[j] + spent : spent;
    }
  }

  const bestPosition = Object.keys(result).reduce((a, b) => result[a] < result[b] ? a : b);
  let spentFuel = 0;

  input.map((pos) => {
    const diff = Math.abs(pos - Number(bestPosition));
    spentFuel += calcSpentFuel(diff);
  })

  return spentFuel;
};

run({
  part1: {
    tests: [
      {
        input: `16,1,2,0,4,2,7,1,2,14`,
        expected: 37,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `16,1,2,0,4,2,7,1,2,14`,
        expected: 168,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
