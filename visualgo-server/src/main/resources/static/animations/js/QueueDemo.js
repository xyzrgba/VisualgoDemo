/**
 * 初始化页面
 */
function initHtml() {
    objectManager = new ObjectManager(canvas.width, canvas.height);
    animatedManager = new AnimatedManager(objectManager);
    algorithmInstance = new QueueDemo(animatedManager, canvas.width, canvas.height);
}

/**
 * 队列
 * @param animatedManager
 * @param canvasWidth
 * @param canvasHeight
 * @constructor
 */
function QueueDemo(animatedManager, canvasWidth, canvasHeight) {
    this.init(animatedManager, canvasWidth, canvasHeight);
    this.initAttributes();
}

QueueDemo.prototype = new AlgorithmObject();
QueueDemo.prototype.constructor = QueueDemo;
/**
 * 初始化队列的属性
 */
QueueDemo.prototype.initAttributes = function () {
    //逻辑部分
    this.queue = null;//[]
    this.size = 0;
    this.front = -1;//前，表示当前节点的位置
    this.rear = this.front;//后
    this.length = 0;//队列中节点的个数
    //图形部分
    this.id = 0;
    this.nodeQueue = null;//[]
    this.width = 70;
    this.height = 50;
    this.innerWidth = this.width - 4;
    this.innerHeight = this.height - 4;
    this.startY = 200;
    this.startX = 210;
    //出现的坐标
    this.appearX = parseInt(this.startX + (this.width * this.size) + 150);
    this.appearY = this.startY;
    //消失的坐标
    this.disappearX = this.startX - 180;
    this.disappearY = this.startY;
    //箭头
    this.frontArrow = null;
    this.rearArrow = null;
    this.arrowLength = 40;
    this.startArrowX = this.startX;
    this.startArrowY = parseInt(this.startY + this.height / 2.0);
    this.startRearArrowY = this.startArrowY + this.arrowLength + 20;
}
/**
 *
 * @param size
 */
QueueDemo.prototype.initQueue = function (size) {
    let hint = "";
    let initSize = parseInt(size);
    let maxX = parseInt(this.startX + (this.width * initSize) + 150);
    if (maxX < this.canvasWidth) {
        this.executeCommand(this.initQueueSize.bind(this), parseInt(size));
    } else {
        hint += "请输入1 - " + parseInt((this.canvasWidth - 150 - this.startX) / this.width - 1);
    }
    return hint;
}
/**
 * 初始化队列
 * @param size
 */
QueueDemo.prototype.initQueueSize = function (size) {
    if (this.size > 0) {
        this.resetAll();
    }
    if (parseInt(size) > 0) {
        this.size = parseInt(size);
        this.queue = [];
        this.nodeQueue = [];
        let nodeX = this.startX;
        this.appearX = parseInt(this.startX + (this.width * this.size) + 150);
        for (let i = 0; i < this.size; i++) {
            let node = new QueueNode(this.id, "", nodeX, this.startY);
            this.id++;
            nodeX += this.width;
            this.nodeQueue[i] = node;
            this.addCommand(newRectangleCmd, node.id, node.value, node.x, node.y, this.width, this.height);
        }
        this.addCommand(commitCmds);
    }
    return this.commands;
}
/**
 * 清楚所有的节点
 */
QueueDemo.prototype.resetAll = function () {
    for (let i = 0; i < this.id; i++) {
        this.addCommand(deleteCmd, i);
    }
    this.addCommand(commitCmds);
    this.id = 0;
    this.queue = [];
    this.front = -1;
    this.rear = this.front;
    this.nodeQueue = null;
}
/**
 *
 * @param val
 */
QueueDemo.prototype.pushNode = function (val) {
    let hint = "";
    if (val != "" && this.rear < this.size - 1 && this.size > 0) {
        this.executeCommand(this.push.bind(this), val);
    } else {
        if (this.size > 0) {
            hint += "队列满了!";
        } else {
            hint += "请初始化队列!";
        }
    }
    return hint;
}
/**
 * 出队
 */
QueueDemo.prototype.popNode = function () {
    let hint = "";
    if (this.rear >= this.front && this.front >= 0 && this.size > 0) {
        this.executeCommand(this.pop.bind(this));
    } else {
        if (this.size > 0) {
            hint += "队列内没有元素！";
        } else {
            hint += "请初始化队列!";
        }
    }
    return hint;
}
/**
 * 出队
 * @returns {Array}
 */
