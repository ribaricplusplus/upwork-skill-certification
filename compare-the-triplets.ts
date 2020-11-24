// Difficulty: Easy
// Problem: https://www.hackerrank.com/challenges/compare-the-triplets/problem

type Triplet = [number, number, number];

export function compareTriplets(alice: Triplet, bob: Triplet): [number, number] {
  const score: [number, number] = [0, 0];
  for(let i = 0; i < 3; ++i) {
    if (alice[i] > bob[i]) {
      ++score[0];
    } else if (alice[i] < bob[i]) {
      ++score[1];
    }
  }
  return score;
}
