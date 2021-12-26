/**
 * 初始化页面
 */
function initHtml() {
    objectManager = new ObjectManager(canvas.width, canvas.height);
    animatedManager = new AnimatedManager(objectManager);
    algorithmInstance = new HeapDemo(animatedManager, canvas.width, canvas.height);
}

/**
 * 采用圆画,堆是完全二叉树，无边
 * @param animatedManager
 * @param canvasWidth
 * @param canvasHeight
 * @constructor
 */
function HeapDemo(animatedManager, canvasWidth, canvasHeight) {
    this.init(animatedManager, canvasWidth, canvasHeight);
    this.initAttributes();
}

HeapDemo.prototype = new AlgorithmObject();
HeapDemo.prototype.constructor = HeapDemo;
/**
 * 初始化堆的属性
 */
HeapDemo.prototype.initAttributes = function () {
    //逻辑部分
    this.id = 0;
    this.heapArray = [];
    //图形部分
    this.root = null;//用于调整树的位置
    this.rootX = this.canvasWidth / 2.0;
    this.rootY = 80;
    this.appearX = this.canvasWidth * 3 / 4.0;
    this.radius = 20;
    this.levelSpacing = 80;//每一层的高度
    this.nodeSpacing = 40;//叶子节点的左右宽
}
/**
 * @param value
 */
HeapDemo.prototype.insertValue = function (value) {
    let hint = "";
    if ("" != value) {
        this.executeCommand(this.insert.bind(this), value);
    } else {
        hint += "值为空!";
    }
    return hint;
}
/**
 * 向树中添加节点
 * @param value
 * @returns {Array}
 */
HeapDemo.prototype.insert = function (value) {
    //添加到树里面
    this.addToTree(value);
    return this.commands;
}
/**
 * 添加到树中并确定位置
 * 在数组中，偶数节点为右节点，奇数节点为左节点,根节点除外
 * @param node
 */
HeapDemo.prototype.addToTree = function (value) {
    let newNode = new HeapNode(this.id, value, this.appearX, this.rootY);
    this.id++;
    this.heapArray.push(newNode);
    this.addCommand(newCircleCmd, newNode.id, newNode.value, newNode.x, newNode.y, this.radius);
    this.addCommand(commitCmds);
    if (null == this.root) {
        this.root = newNode;
        newNode.x = this.rootX;
        this.addCommand(moveCmd, newNode.id, newNode.x, newNode.y);
        this.addCommand(commitCmds);
    } else {
        let currentIndex = this.heapArray.length - 1;
        let parentNode = this.heapArray[parseInt((currentIndex - 1) / 2.0)];
        newNode.parent = parentNode;
        //左节点
        if (currentIndex % 2 === 1) {
            parentNode.leftChild = newNode;
        } else {
            parentNode.rightChild = newNode;
        }
        this.addCommand(connectCmd, parentNode.id, newNode.id, 0, false, "");
        this.addCommand(commitCmds);
        this.adjustCoordinates();//调整坐标
        this.adjustValueByUp(newNode);
    }
}
/**
 *
 * @returns {string}
 */
HeapDemo.prototype.clearAll = function () {
    let hint = "";
    if (0 == this.id) {
        hint += "堆中无数据!";
    } else {
        this.executeCommand(this.resetAll.bind(this), "");
        hint += "清楚成功!";
    }
    return hint;
}
/**
 * 重置
 * @returns {Array}
 */
HeapDemo.prototype.resetAll = function () {
    this.addCommand(deleteAllObjectCmd);
    this.addCommand(commitCmds);
    this.id = 0;
    this.heapArray = [];
    if(null!=this.root){
        this.root.leftChild = null;
        this.root.rightChild = null;
    }
    this.root = null;
    return this.commands;
}
/**
 * @param startNode
 */
