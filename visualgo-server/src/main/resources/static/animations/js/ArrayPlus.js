/**
 * 判断一个对象是否在一个数组中
 * @param array
 * @param object
 * @returns {boolean}
 */
Array.isInArray = function (array, object) {
    if (null == array || undefined == array) {
        return false;
    }
    for (let i = 0; i < array.length; i++) {
        if (object == array[i]) {
            return true;
        }
    }
    return false;
}