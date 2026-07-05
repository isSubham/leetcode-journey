/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {

   if (numRows === 1 || s.length <= numRows) return s;

    const rows = Array.from({ length: Math.min(numRows, s.length) }, () => "");
    let i = 0;
    let down = false;

    for (const l of s) {
        rows[i] += l;
        if (i === 0 || i === numRows - 1) down = !down;
        i += down ? 1 : -1;
    }

    return rows.join('');

};