HeapDemo.prototype.adjustValueByUp = function (startNode) {
    try {
        if (startNode.value > startNode.parent.value) {
            this.addCommand(setInnerColorCmd, startNode.id, true, DISAPPEAR_COLOR);
            this.addCommand(setInnerColorCmd, startNode.parent.id, true, DISAPPEAR_COLOR);
            this.addCommand(commitCmds);
            //交换值
            let tempValue = startNode.value;
            startNode.value = startNode.parent.value;
            startNode.parent.value = tempValue;
            this.addCommand(setNodeValueCmd, startNode.id, startNode.value);
            this.addCommand(setNodeValueCmd, startNode.parent.id, startNode.parent.value);
            this.addCommand(commitCmds);
            this.addCommand(setInnerColorCmd, startNode.id, false, "");
            this.addCommand(setInnerColorCmd, startNode.parent.id, false, "");
            this.addCommand(commitCmds);
            this.adjustValueByUp(startNode.parent);
        } else {
            this.addCommand(setInnerColorCmd, startNode.id, true, APPEAR_COLOR);
            this.addCommand(setInnerColorCmd, startNode.parent.id, true, APPEAR_COLOR);
            this.addCommand(commitCmds);
            this.addCommand(setInnerColorCmd, startNode.id, false, "");
            this.addCommand(setInnerColorCmd, startNode.parent.id, false, "");
            this.addCommand(commitCmds);
        }
    } catch (e) {

    }
}
/**
 * 调整全部的坐标
 */
HeapDemo.prototype.adjustCoordinates = function () {
    if (null != this.root) {
        this.updateTreeWidth(this.root);
        this.updateTreeCoodinates(this.root, this.rootX, this.rootY, "");
        this.repaintCoodinates(this.root);
        this.addCommand(commitCmds);
    }
}
/**
 *
 * @param startNode
 */
HeapDemo.prototype.repaintCoodinates = function (startNode) {
    if (null != startNode) {
        this.addCommand(moveCmd, startNode.id, startNode.x, startNode.y);
        this.repaintCoodinates(startNode.leftChild);
        this.repaintCoodinates(startNode.rightChild);
    }
}
/**
 *
 * @param tree
 * @param x
 * @param y
 * @param direction
 */
HeapDemo.prototype.updateTreeCoodinates = function (startNode, x, y, direction) {
    if (null != startNode) {
        if (direction === LEFT) {
            x = parseInt(x - startNode.rightWidth);
        } else if (direction === RIGHT) {
            x = parseInt(x + startNode.leftWidth);
        }
        startNode.y = y;
        startNode.x = x;
        this.updateTreeCoodinates(startNode.leftChild, x, parseInt(y + this.levelSpacing), LEFT);
        this.updateTreeCoodinates(startNode.rightChild, x, parseInt(y + this.levelSpacing), RIGHT);
    }
}
/**
 * 获取整棵树的底宽
 * @param startNode
 * @returns {number}
 */
HeapDemo.prototype.updateTreeWidth = function (startNode) {
    //叶子结点
    if (null == startNode) {
        return 0;
    }
    startNode.leftWidth = Math.max(this.nodeSpacing, this.updateTreeWidth(startNode.leftChild));
    startNode.rightWidth = Math.max(this.nodeSpacing, this.updateTreeWidth(startNode.rightChild));
    console.log("节点id为:" + startNode.id + " 左宽:" + startNode.leftWidth + " 右宽:" + startNode.rightWidth + " x坐标:" + startNode.x);
    return parseInt(startNode.leftWidth + startNode.rightWidth);
}
/**
 *
 * @param value
 */
HeapDemo.prototype.deleteValue = function (value) {
    let hint = "";
    if (this.heapArray.length > 0) {
        if (this.isInArray(value)) {
            this.executeCommand(this.delete.bind(this), value);
        } else {
            hint += "不存在数据!";
        }
    } else {
        hint += "堆中没有数据!";
    }
    return hint;
}
/**
 *
 * @param value
 * @returns {boolean}
 */
HeapDemo.prototype.isInArray = function (value) {
    if (this.heapArray.length > 0) {
        for (let i = 0; i < this.heapArray.length; i++) {
            if (this.heapArray[i].value == value) {
                return true;
            }
        }
    }
    return false;
}
/**
 * @param value
 */
