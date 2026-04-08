/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  const INT_MIN = -(2 ** 31); 
  const INT_MAX = 2 ** 31 - 1; 

  const MAX_DIV_10 = Math.trunc(INT_MAX / 10); //  214748364
  const MIN_DIV_10 = Math.trunc(INT_MIN / 10); // -214748364

  let rev = 0;

  while (x !== 0) {
    let lastDigit = x % 10; // JS preserves sign: -4321 % 10 = -1
    x = Math.trunc(x / 10); // truncate toward zero (simulates int division)

    if (rev > MAX_DIV_10 || (rev === MAX_DIV_10 && lastDigit > 7)) return 0;
    if (rev < MIN_DIV_10 || (rev === MIN_DIV_10 && lastDigit < -8)) return 0;

    rev = rev * 10 + lastDigit;
  }

  return rev;
};
