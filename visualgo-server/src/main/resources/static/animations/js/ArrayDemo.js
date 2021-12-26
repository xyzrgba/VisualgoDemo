function initHtml() {
    objectManager = new ObjectManager(canvas.width, canvas.height);
    animatedManager = new AnimatedManager(objectManager);
    algorithmInstance = new ArrayDemo(animatedManager, canvas.width, canvas.height);
}

/**
 * 数组
 * @param animatedManager
 * @param canvasWidth
 * @param canvasHeight
 * @constructor
 */
function ArrayDemo(animatedManager, canvasWidth, canvasHeight) {
    this.init(animatedManager, canvasWidth, canvasHeight);
    this.initAttributes();
}

ArrayDemo.prototype = new AlgorithmObject();
ArrayDemo.prototype.constructor = ArrayDemo;
/**
 * 初始化属性
 */
ArrayDemo.prototype.initAttributes = function () {
    //逻辑部分
    this.id = 0;
    this.array = null;
    this.size = 0;
    //图形部分
    this.nodeArray = null;
    this.textArray = null;
    this.nameLabel = null;
    this.width = 70;
    this.height = 50;
    this.innerHeigth = this.height - 4;
    this.innerWidth = this.width - 4;
    this.indexArrow = null;
    this.startX = 200;
    this.startY = 200;
    this.nameX = this.startX - this.width / 2.0 - 20;
    this.labelY = parseInt(this.startY + (this.height / 2.0) + 15);
    // this.labelY = 400;
    this.appearY = this.startY - 100;
    this.disappearY = this.appearY;
    this.arrowY = this.startY + this.height / 2.0;
    this.arrowLength = 40;
}
/**
 * 初始化数组
 * @param size
 * @returns {*}
 */
ArrayDemo.prototype.initArray = function (size) {
    let hint = "";//返回界面的提示信息
    if ("" != size && parseInt(size) > 0) {
        this.executeCommand(this.initArraySize.bind(this), size);
    } else {
        hint += "初始化数组的大小错误，请输入 1 - " + parseInt((this.canvasWidth - this.startX) / this.width);
    }
    return hint;
}
/**
 * 初始化数组大小
 * @param size
 */
ArrayDemo.prototype.initArraySize = function (size) {
    this.resetAll();
    this.size = parseInt(size);
    this.array = [];
    this.nodeArray = [];
    this.textArray = [];
    this.nameLabel = new ArrayNode(this.id, "数组 a : ", this.nameX, this.startY);
    this.id++;
    this.addCommand(newLabelCmd, this.nameLabel.id, this.nameLabel.value, this.nameLabel.x, this.nameLabel.y);
    let tempX = this.startX;
    for (let i = 0; i < parseInt(size); i++) {
        let node = new ArrayNode(this.id, "", tempX, this.startY);
        this.nodeArray[i] = node;
        this.id++;
        this.addCommand(newRectangleCmd, node.id, node.value, node.x, node.y, this.width, this.height);
        let labelNode = new ArrayNode(this.id, "a[" + i + "]", tempX, this.labelY);
        this.id++;
        this.addCommand(newLabelCmd, labelNode.id, labelNode.value, labelNode.x, labelNode.y);
        this.addCommand(setNodeColorsCmd, labelNode.id, BLACK_COLOR, "");
        this.textArray[i] = labelNode;
        tempX += this.width;
    }
    this.addCommand(commitCmds);
    return this.commands;
}
/**
 *
 * @param pos
 */
ArrayDemo.prototype.deleteNode = function (pos) {
    let hint = "";
    let delPos = parseInt(pos);
    if (this.size > 0 && delPos >= 0 && this.size > delPos && this.array[delPos]) {
        this.executeCommand(this.delete.bind(this), parseInt(pos));
    } else {
        if (this.size <= 0) {
            hint += "请先创建数组!";
        } else {
            if (delPos < 0 || delPos >= this.size) {
                hint += "数组越界!范围为:0 - " + parseInt(this.size - 1);
            } else if (this.array[delPos] == null || this.array[delPos] == undefined) {
                hint += "a[" + delPos + "] 没有元素可以删除!";
            }
        }
    }
    return hint;
}
/**
 * 删除节点
 * @param pos
 */
ArrayDemo.prototype.delete = function (pos) {
    if (parseInt(pos) >= 0 && this.size > parseInt(pos)) {
        try {
            if (this.array[pos]) {
                this.addCommand(setNodeColorsCmd, this.array[pos].id, "", DISAPPEAR_COLOR);
                this.addCommand(commitCmds);
                this.addCommand(deleteCmd, this.array[pos].id);
                this.addCommand(commitCmds);
                this.array[pos] = null;
            }
        } catch (e) {
        }
    }
    return this.commands;
}
/**
 * 向数组中的函数
 * @param pos
 * @param val
 */
ArrayDemo.prototype.insertNode = function (pos, val) {
    let hint = "";
    if (pos >= 0 && pos < this.size && val != "" && pos != "" && this.size > 0) {
        this.executeCommand(this.insert.bind(this), [pos, val]);
    } else {
        if (this.size > 0) {
            if (pos < 0 || pos >= this.size) {
                hint += "数组越界!请输入位置为:0 - " + parseInt(this.size - 1);
            }
        } else {
            hint += "请先创建数组!";
        }
    }
    return hint;
}
/**
 *
 * 向数组中的函数
 * @param nodeInfo
 */
ArrayDemo.prototype.insert = function (nodeInfo) {
    let pos = parseInt(nodeInfo[0]);
    let val = nodeInfo[1];
    if (pos >= 0 && pos < this.size && val != "" && this.size > 0) {
        //如果原来位置有节点需要删除图形填充的节点，
        this.delete(parseInt(pos));
        let node = new ArrayNode(this.id, val, this.nodeArray[pos].x, this.appearY);
        this.array[pos] = node;
        this.id++;
        this.addCommand(newFillRectangleCmd, node.id, node.value, node.x, node.y, this.innerWidth, this.innerHeigth);
        this.addCommand(setNodeColorsCmd, node.id, WHITE_COLOR, APPEAR_COLOR);
        this.addCommand(commitCmds);
        this.addCommand(moveCmd, node.id, node.x, this.nodeArray[pos].y);
        this.addCommand(commitCmds);
    }
    return this.commands;
}
/**
 * 清空Canvas
 */
ArrayDemo.prototype.resetAll = function () {
    if (this.id > 0) {
        for (let i = 0; i < this.id; i++) {
            this.addCommand(deleteCmd, i);
        }
        this.addCommand(commitCmds);
        this.nodeArray = [];
        this.array = [];
        this.id = 0;
    }
}

/**
 *
 * @constructor
 */
function ArrayNode(id, value, x, y) {
    // this.id = id;
    // this.value = value;
    // this.x = x;
    // this.y = y;
    this.init(id, value, x, y);
}

ArrayNode.prototype = new NodeObject();
ArrayNode.prototype.constructor = ArrayNode;