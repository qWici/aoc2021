import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getInputArray = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.split("\n")[0].split(",").map((item) => Number(item));
}

const processDay = (state: Record<number, number>, currentDate = 0, afterDays = 80): number => {
  if (currentDate === afterDays) {
    return Object.values(state).reduce((acc, cur) => acc + cur, 0);
  }

  const newState: Record<string, number> = {};
  Object.keys(state).reverse().map((item) => {
    if (Number(item) !== 0) {
      newState[Number(item) - 1] = state[Number(item)];
      return
    }

    const zero = state['0'] || 0;
    const seven = state['7'] || 0;
    if (zero !== 0 || seven !== 0) {
      newState['6'] = zero + seven;
    }
    if (zero !== 0) {
      newState['8'] = state[0];
    }
  })

  return processDay(newState, currentDate + 1, afterDays)
}

const generateStateFromInput = (rawInput: string) => {
  const input = getInputArray(rawInput);

  const state: Record<number, number> = {};

  for (let i = 0; i < input.length; i++) {
    const days = input[i];
    state[days] = state[days] ? state[days] + 1 : 1;
  }

  return state;
}

const part1 = (rawInput: string) => {
  const state = generateStateFromInput(rawInput);
  return processDay(state);
};

const part2 = (rawInput: string) => {
  const state = generateStateFromInput(rawInput);

  return processDay(state, 0, 256);
};

run({
  part1: {
    tests: [
      {
        input: `3,4,3,1,2`,
        expected: 5934,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3,4,3,1,2`,
        expected: 26984457539,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
