import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getInputArray = (rawInput: string): number[][] => {
  const input = parseInput(rawInput);
  return input.split("\n").map((item) => {
    return item.replace(' -> ', ",").split(',').map((value) => Number(value))
  });
}

const generateLine = (x1: number, y1: number, x2: number, y2: number, diagonal = false) => {
  const startX = Math.min(x1, x2);
  const endX = Math.max(x1, x2);
  const startY = Math.min(y1, y2);
  const endY = Math.max(y1, y2);
  const result: number[][] = [];

  const isDiagonal = endY - startY === endX - startX || endY - startY === startX - endX;
  if (isDiagonal) {
    if (!diagonal) return [];
    const fromBotToTop = y1 > y2;
    const leftToRight = x1 < x2;
    const diff = Math.abs(x2 - x1)  + 1;
    for (let i = 0; i < diff; i++) {
      if (fromBotToTop && leftToRight) {
        result.push([x1 + i, y1 - i])
      }
      if (fromBotToTop && !leftToRight) {
        result.push([x1 - i, y1 - i])
      }
      if (!fromBotToTop && leftToRight) {
        result.push([x1 + i, y1 + i])
      }
      if (!fromBotToTop && !leftToRight) {
        result.push([x1 - i, y1 + i])
      }
    }

    return result;
  }

  const isVertical = startX === endX;
  if (isVertical) {
    const diff = endY - startY + 1;
    for (let i = 0; i < diff; i++) {
      if (startY + i <= endY) {
        result.push([startX, startY + i])
      }
    }

    return result;
  }

  // Is horizontal
  const diff = endX - startX + 1;
  for (let i = 0; i < diff; i++) {
    if (startX + i <= endX) {
      result.push([startX + i, startY])
    }
  }

  return result;
}

type Line = [x1: number, y1: number, x2: number, y2: number];
const part1 = (rawInput: string) => {
  const input = getInputArray(rawInput) as Line[];
  const points: Record<string, number> = {};
  input.map((item) => {
    const [x1, y1, x2, y2] = item;
    const line = generateLine(x1, y1, x2, y2);

    line.map((point) => {
      if (point.length === 0) return;
      const [x, y] = point;
      const key = `${x}_${y}`;
      points[key] = points[key] ? points[key] + 1 : 1;
    })
  })

  return Object.values(points).filter(value => value >= 2).length;
};

const part2 = (rawInput: string) => {
  const input = getInputArray(rawInput) as Line[];
  const points: Record<string, number> = {};
  input.map((item) => {
    const [x1, y1, x2, y2] = item;
    const line = generateLine(x1, y1, x2, y2, true);

    line.map((point) => {
      if (point.length === 0) return;
      const [x, y] = point;
      const key = `${x}_${y}`;
      points[key] = points[key] ? points[key] + 1 : 1;
    })
  })

  return Object.values(points).filter(value => value >= 2).length;
};

run({
  part1: {
    tests: [
      {
        input: `0,9 -> 5,9\n8,0 -> 0,8\n9,4 -> 3,4\n2,2 -> 2,1\n7,0 -> 7,4\n6,4 -> 2,0\n0,9 -> 2,9\n3,4 -> 1,4\n0,0 -> 8,8\n5,5 -> 8,2`,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0,9 -> 5,9\n8,0 -> 0,8\n9,4 -> 3,4\n2,2 -> 2,1\n7,0 -> 7,4\n6,4 -> 2,0\n0,9 -> 2,9\n3,4 -> 1,4\n0,0 -> 8,8\n5,5 -> 8,2`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
