import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getInputArray = (rawInput: string): { randomNumbers: number[], boards: number[][][] } => {
  const input = parseInput(rawInput);
  const arr = input.split("\n\n");
  const randomNumbers = arr[0].split(',').map((item) => Number(item));
  arr.splice(0, 1);
  const boards = arr.map((item) => item.split('\n'))
  const numberBoards = boards.map((item) => {
    return item.map((row) => {
      return row.split(' ').filter((rowItem) => rowItem.length > 0).map((stringItem) => Number(stringItem))
    });
  });

  return { randomNumbers, boards: numberBoards }
}

const transposeBoard = (board: number[][]) => {
  return board[0].map((col, i) => board.map(row => row[i]));
}

const isBoardWin = (board: number[][], playedNumbers: number[]) => {
  const checkRows = (boardItem: number[][]): boolean => {
    let rowWin = false;
    boardItem.map((row) => {
      const diff = playedNumbers.filter((num) => row.includes(num))
      if (diff.length === row.length) {
        rowWin = true;
      }
    })

    return rowWin;
  }

  if (checkRows(board)) return true;
  const transposed = transposeBoard(board);
  return checkRows(transposed);
}

const part1 = (rawInput: string) => {
  const { randomNumbers, boards } = getInputArray(rawInput);

  let winnerBoard: number[][] = [];
  let playedNumbers: number[] = [];

  for (let i = 0; i < randomNumbers.length; i++) {
    playedNumbers.push(randomNumbers[i]);
    for (let j = 0; j < boards.length; j++) {
      const boardWin = isBoardWin(boards[j], playedNumbers);
      if (boardWin) {
        winnerBoard = boards[j];
        break;
      }
    }

    if (winnerBoard.length !== 0) break;
  }

  const unmarkedSum = (board: number[][]) => {
    let sum = 0;
    board.map((row) => {
      sum += row.reduce((acc, cur) => {
        return playedNumbers.includes(cur) ? acc : acc + cur;
      }, 0);
    })
    return sum;
  }

  return unmarkedSum(winnerBoard) * playedNumbers[playedNumbers.length - 1];
};

const part2 = (rawInput: string) => {
  const { randomNumbers, boards } = getInputArray(rawInput);

  let lastWinnerBoard: number[][] = [];
  let lastWinnerNumber = 0;
  let playedNumbers: number[] = [];
  let playingBoards = boards;

  for (let i = 0; i < randomNumbers.length; i++) {
    playedNumbers.push(randomNumbers[i]);
    if (playingBoards.length === 0) break;
    for (let j = 0; j < playingBoards.length; j++) {
      const boardWin = isBoardWin(playingBoards[j], playedNumbers);
      if (boardWin) {
        lastWinnerBoard = playingBoards[j];
        lastWinnerNumber = playedNumbers[playedNumbers.length - 1];
        playingBoards.splice(j, 1);
      }
    }
  }

  const unmarkedSum = (board: number[][]) => {
    let sum = 0;
    const indexLastWinnerNumber = randomNumbers.findIndex((value) => value === lastWinnerNumber);
    const playedNumbersUntilWin = randomNumbers.slice(0, indexLastWinnerNumber + 1);
    board.map((row) => {
      sum += row.reduce((acc, cur) => {
        return playedNumbersUntilWin.includes(cur) ? acc : acc + cur;
      }, 0);
    })
    return sum;
  }

  return unmarkedSum(lastWinnerBoard) * lastWinnerNumber;
};

run({
  part1: {
    tests: [
      {
        input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1\n\n22 13 17 11  0\n 8  2 23  4 24\n21  9 14 16  7\n 6 10  3 18  5\n 1 12 20 15 19\n\n 3 15  0  2 22\n 9 18 13 17  5\n19  8  7 25 23\n20 11 10 24  4\n14 21 16 12  6\n\n14 21 17 24  4\n10 16 15  9 19\n18  8 23 26 20\n22 11 13  6  5\n 2  0 12  3  7`,
        expected: 4512,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1\n\n22 13 17 11  0\n 8  2 23  4 24\n21  9 14 16  7\n 6 10  3 18  5\n 1 12 20 15 19\n\n 3 15  0  2 22\n 9 18 13 17  5\n19  8  7 25 23\n20 11 10 24  4\n14 21 16 12  6\n\n14 21 17 24  4\n10 16 15  9 19\n18  8 23 26 20\n22 11 13  6  5\n 2  0 12  3  7`,
        expected: 1924,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
