import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getInputArray = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.split("\n");
}

const USED_SEGMENTS = {
  0: 6,
  1: 2,
  2: 5,
  3: 5,
  4: 4,
  5: 5,
  6: 6,
  7: 3,
  8: 7,
  9: 6
}

const part1 = (rawInput: string) => {
  const input = getInputArray(rawInput);
  let count = 0;

  input.map((item) => {
    const [patterns, output] = item.split(" | ");
    output.split(" ").map((outputItem) => {
      if ([2, 4, 3, 7].includes(outputItem.length)) {
        count++
      }
    })
  })

  return count;
};

const decodePattern = (patternString: string): Record<string, number> => {
  const patterns = patternString.split(' ');
  const one = patterns.filter((pattern) => pattern.length === USED_SEGMENTS["1"])[0].split('')
  const four = patterns.filter((pattern) => pattern.length === USED_SEGMENTS["4"])[0].split('')
  const seven = patterns.filter((pattern) => pattern.length === USED_SEGMENTS["7"])[0].split('')
  const eight = patterns.filter((pattern) => pattern.length === USED_SEGMENTS["8"])[0].split('')
  const three = patterns.filter((pattern) => {
    return pattern.length === USED_SEGMENTS["3"] && pattern.includes(one[0]) && pattern.includes(one[1])
  })[0].split("")

  const top = seven.filter((item) => !one.includes(item))[0];
  const middle = four.filter((item) => !one.includes(item) && three.includes(item))[0];
  const bottom = three.filter((item) => item !== top && !one.includes(item) && item !== middle)[0]
  const leftBottom = eight.filter((item) => !one.includes(item) && !four.includes(item) && !seven.includes(item) && !three.includes(item))[0]
  const two = patterns.filter((pattern) => {
    return pattern.length === USED_SEGMENTS["2"]
        && pattern.includes(top)
        && pattern.includes(middle)
        && pattern.includes(leftBottom)
        && pattern.includes(bottom)
  })[0].split('')

  const rightTop = two.filter((item) => ![top, middle, leftBottom, bottom].includes(item))[0];
  const rightBottom = one.filter((item) => item !== rightTop)[0];
  const zero = patterns.filter((pattern) => {
    return pattern.length === USED_SEGMENTS["0"] && !pattern.includes(middle)
  })[0].split("")
  const leftTop = zero.filter((item) => {
    return ![top, rightTop, rightBottom, bottom, leftBottom].includes(item)
  })[0]

  const five = patterns.filter(((pattern) => {
    return pattern.length === USED_SEGMENTS["5"]
        && !pattern.includes(rightTop)
        && !pattern.includes(leftBottom)
  }))[0].split("")

  const six = patterns.filter((pattern) => {
    return pattern.length === USED_SEGMENTS["6"] && !pattern.includes(rightTop)
  })[0].split("")

  const nine = patterns.filter((pattern) => {
    return pattern.length === USED_SEGMENTS["9"] && !pattern.includes(leftBottom)
  })

  return {
    [zero.join('')]: 0,
    [one.join('')]: 1,
    [two.join('')]: 2,
    [three.join('')]: 3,
    [four.join('')]: 4,
    [five.join('')]: 5,
    [six.join('')]: 6,
    [seven.join('')]: 7,
    [eight.join('')]: 8,
    [nine.join('')]: 9,
  }
}

const patterToNumber = (patterns: Record<string, number>, pattern: string) => {
  const key = Object.keys(patterns).filter((item) => {
    return item.length === pattern.length
        && pattern.split("").every(letter => item.split("").includes(letter))
  })[0]

  return patterns[key];
}

const part2 = (rawInput: string) => {
  const input = getInputArray(rawInput);
  let sum = 0;

  input.map((item) => {
    const [patternString, output] = item.split(" | ");
    const pattern = decodePattern(patternString);
    const outputNumberArray = output.split(" ").map((item) => {
      return patterToNumber(pattern, item);
    })

    sum += parseInt(outputNumberArray.join(''))
  })

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe\nedbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc\nfgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg\nfbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb\naecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea\nfgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb\ndbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe\nbdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef\negadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb\ngcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`,
        expected: 26,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`,
        expected: 5353,
      },
      {
        input: `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | acedgfb gcdfa cefabd eafb`,
        expected: 8294,
      },
      {
        input: `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cagedb ab cdfbe dab`,
        expected: 157,
      },
      {
        input: `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf\nacedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | acedgfb gcdfa cefabd eafb`,
        expected: (5353 + 8294),
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
