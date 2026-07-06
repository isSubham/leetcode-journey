/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
    const countSet = new Set();

    for (let value of nums) {
        if (countSet.has(value)) return true

        countSet.add(value)
    }

    return false;
};
