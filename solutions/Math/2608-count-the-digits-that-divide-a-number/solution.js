/**
 * @param {number} num
 * @return {number}
 */
var countDigits = function(num) {

    let count = 0
    let temp = num

    while(temp !=0){
        let ld = temp % 10
        if(num % ld === 0) {
            count ++
        }
        temp = Math.trunc(temp / 10)
    }
    
    return count
};
