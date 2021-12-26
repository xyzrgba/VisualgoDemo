function initHtml() {
    objectManager = new ObjectManager(canvas.width, canvas.height);
    animatedManager = new AnimatedManager(objectManager);
    algorithmInstance = new QuickSortingDemo(animatedManager, canvas.width, canvas.height);
}

/**
 *
 * @param animatedManager
 * @param canvasWidth
 * @param canvasHeight
 * @constructor
 */
function QuickSortingDemo(animatedManager, canvasWidth, canvasHeight) {
    this.init(animatedManager, canvasWidth, canvasHeight);
    this.initAttributes();
}

QuickSortingDemo.prototype = new SortingObject();
QuickSortingDemo.prototype.constructor = QuickSortingDemo;
/**
 * 快速排序
 * 23,35,1,12,37,86,53,41,62,81,10,30,78
 * @returns {Array}
 */
QuickSortingDemo.prototype.sorting = function () {
    console.log("快速排序");
    this.printNodeArrayValue();
    this.quickSorting(this.nodeArray, 0, this.nodeArray.length - 1);
    this.printNodeArrayValue();
    return this.commands;
}
/**
 *
 * @param array
 * @param sindex
 * @param eindex
 */
QuickSortingDemo.prototype.swap = function (array, sindex, eindex) {
    let tNode = array[sindex];
    array[sindex] = array[eindex];
    array[eindex] = tNode;
    let tx = array[sindex].x;
    array[sindex].x = array[eindex].x;
    array[eindex].x = tx;
    this.addCommand(setNodeColorsCmd, array[sindex].id, "", HAOHUANG_COLOR);
    this.addCommand(setNodeColorsCmd, array[eindex].id, "", HAOHUANG_COLOR);
    this.addCommand(commitCmds);
    this.addCommand(moveCmd, array[sindex].id, array[sindex].x, array[sindex].y);
    this.addCommand(moveCmd, array[eindex].id, array[eindex].x, array[eindex].y);
    this.addCommand(commitCmds);
    this.addCommand(setNodeColorsCmd, array[sindex].id, "", YUNSHUILAN_COLOR);
    this.addCommand(setNodeColorsCmd, array[eindex].id, "", YUNSHUILAN_COLOR);
    this.addCommand(commitCmds);
}
/**
 *
 * @param array
 * @param low
 * @param hight
 * @returns {*}
 */
QuickSortingDemo.prototype.partion = function (array, low, hight) {
    let pivotNode = array[low];
    while (low < hight) {
        while (low < hight && array[hight].value >= pivotNode.value) {
            --hight;
        }
        this.swap(array, low, hight);
        while (low < hight && array[low].value <= pivotNode.value) {
            ++low;
        }
        this.swap(array, low, hight);
    }
    return low;
}
/**
 *
 * @param array
 * @param low
 * @param hight
 */
QuickSortingDemo.prototype.quickSorting = function (array, low, hight) {
    if (low < hight) {
        let pivotLoc = this.partion(array, low, hight);
        this.quickSorting(array, low, pivotLoc - 1);
        this.quickSorting(array, pivotLoc + 1, hight);
    }
}