QueueDemo.prototype.pop = function () {
    //有元素
    if (this.rear >= this.front && this.front >= 0) {
        let popNode = this.queue[this.front];//主要记录id和value
        this.addCommand(setNodeColorsCmd, popNode.id, WHITE_COLOR, DISAPPEAR_COLOR);
        this.addCommand(moveCmd, popNode.id, this.disappearX, this.disappearY);
        this.addCommand(commitCmds);
        this.addCommand(deleteCmd, popNode.id);
        this.addCommand(commitCmds);
        this.forward();//前移
    }
    return this.commands;
}
/**
 * 入队
 * @param val
 */
QueueDemo.prototype.push = function (val) {
    if (val != "" && this.rear < this.size - 1) {
        if (-1 === this.front) {
            this.front = 0;
        }
        this.rear++;
        let node = new QueueNode(this.id, val, this.appearX, this.appearY);
        this.id++;
        this.queue[this.rear] = node;
        this.addCommand(newFillRectangleCmd, node.id, node.value, node.x, node.y, this.innerWidth, this.innerHeight);
        this.addCommand(setNodeColorsCmd, node.id, WHITE_COLOR, APPEAR_COLOR);
        this.addCommand(commitCmds);
        this.addCommand(moveCmd, node.id, this.nodeQueue[this.rear].x, this.nodeQueue[this.rear].y);
        this.addCommand(commitCmds);
        if (this.rear == this.front) {
            this.appearArrow();
        } else {
            this.addCommand(moveCmd, this.rearArrow.id, this.nodeQueue[this.rear].x, this.startArrowY);
            this.addCommand(commitCmds);
        }
    }
    return this.commands;
}
/**
 * 出队列时，向前移动
 */
QueueDemo.prototype.forward = function () {
    if (this.rear > 0) {
        this.front++;
        if (this.rear == this.front) {
            this.addCommand(moveCmd, this.frontArrow.id, this.nodeQueue[this.front].x, this.startArrowY);
            this.addCommand(moveCmd, this.rearArrow.id, this.nodeQueue[this.rear].x, this.startRearArrowY);
            this.addCommand(commitCmds);
            this.front--;
            for (let i = this.front; i < this.rear - this.front; i++) {
                this.queue[i] = this.queue[i + 1];
                this.addCommand(moveCmd, this.queue[i].id, this.nodeQueue[i].x, this.nodeQueue[i].y);
            }
            this.rear--;
            this.addCommand(moveCmd, this.frontArrow.id, this.nodeQueue[this.front].x, this.frontArrow.y);
            this.addCommand(moveCmd, this.rearArrow.id, this.nodeQueue[this.rear].x, this.startRearArrowY);
            this.addCommand(commitCmds);
        } else {
            this.addCommand(moveCmd, this.frontArrow.id, this.nodeQueue[this.front].x, this.startArrowY);
            this.addCommand(commitCmds);
            this.front--;
            for (let i = this.front; i < this.rear - this.front; i++) {
                this.queue[i] = this.queue[i + 1];
                this.addCommand(moveCmd, this.queue[i].id, this.nodeQueue[i].x, this.nodeQueue[i].y);
            }
            this.rear--;
            this.addCommand(moveCmd, this.frontArrow.id, this.nodeQueue[this.front].x, this.startArrowY);
            this.addCommand(moveCmd, this.rearArrow.id, this.nodeQueue[this.rear].x, this.startArrowY);
            this.addCommand(commitCmds);
        }
    } else {
        //首节点干掉
        this.disappearArrow();
    }

}
/**
 * 箭头出现
 */
QueueDemo.prototype.appearArrow = function () {
    this.frontArrow = new QueueNode(this.id, "front", this.startArrowX, this.startArrowY);
    this.id++;
    this.addCommand(newPointerCmd, this.frontArrow.id, this.frontArrow.value, this.frontArrow.x, this.frontArrow.y, this.arrowLength, TOP);
    this.rearArrow = new QueueNode(this.id, "rear", this.startArrowX, this.startRearArrowY);
    this.id++;
    this.addCommand(newPointerCmd, this.rearArrow.id, this.rearArrow.value, this.rearArrow.x, this.rearArrow.y, this.arrowLength, TOP);
    this.addCommand(commitCmds);
}
/**
 * 箭头消失
 */
QueueDemo.prototype.disappearArrow = function () {
    this.addCommand(deleteCmd, this.frontArrow.id);
    this.addCommand(deleteCmd, this.rearArrow.id);
    this.addCommand(commitCmds);
    this.frontArrow = null;
    this.rearArrow = null;
    this.front = -1;
    this.rear = -1;
}

/**
 * 节点
 * @param id
 * @param value
 * @param x
 * @param y
 * @constructor
 */
function QueueNode(id, value, x, y) {
    this.init(id, value, x, y);
}

QueueNode.prototype = new NodeObject();
QueueNode.prototype.constructor = QueueNode;