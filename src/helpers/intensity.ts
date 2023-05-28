// Based on C_t = \frac{\mathrm{\sum}_{g=1}^{G} P{_g}{_,}{_t} \times c_g}{D_t} 
// Here's the breakdown:
// * C_t represents the value you want to calculate.
// * P{g}{,}{_t} refers to the element in the matrix or array P at index (g, t).
// * c_g refers to the element in the array c at index g.
// * D_t refers to the element in the array D at index t.
// * G represents the number of elements or rows in the P array.
// The formula calculates C_t by iterating over the elements of P, multiplying each element 
// by the corresponding element in the c array, and then summing up these products. Finally, 
// the sum is divided by the element in the D array at index t.

export function calculateCt(
  P: number[][],
  c: number[],
  D: number[],
  t: number
): number {
  const G: number = P.length;
  let Ct: number = 0;

  for (let g = 0; g < G; g++) {
    Ct += (P[g][t] * c[g]) / D[t];
  }

  return Ct;
}

const P: number[][] = [
  [
    /* P[1][t], P[2][t], ... */
  ],
  [
    /* P[2][t], P[2][t], ... */
  ],
  // ...
];

const c: number[] = [
  /* c[1], c[2], ... */
];
const D: number[] = [
  /* D[t] */
];
const t: number = 1; /* value of t */

const result: number = calculateCt(P, c, D, t);














// interpolate(4, 3, 5, 4, 8) = 6
// x = data point we want
// x1 = lower bound of x
// x2 = upper bound of x
// y1 = lower bound of y
// y2 = upper bound of y
function interpolate(x: number, x1: number, x2: number, y1: number, y2: number) {
  const y = y1 + ((x - x1) / (x2 - x1)) * (y2 - y1);
  return y;
}

// {
//   "startDate": "2023-05-27T20:15:00.000Z",
//   "endDate": "2023-05-27T20:30:00.000Z",
//   "position": 182,
//   "quantity": 5528
// },
// {
//   "startDate": "2023-05-27T20:30:00.000Z",
//   "endDate": "2023-05-27T20:45:00.000Z",
//   "position": 183,
//   "quantity": 5785
// },
// {
//   "startDate": "2023-05-27T20:45:00.000Z",
//   "endDate": "2023-05-27T21:00:00.000Z",
//   "position": 184,
//   "quantity": 6008
// },
// interpolate(183, 182, 184, 5528, 6008) = 5768

// lerp(5528, 6008, 0.5) = 5768
const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x));
const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const range = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  a: number
) => lerp(x2, y2, invlerp(x1, y1, a));

