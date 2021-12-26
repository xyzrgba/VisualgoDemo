function initHtml() {
    objectManager = new ObjectManager(canvas.width, canvas.height);
    animatedManager = new AnimatedManager(objectManager);
    algorithmInstance = new SelectSortingDemo(animatedManager, canvas.width, canvas.height);
}

/**
 *
 * @param animatedManager
 * @param canvasWidth
 * @param canvasHeight
 * @constructor
 */
function SelectSortingDemo(animatedManager, canvasWidth, canvasHeight) {
    this.init(animatedManager, canvasWidth, canvasHeight);
    this.initAttributes();
}

SelectSortingDemo.prototype = new SortingObject();
SelectSortingDemo.prototype.constructor = SelectSortingDemo;

/**
 * 23,35,1,12,37,86,53,41,62,81,10,30,78
 * 12,2,2,3,45,41,39,21,19,17,37,71,63,80,31,62,68,35
 * 3,45,67,13,32,90,89,78,39,31,56,74,76,80,40,51,10,13,24,14,19,56
 * @returns {Array}
 */
SelectSortingDemo.prototype.sorting = function () {
    console.log("选择排序");
    this.printNodeArrayValue();
    for (let i = 0; i < this.nodeArray.length; i++) {
        let iNode = this.nodeArray[i];
        this.addCommand(setNodeColorsCmd, iNode.id, "", HAOHUANG_COLOR);
        this.addCommand(commitCmds);
        let min = i;
        for (let j = i + 1; j < this.nodeArray.length; j++) {
            this.addCommand(setNodeColorsCmd, this.nodeArray[j].id, "", APPEAR_COLOR);
            this.addCommand(commitCmds);
            if (this.nodeArray[j].value < this.nodeArray[min].value) {
                min = j;
            }
            this.addCommand(setNodeColorsCmd, this.nodeArray[j].id, "", YUNSHUILAN_COLOR);
            this.addCommand(commitCmds);
        }
        if (min != i) {
            let mNode = this.nodeArray[min];
            let tNode = this.nodeArray[i];
            this.nodeArray[i] = this.nodeArray[min];
            this.nodeArray[min] = tNode;
            let tx = mNode.x;
            mNode.x = iNode.x;
            iNode.x = tx;
            this.addCommand(setNodeColorsCmd, mNode.id, "", HAOHUANG_COLOR);
            this.addCommand(commitCmds);
            this.addCommand(moveCmd, mNode.id, mNode.x, mNode.y);
            this.addCommand(commitCmds);
            this.addCommand(moveCmd, iNode.id, iNode.x, iNode.y);
            this.addCommand(commitCmds);
            this.addCommand(setNodeColorsCmd, mNode.id, "", YUNSHUILAN_COLOR);
            this.addCommand(commitCmds);
        }
        this.addCommand(setNodeColorsCmd, iNode.id, "", YUNSHUILAN_COLOR);
        this.addCommand(commitCmds);
    }
    this.printNodeArrayValue();
    return this.commands;
}
/*

 */