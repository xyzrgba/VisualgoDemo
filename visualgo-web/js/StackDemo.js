function initHtml() {
    objectManager = new ObjectManager(canvas.width, canvas.height);
    animatedManager = new AnimatedManager(objectManager);
    algorithmInstance = new StackDemo(animatedManager, canvas.width, canvas.height);
}

/**
 * 栈
 * @param animatedManager
 * @param canvasWidth
 * @param canvasHeight
 * @constructor
 */
function StackDemo(animatedManager, canvasWidth, canvasHeight) {
    this.init(animatedManager, canvasWidth, canvasHeight);
    this.initAttributes();
}

StackDemo.prototype = new AlgorithmObject();
StackDemo.prototype.constructor = StackDemo;
/**
 * 初始化栈的属性
 */
StackDemo.prototype.initAttributes = function () {
    //逻辑部分
    this.size = 0;
    this.length = 0;//只受pop和push的影响
    this.stack = null;//用于存放实际的id和值，objectManager.nodes数组，前面size个用于存放框，
    this.top = -1;
    this.bottom = -1;
    //栈顶,栈底中心坐标
    this.topX = 350;
    this.topY = 250;
    this.bottomX = this.topX;
    this.bottomY = 0;
    //出现的坐标
    this.appearX = this.topX - 150;
    this.appearY = this.topY - 100;
    //消失的坐标
    this.disappearX = this.topX + 200;
    this.disappearY = this.topY - 100;
    //节点的长宽
    this.width = 70;
    this.height = 40;
    this.innerWidth = this.width - 4;
    this.innerHeigth = this.height - 4;
    this.id = 0;//开始默认为0
    this.nodeStack = null;//用于存放绘制的图形id
    //指针图形的属性
    this.bottomArrow = null;
    this.topArrow = null;
    this.arrowLength = 40;
    this.arrowBottomX = this.width / 2.0 + this.topX;
    this.arrowTopX = this.arrowBottomX + this.arrowLength + 55;
    this.arrowDirection = LEFT;
    //判断指针的移动方向
    this.isPush = false;
}
/**
 * 初始化栈
 * @param size
 */
StackDemo.prototype.initStack = function (size) {
    let initSize = parseInt(size);
    let maxSizeInCanvas = parseInt((this.canvasHeight - this.topY) / this.height - 1);
    let hint = "";
    if (initSize > 0 && initSize <= maxSizeInCanvas) {
        this.executeCommand(this.initStackSize.bind(this), parseInt(size));
    } else {
        hint += "请输入1 - " + maxSizeInCanvas;
    }
    return hint;
}
/**
 * 初始化栈的大小
 * @param size
 */
StackDemo.prototype.initStackSize = function (size) {
    if (size != "" && parseInt(size) > 0) {
        this.resetAll();
        this.size = parseInt(size);
        this.stack = [];
        this.nodeStack = [];
        this.bottomY = parseInt(this.topY + (this.size - 1) * this.height);
        let nodeY = this.bottomY;
        for (let i = 0; i < this.size; i++) {
            let node = new StackNode(this.id, "", this.topX, nodeY);
            nodeY -= this.height;
            this.id++;
            this.nodeStack.push(node);
            this.addCommand(newRectangleCmd, node.id, node.value, node.x, node.y, this.width, this.height);
        }
        this.addCommand(commitCmds);
    }
    return this.commands;
}
/**
 * 第一个元素插入时，箭头出现
 */
StackDemo.prototype.appearArrow = function () {
    if (this.isPush && this.length === 1) {
        this.bottomArrow = new StackNode(this.id, "bottom", this.arrowBottomX, this.bottomY);
        this.id++;
        this.addCommand(newPointerCmd, this.bottomArrow.id, this.bottomArrow.value, this.bottomArrow.x, this.bottomArrow.y, this.arrowLength, this.arrowDirection);
        this.topArrow = new StackNode(this.id, "top", this.arrowTopX, this.bottomY);
        this.id++;
        this.addCommand(newPointerCmd, this.topArrow.id, this.topArrow.value, this.topArrow.x, this.topArrow.y, this.arrowLength, this.arrowDirection);
        this.addCommand(commitCmds);
    }
}
/**
 * 最后一个元素消失时，箭头消失
 */
StackDemo.prototype.disappearArrow = function () {
    if (!this.isPush && this.length === 0) {
        this.addCommand(deleteCmd, this.bottomArrow.id);
        this.addCommand(deleteCmd, this.topArrow.id);
        this.addCommand(commitCmds);
    }
}
/**
 * 重新创建绘制时，清楚原来图形的数据
 */