HeapDemo.prototype.delete = function (value) {
    let delNode = null;
    for (let i = 0; i < this.heapArray.length; i++) {
        if (value == this.heapArray[i].value) {
            delNode = this.heapArray[i];
            break;
        }
    }
    //删除首节点
    //为了保证堆的特性，找到最后一个节点交换位置,并删除最后一个节点
    if (1 == this.heapArray.length) {
        this.addCommand(setInnerColorCmd, delNode.id, true, DISAPPEAR_COLOR);
        this.addCommand(commitCmds);
        this.addCommand(deleteCmd, delNode.id);
        this.addCommand(commitCmds);
        this.heapArray.pop();
        if (null != this.root) {
            this.root.leftChild = null;
            this.root.rightChild = null;
        }
        this.root = null;
    } else {
        let lastNode = this.heapArray[this.heapArray.length - 1];
        delNode.value = lastNode.value;
        this.addCommand(setInnerColorCmd, delNode.id, true, DISAPPEAR_COLOR);
        this.addCommand(setInnerColorCmd, lastNode.id, true, DISAPPEAR_COLOR);
        this.addCommand(commitCmds);
        this.addCommand(disconnectCmd, lastNode.parent.id, lastNode.id);
        this.addCommand(commitCmds);
        this.addCommand(setNodeValueCmd, delNode.id, delNode.value);
        this.addCommand(commitCmds);
        if ((this.heapArray.length - 1) % 2 == 1) {
            lastNode.parent.leftChild = null;
        } else {
            lastNode.parent.rightChild = null;
        }
        lastNode.parent = null;
        this.addCommand(setInnerColorCmd, delNode.id, false, "");
        this.addCommand(setInnerColorCmd, lastNode.id, false, "");
        this.addCommand(commitCmds);
        this.addCommand(deleteCmd, lastNode.id);
        this.addCommand(commitCmds);
        this.heapArray.pop();
        this.adjustValueByDown(delNode);
    }
    this.adjustCoordinates();
    return this.commands;
}
/**
 * 只交换值
 * @param startNode
 */
HeapDemo.prototype.adjustValueByDown = function (startNode) {
    let adjustNode = null;
    if (null != startNode.leftChild && null != startNode.rightChild) {
        //左节点大,向左下沉
        if (startNode.rightChild.value < startNode.leftChild.value) {
            if (startNode.value < startNode.leftChild.value) {
                adjustNode = startNode.leftChild;
            }
        } else {
            if (startNode.value < startNode.rightChild.value) {
                adjustNode = startNode.rightChild;
            }
        }
    } else if (null != startNode.leftChild) {
        if (startNode.value < startNode.leftChild.value) {
            adjustNode = startNode.leftChild;
        }
    }
    if (null != adjustNode) {
        let tempValue = startNode.value;
        startNode.value = adjustNode.value;
        adjustNode.value = tempValue;
        this.addCommand(setInnerColorCmd, startNode.id, true, DISAPPEAR_COLOR);
        this.addCommand(setInnerColorCmd, adjustNode.id, true, DISAPPEAR_COLOR);
        this.addCommand(commitCmds);
        this.addCommand(setNodeValueCmd, startNode.id, startNode.value);
        this.addCommand(setNodeValueCmd, adjustNode.id, adjustNode.value);
        this.addCommand(commitCmds);
        this.addCommand(setInnerColorCmd, startNode.id, false, "");
        this.addCommand(setInnerColorCmd, adjustNode.id, false, "");
        this.addCommand(commitCmds);
        this.adjustValueByDown(adjustNode);
    }
}

/**
 * 用于画堆的节点
 * @param id
 * @param value
 * @param x
 * @param y
 * @constructor
 */
function HeapNode(id, value, x, y) {
    this.init(id, value, x, y);
    //顶层节点没有父节点，叶子结点没有子节点
    this.leftChild = null;
    this.rightChild = null;
    this.parent = null;
    this.leftWidth = 0;
    this.rightWidth = 0;
}

HeapNode.prototype = new NodeObject();
HeapNode.prototype.constructor = HeapNode;
