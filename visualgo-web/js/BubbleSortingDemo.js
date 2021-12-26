function initHtml() {
    objectManager = new ObjectManager(canvas.width, canvas.height);
    animatedManager = new AnimatedManager(objectManager);
    algorithmInstance = new BubbleSortingDemo(animatedManager, canvas.width, canvas.height);
}

/**
 * @param animatedManager
 * @param canvasWidth
 * @param canvasHeight
 * @constructor
 */
function BubbleSortingDemo(animatedManager, canvasWidth, canvasHeight) {
    this.init(animatedManager, canvasWidth, canvasHeight);
    this.initAttributes();
}

BubbleSortingDemo.prototype = new SortingObject();
BubbleSortingDemo.prototype.constructor = BubbleSortingDemo;
/**
 * 23,35,1,12,37,86,53,41,62,81,10,30,78
 * @returns {Array}
 */
BubbleSortingDemo.prototype.sorting = function () {
    console.log("---------- 冒泡排序 ---------- ");
    this.printNodeArrayValue();
    for (let i = 0; i < this.nodeArray.length - 1; i++) {
        for (let j = 0; j < this.nodeArray.length - 1 - i; j++) {
            let front = this.nodeArray[j];
            let rear = this.nodeArray[j + 1];
            this.addCommand(setNodeColorsCmd, front.id, "", HAOHUANG_COLOR);
            this.addCommand(setNodeColorsCmd, rear.id, "", HAOHUANG_COLOR);
            this.addCommand(commitCmds);
            if (this.nodeArray[j].value > this.nodeArray[j + 1].value) {

                let tNode = this.nodeArray[j];
                this.nodeArray[j] = this.nodeArray[j + 1];
                this.nodeArray[j + 1] = tNode;
                let tx = this.nodeArray[j].x;
                this.nodeArray[j].x = this.nodeArray[j + 1].x;
                this.nodeArray[j + 1].x = tx;
                this.addCommand(moveCmd, front.id, front.x, front.y);
                this.addCommand(moveCmd, rear.id, rear.x, rear.y);
                this.addCommand(commitCmds);
            }
            this.addCommand(setNodeColorsCmd, front.id, "", YUNSHUILAN_COLOR);
            this.addCommand(setNodeColorsCmd, rear.id, "", YUNSHUILAN_COLOR);
            this.addCommand(commitCmds);
        }
    }
    this.printNodeArrayValue();
    return this.commands;
}