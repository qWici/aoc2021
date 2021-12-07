import run from "aocrunner";

type SubmarineAction = "forward" | "down" | "up";
const parseInput = (rawInput: string) => rawInput;

const recognizePlanItem = (item: string): [SubmarineAction, number] => {
  const [rawAction, rawValue] = item.split(" ");
  return [rawAction as SubmarineAction, Number(rawValue)]
}

const getInputArray = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.split("\n");
}

const part1 = (rawInput: string) => {
  const inputArray = getInputArray(rawInput)
  let position = 0;
  let depth = 0;

  inputArray.map((item) => {
    const [action, value] = recognizePlanItem(item);
    switch (action) {
      case "forward":
        position += value;
        break;
      case "up":
        depth -= value;
        break;
      case "down":
        depth += value;
        break;
      default:
        console.error(`Can't recognize action: ${action}`);
        break;
    }
  })

  return position * depth;
};

const part2 = (rawInput: string) => {
  const inputArray = getInputArray(rawInput);
  let aim = 0;
  let position = 0;
  let depth = 0;

  inputArray.map((item) => {
    const [action, value] = recognizePlanItem(item);
    switch (action) {
      case "forward":
        position += value;
        depth += aim * value;
        break;
      case "up":
        aim -= value;
        break;
      case "down":
        aim += value;
        break;
      default:
        console.error(`Can't recognize action: ${action}`);
        break;
    }
  })

  return position * depth;
};

run({
  part1: {
    tests: [
      {
        input: `forward 1\ndown 6\nforward 8\nup 3\ndown 1\ndown 4`,
        expected: 9 * 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2`,
        expected: 900,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
