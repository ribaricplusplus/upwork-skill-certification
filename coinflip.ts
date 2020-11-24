// Problem https://www.codechef.com/problems/CONFLIP
// Codechef uses Node v7.4 and submitting the solution gave a weird exception...
// But the solution works locally. Lesson learned, never again use CodeChef.

type Coin = 1 | 2;

function solve(initialState: Coin, numOfCoins: number, guessType: Coin): number {
  const finalStateOfFirst = getState(initialState, 1, numOfCoins);
  if (finalStateOfFirst === guessType) {
    return Math.ceil(numOfCoins/2);
  } else {
    return Math.floor(numOfCoins/2);
  }
}

function getState(state: Coin, position: number, numOfFlips: number): Coin {
  const flips = numOfFlips - position + 1;
  return (flips % 2) === 0 ? state : flip(state);
}

function flip(state: Coin): Coin {
  return state === 1 ? 2 : 1;
}

function mapToInt(value) {
  return parseInt(value, 10)
}

function main() {
  process.stdin.on('data', (chunk) => {
    const input: string = chunk.toString();
    const lines = input.split('\n');
    if(lines[lines.length-1] === '') lines.pop();
    let numOfGamesIndex = 1
    for(let i = 0; i < parseInt(lines[0], 10); ++i) {
      for(let gameIndex = numOfGamesIndex + 1; gameIndex <= numOfGamesIndex + parseInt(lines[numOfGamesIndex], 10); ++gameIndex) {
        const gameInfo = lines[gameIndex].split(' ').map(mapToInt);
        const solution = solve((gameInfo[0] as Coin), gameInfo[1], (gameInfo[2] as Coin));
        process.stdout.write(`${solution}\n`);
      }
      numOfGamesIndex = numOfGamesIndex + parseInt(lines[numOfGamesIndex], 10) + 1;
    }
    process.exit(0);
  });
}
main();
