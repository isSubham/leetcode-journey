/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
    if (n <=1) return n

    let sl = 0
    let l = 1

    for (let i = 2; i <= n; i++) {
        let sum = sl + l
        sl = l
        l = sum
    }

    return l
};
