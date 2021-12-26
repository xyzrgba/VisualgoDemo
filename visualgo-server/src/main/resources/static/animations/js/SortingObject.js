function SortingObject() {

}

SortingObject.prototype = new AlgorithmObject();
SortingObject.prototype.constructor = SortingObject;
/**
 *
 */
SortingObject.prototype.initAttributes = function () {
    this.id = 0;
    this.numberArray = [];
    this.nodeArray = [];
    //图形的属性
    this.baseHeight = 15;
    this.unitHeight = 2;
    this.width = 30;
    this.startX = this.canvasWidth / 5;
    this.baseLineY = 300;
    this.interval = 5;
}
/**
 *
 */
SortingObject.prototype.resetAll = function () {
    this.id = 0;
    this.nodeArray = [];
    this.numberArray = [];
    this.addCommand(deleteAllObjectCmd);
    this.addCommand(commitCmds);
}
/**
 *
 * @param string
 */
SortingObject.prototype.createArray = function (string) {
    let hint = "";
    if (this.id > 0) {
        this.resetAll();
    }
    let numberArray = string.split(",");
    for (let i = 0; i < numberArray.length; i++) {
        if ("" != numberArray[i] && numberArray[i] > 0) {
            this.numberArray.push(numberArray[i]);
        }
    }
    if (this.numberArray.length > 0) {
        this.executeCommand(this.startCreateArray.bind(this), this.numberArray);
    }
    return hint;
}
/**
 *
 * @param array
 * @returns {Array}
 */
SortingObject.prototype.startCreateArray = function (array) {
    for (let i = 0; i < array.length; i++) {
        let tempX = this.startX + i * (this.width + this.interval);
        let tHeight = this.baseHeight + this.unitHeight * array[i];
        let newNode = new SortingNode(this.id, array[i], tempX, Math.round(this.baseLineY - tHeight / 2.0), this.width, tHeight);
        this.id++;
        this.nodeArray.push(newNode);
        this.addCommand(newFillRectangleCmd, newNode.id, newNode.value, newNode.x, newNode.y, newNode.width, newNode.height);
        this.addCommand(setNodeColorsCmd, newNode.id, WHITE_COLOR, YUNSHUILAN_COLOR);
    }
    this.addCommand(commitCmds);
    return this.commands;
}
/**
 *
 * @returns {string}
 */
SortingObject.prototype.runSorting = function () {
    let hint = "";
    if (this.nodeArray.length > 0) {
        this.executeCommand(this.sorting.bind(this), "");
    } else {
        hint += "没有创建数组!";
    }
    return hint;
}
/**
 * 子类实现
 */
SortingObject.prototype.sorting = function () {

}
/**
 *
 * @returns {*}
 */
SortingObject.prototype.printNodeArrayValue = function () {
    if (null != this.nodeArray) {
        let str = "";
        for (let i = 0; i < this.nodeArray.length; i++) {
            str += " " + this.nodeArray[i].value;
        }
        console.log(str);
        return str;
    }
    return null;
}

/**
 *
 * @param id
 * @param value
 * @param x
 * @param y
 * @param width
 * @param height
 * @constructor
 */
function SortingNode(id, value, x, y, width, height) {
    this.init(id, parseInt(value), x, y);
    this.width = width;
    this.height = height;
}

SortingNode.prototype = new NodeObject();
SortingNode.prototype.constructor = SortingNode;