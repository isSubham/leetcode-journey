/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {

    // if (x === 0) return true
    if (x < 0) return false

    let org = x
    let rev = 0;

    while (x > 0) {
        let lastDigit = x % 10;
        rev = rev * 10 + lastDigit;
        x = (x / 10) | 0;
    }


    return org === rev;
};