StackDemo.prototype.resetAll = function () {
    if (this.id > 0) {
        //清空图形
        for (let i = 0; i < this.id; i++) {
            this.addCommand(deleteCmd, i);
        }
        this.addCommand(commitCmds);
        this.nodeStack = null;
        //清空逻辑
        this.id = 0;
        this.stack = null;
        this.size = 0;
        this.length = 0;
        this.size = 0;
        this.top = -1;
        this.bottom = -1;
    }
}
/**
 * 压入节点并执行
 * @param val
 */
StackDemo.prototype.pushNode = function (val) {
    let hint = "";
    if (this.length < this.size && this.size > 0) {
        this.executeCommand(this.push.bind(this), val);
    } else {
        if (this.size <= 0) {
            hint += "没有为栈开辟空间!请点击创建!";
        } else if (this.length >= this.size) {
            hint += "栈满了,无法压入";
        }
    }
    return hint;
}
/**
 * @param val
 */
StackDemo.prototype.push = function (val) {
    if (this.length < this.size) {
        this.isPush = true;
        //逻辑操作
        let node = new StackNode(this.id, val, this.appearX, this.appearY);
        this.id++;
        //绘制操作
        this.addCommand(newFillRectangleCmd, node.id, node.value, node.x, node.y, this.innerWidth, this.innerHeigth);
        this.addCommand(setNodeColorsCmd, node.id, WHITE_COLOR, APPEAR_COLOR);
        this.addCommand(commitCmds);
        this.addCommand(moveCmd, node.id, this.topX, node.y);
        this.addCommand(commitCmds);
        let tx = this.nodeStack[this.length].x;
        let ty = this.nodeStack[this.length].y;
        this.addCommand(moveCmd, node.id, tx, ty);
        this.addCommand(commitCmds);
        //逻辑操作
        this.stack.push(node);
        this.length++;
        if (this.length == 1) {
            this.appearArrow();
            this.bottom = 0;
            this.top = this.bottom;
        } else {
            this.topArrow.x = this.arrowBottomX;
            this.topArrow.y = this.nodeStack[this.length - 1].y;
            this.addCommand(moveCmd, this.topArrow.id, this.topArrow.x, this.topArrow.y);
            this.addCommand(commitCmds);
            this.top++;
        }
    }
    return this.commands;
}
/**
 * 弹出
 */
StackDemo.prototype.popNode = function () {
    let hint = "";
    if (this.length > 0 && this.size > 0) {
        this.executeCommand(this.pop.bind(this));
    } else {
        if (this.size <= 0) {
            hint += "没有为栈开辟空间!请点击创建!";
        } else if (this.length <= 0) {
            hint += "栈空了，无法弹出";
        }
    }
    return hint;
}
/**
 * 弹出栈顶节点
 */
StackDemo.prototype.pop = function () {
    if (this.length > 0) {
        this.isPush = false;
        let node = this.stack.pop();
        this.length--;
        if (this.length > 0) {
            if (this.length === 1) {
                this.topArrow.x = this.arrowTopX;
            }
            this.topArrow.y = this.nodeStack[this.length - 1].y;
            this.top--;
            this.addCommand(moveCmd, this.topArrow.id, this.topArrow.x, this.topArrow.y);
            this.addCommand(commitCmds);
        } else {
            this.disappearArrow();
        }
        this.addCommand(setNodeColorsCmd, node.id, WHITE_COLOR, DISAPPEAR_COLOR);
        this.addCommand(moveCmd, node.id, this.topX, this.disappearY);
        this.addCommand(commitCmds);
        this.addCommand(moveCmd, node.id, this.disappearX, node.y);
        this.addCommand(commitCmds);
        this.addCommand(deleteCmd, node.id);
        this.addCommand(commitCmds);
    }
    return this.commands;
}
/**
 * 检查是否符合条件
 * @returns {boolean}
 */
StackDemo.prototype.check = function () {
    if (this.size > 0 && this.length <= this.size) {
        return true;
    } else {
        return false;
    }
}

/**
 * 堆栈的节点
 * @param id
 * @param value
 * @param x
 * @param y
 * @constructor
 */
function StackNode(id, value, x, y) {
    this.init(id, value, x, y);
}

StackNode.prototype = new NodeObject();
StackNode.prototype.constructor = StackNode;