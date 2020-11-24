// Difficulty: Medium
// Problem: https://www.hackerrank.com/challenges/climbing-the-leaderboard/problem

function solve(ranked: number[], score: number, ranks: number[]): number {
  const index = binaryInsert(ranked, score);
  return computeRank(ranks, index, score, ranked);
}

function computeRank(ranks: number[], alicePos: number, aliceScore: number, ranked: number[]): number {
  if (alicePos >= ranks.length - 1) {
    const lastRank = ranks[ranks.length-1];
    return ranked[ranked.length-1] > aliceScore ? lastRank+1 : lastRank;
  } else {
    return ranks[alicePos];
  }
}

function computeRanks(scores: number[]): number[] {
  const ranks: number[] = [];
  let currentRank = 1;
  let currentScore = scores[0]
  for(let i = 0; i < scores.length; ++i) {
    if (scores[i] === currentScore) {
      ranks[i] = currentRank;
    } else {
      ++currentRank;
      ranks[i] = currentRank;
      currentScore = scores[i];
    }
  }
  return ranks;
}

// Returns index where candidate would be inserted
export function binaryInsert(arr: number[], candidate: number): number {
  let low = 0;
  let up = arr.length-1;
  let result: number = -1;
  while (true) {
    if (arr[up] === arr[low]) {
      result = solveSingleCase(arr, low, candidate);
      break;
    }
    let mid = Math.floor((low+up)/2);
    if (candidate === arr[mid]) {
      result = mid;
      break;
    } else if (comesBefore(candidate, arr[mid])) {
      up = mid;
    } else {
      low = mid + 1;
    }
    if (up === low) {
      result = solveSingleCase(arr, up, candidate);
      break;
    }
  }
  return result;
}

function solveSingleCase(arr: number[], up: number, candidate: number): number {
  if (comesBefore(candidate, arr[up])) {
    return up;
  } else {
    return up + 1;
  }
}

function comesBefore(a: number, b: number): boolean {
  return a > b;
}

export function climbingLeaderboard(ranked: number[], scores: number[]): number[] {
  let result: number[] = [];
  let ranks = computeRanks(ranked);
  for(let i = 0; i < scores.length; ++i) {
    result[i] = solve(ranked, scores[i], ranks);
  }
  return result;
}
