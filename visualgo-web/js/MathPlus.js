/**
 * 求等比数列的和
 * @param a1
 * @param q
 * @param n
 * @returns {*}
 */
Math.sumOfGeometricSeries = function (a1, q, n) {
    let sum = null;
    try {
        if (q === 0) {
            throw new Error("等比数列求和中q不能等于0");
        }
        if (a1 === 0) {
            throw new Error("等比数列求和中a1不能等于0");
        }
        if (n < 2) {
            throw new Error("等比数列求和中n必须大于2");
        }
        if (q === 1) {
            sum = n * a1;
        } else {
            sum = a1 * (1 - Math.pow(q, n)) / (1 - q);
        }
        return sum;
    } catch (e) {
        alert(e.name + ":" + e.message);
    }
    return sum;
}