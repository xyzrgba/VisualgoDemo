function initHtml() {
    objectManager = new ObjectManager(canvas.width, canvas.height);
    animatedManager = new AnimatedManager(objectManager);
    algorithmInstance = new InsertSortingDemo(animatedManager, canvas.width, canvas.height);
}

/**
 *
 * @param animatedManager
 * @param canvasWidth
 * @param canvasHeight
 * @constructor
 */
function InsertSortingDemo(animatedManager, canvasWidth, canvasHeight) {
    this.init(animatedManager, canvasWidth, canvasHeight);
    this.initAttributes();
}

InsertSortingDemo.prototype = new SortingObject();
InsertSortingDemo.prototype.constructor = InsertSortingDemo;

/**
 * 23,35,1,12,37,86,53,41,62,81,10,30,78
 * @returns {Array}
 */
InsertSortingDemo.prototype.sorting = function () {
    console.log("插入排序");
    this.printNodeArrayValue();
    for (let i = 0; i < this.nodeArray.length; i++) {
        let index = this.nodeArray[i];
        index.y += (index.height + this.interval);
        this.addCommand(setNodeColorsCmd, index.id, WHITE_COLOR, HAOHUANG_COLOR);
        this.addCommand(moveCmd, index.id, index.x, index.y);
        this.addCommand(commitCmds);
        for (let j = i; j > 0; j--) {
            if (this.nodeArray[j - 1].value > this.nodeArray[j].value) {
                let tNode = this.nodeArray[j];
                this.nodeArray[j] = this.nodeArray[j - 1];
                this.nodeArray[j - 1] = tNode;
                let tx = this.nodeArray[j].x;
                this.nodeArray[j].x = this.nodeArray[j - 1].x;
                this.nodeArray[j - 1].x = tx;
                this.addCommand(moveCmd, this.nodeArray[j].id, this.nodeArray[j].x, this.nodeArray[j].y);
                this.addCommand(commitCmds);
                this.addCommand(moveCmd, this.nodeArray[j - 1].id, this.nodeArray[j - 1].x, this.nodeArray[j - 1].y);
                this.addCommand(commitCmds);
            }
        }
        index.y -= (index.height + this.interval);
        this.addCommand(setNodeColorsCmd, index.id, "", APPEAR_COLOR);
        this.addCommand(moveCmd, index.id, index.x, index.y);
        this.addCommand(commitCmds);
    }
    this.printNodeArrayValue();
    return this.commands;
}