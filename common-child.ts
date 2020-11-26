// Difficulty: Medium
// https://www.hackerrank.com/challenges/common-child/problem
// This problem is usually called "Longest Common Subsequence"

import * as _ from 'lodash';
import * as fs from 'fs';

let mem: Array<Array<number>>;

function solve(a: string, b: string) {
  mem = (new Array(a.length + 1));
  for(let i = 0; i < a.length + 1; ++i) {
    mem[i] = ((new Array(a.length + 1)).fill(0));
  }
  return walk(a, b);
}

function walk(a: string, b: string): number {
  for(let i = a.length; i >= 0; i--) {
    for(let j = a.length; j >= 0; j--) {
      if (!(i < a.length && j < a.length)) mem[i][j] = 0;
      else if (a[i] === b[j]) mem[i][j] = 1 + mem[i+1][j+1];
      else mem[i][j] = _.max([mem[i][j+1], mem[i+1][j]]);
    }
  }
  return mem[0][0];
}

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: any = '';
let currentLine: any = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString.replace(/\s*$/, '')
    .split('\n')
    .map(str => str.replace(/\s*$/, ''));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

function commonChild(s1, s2) {
  return solve(s1, s2);
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s1 = readLine();

  const s2 = readLine();

  let result = commonChild(s1, s2);

  ws.write(result + "\n");

  ws.end();
}
