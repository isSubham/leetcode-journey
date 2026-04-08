/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    // const INT_MAX = 2 ** 31 - 1; 
    // const MAX_DIV_10 = Math.trunc(INT_MAX / 10);

    if(x<0) return false
    if(x % 10 === 0 && x!==0) return false

    let rev = 0;
    let original = x

    while (x !== 0) {
        let lastDigit = x % 10;
        x = Math.trunc(x / 10);

        // if (rev > MAX_DIV_10 || (rev === MAX_DIV_10 && lastDigit > 7)) return false;

        rev = rev * 10 + lastDigit;
    }

    if(original === rev) return true
    else return false

};
