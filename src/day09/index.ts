import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getInputArray = (rawInput: string) => {
  const input = parseInput(rawInput);
  const result = [];
  for (const line of input.split('\n')) {
    const resultLine = [];
    for (const lineElement of line) {
      resultLine.push(Number(lineElement))
    }
    result.push(resultLine);
  }
  return result;
}

const getNeighborIndexes = (col: number, row: number, maxCol: number, maxRow: number) => {
  const result: number[][] = [];

  // right
  if (col !== maxCol) result.push([col + 1, row])
  // left
  if (col !== 0) result.push([col - 1, row])
  // up
  if (row !== 0) result.push([col, row - 1])
  // down
  if (row !== maxRow) result.push([col, row + 1])

  return result;
}

const part1 = (rawInput: string) => {
  const input = getInputArray(rawInput);
  const lowestPoints: number[] = [];

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      const adjacentLocationIndexes = getNeighborIndexes(col, row, input[0].length - 1, input.length - 1);
      let isLowest = true;
      adjacentLocationIndexes.map((item) => {
        const [itemX, itemY] = item;
        if (input[itemY][itemX] <= input[row][col]) {
          isLowest = false;
        }
      })

      if (isLowest) {
        lowestPoints.push(input[row][col]);
      }
    }
  }

  return lowestPoints.reduce((acc, cur) => acc + cur + 1, 0);
};

const part2 = (rawInput: string) => {
  const input = getInputArray(rawInput);
  const basins = [];

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      if (input[row][col] >= 9) {
        continue;
      }

      const queue = [[row, col]];
      input[row][col] = 10;
      let size = 1;
      while (queue.length > 0) {
        // @ts-ignore
        const [y, x] = queue.pop();
        getNeighborIndexes(x, y, input[0].length - 1, input.length - 1).map((item) => {
          const [itemX, itemY] = item;
          if (input[itemY][itemX] < 9) {
            queue.push([itemY, itemX]);
            input[itemY][itemX] = 10;
            size++;
          }
        })
      }

      basins.push(size)
    }
  }

  return basins.sort((a, b) => b - a).slice(0, 3).reduce((acc, cur) => acc * cur);
};

run({
  part1: {
    tests: [
      {
        input: `2199943210\n3987894921\n9856789892\n8767896789\n9899965678`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2199943210\n3987894921\n9856789892\n8767896789\n9899965678`,
        expected: 1134,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
