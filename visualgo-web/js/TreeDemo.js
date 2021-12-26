function initHtml() {
    objectManager = new ObjectManager(canvas.width, canvas.height);
    animatedManager = new AnimatedManager(objectManager);
    algorithmInstance = new TreeDemo(animatedManager, canvas.width, canvas.height);
}

/**
 *
 * @param animatedManager
 * @param canvasWidth
 * @param canvasHeight
 * @constructor
 */
function TreeDemo(animatedManager, canvasWidth, canvasHeight) {
    this.init(animatedManager, canvasWidth, canvasHeight);
    this.initAttributes();
}

TreeDemo.prototype = new AlgorithmObject();
TreeDemo.prototype.constructor = TreeDemo;
/**
 *
 */
TreeDemo.prototype.initAttributes = function () {
    this.id = 0;
    this.charArray = [];
    this.nodesArray = [];
    this.root = null;
    this.rootX = Math.round(this.canvasWidth * 0.5);
    this.rootY = 100;
    this.appearX = Math.round(this.canvasWidth * 0.75);
    this.radius = 24;
    this.levelSpacing = 80;
    this.nodeSpacing = 50;
    this.labelY = this.rootY - this.radius * 2;
    this.orderLabel = null;
    this.orderResult = [];//存放便利的结果
    //层次遍历的队列
    this.levelQueue = [];
}
/**
 * 层次遍历的入队
 * @param node
 */
TreeDemo.prototype.enLevelQueue = function (node) {
    this.levelQueue.push(node);
}
/**
 * 层次遍历的出队
 * @returns {*}
 */
TreeDemo.prototype.deLevelQueue = function () {
    if (this.levelQueue.length <= 0) {
        return null;
    }
    let deNode = this.levelQueue[0];
    this.levelQueue.splice(0, 1);
    return deNode;
}
/**
 * 初始化遍历的属性等
 */
TreeDemo.prototype.initTraversed = function () {
    this.orderLabel = new TreeNode(this.id, "", this.rootX, this.labelY);
    this.id++;
    this.addCommand(newLabelCmd, this.orderLabel.id, this.orderLabel.value, this.orderLabel.x, this.orderLabel.y);
}
/**
 *
 * @param expression
 * @returns {string}
 */
TreeDemo.prototype.createTree = function (expression) {
    let hint = "";
    if ("" != expression) {
        this.resetAll();
        this.initTraversed();
        this.executeCommand(this.addNodesByExpression.bind(this), expression);
    } else {
        hint += "没有输入表达式!";
    }
    return hint;
}
/**
 *
 * @param expression
 * @returns {string}
 */
TreeDemo.prototype.addExpression = function (expression) {
    let hint = "";
    if ("" != expression) {
        if (null == this.root) {
            this.resetAll();
            this.initTraversed();
        }
        this.executeCommand(this.addNodesByExpression.bind(this), expression);
    } else {
        hint += "没有输入表达式!";
    }
    return hint;
}
/**
 * 向树中添加元素
 * @param value
 */
TreeDemo.prototype.addToTree = function (value) {
    let newNode = new TreeNode(this.id, value, this.appearX, this.rootY);
    this.id++;
    this.nodesArray.push(newNode);
    if (newNode.y > this.maxY) {
        this.maxY = newNode.y;
    }
    this.addCommand(newCircleCmd, newNode.id, newNode.value, newNode.x, newNode.y, this.radius);
    if (null == this.root) {
        this.root = newNode;
        newNode.x = this.rootX;
        this.addCommand(moveCmd, newNode.id, newNode.x, newNode.y);
        this.addCommand(commitCmds);
    } else {
        let currentIndex = this.nodesArray.length - 1;
        let parentNode = this.nodesArray[parseInt((currentIndex - 1) / 2.0)];
        //左节点
        if (currentIndex % 2 === 1) {
            parentNode.leftChild = newNode;
        } else {
            parentNode.rightChild = newNode;
        }
        this.addCommand(connectCmd, parentNode.id, newNode.id, 0, false, "");
        this.adjustCoordinates();//调整坐标
    }
}
/**
 *
 * @param expression
 * @returns {Array}
 */
TreeDemo.prototype.addNodesByExpression = function (expression) {
    this.charArray = expression.split("");
    if (this.charArray.length > 0) {
        for (let i = 0; i < this.charArray.length; i++) {
            this.addToTree(this.charArray[i]);
        }
    }
    return this.commands;
}
/**
 * 层次遍历
 * @returns {string}
 */
TreeDemo.prototype.levelTree = function () {
    let hint = "";
    if (this.root) {
        this.addCommand(setNodeValueCmd, this.orderLabel.id, "");
        this.addCommand(commitCmds);
        this.orderResult = [];
        this.orderResult.push("层次遍历的结果:");
        this.addCommand(setNodeValueCmd, this.orderLabel.id, (this.orderResult.toString()).replace(/,/g, " "));
        this.addCommand(commitCmds);
        this.levelQueue = [];
        this.executeCommand(this.levelOrder.bind(this), "");
    }
    return hint;
}
/**
 *
 */
TreeDemo.prototype.levelOrder = function () {
    this.levelOrderTreeNodes(this.root);
    return this.commands;
}
/**
 * 使用id作为唯一的标识符
 * @param startNode
 */
TreeDemo.prototype.levelOrderTreeNodes = function (node) {
    if (null == node) {
        return;
    }
    this.enLevelQueue(node);
    while (this.levelQueue.length > 0) {
        let visitedNode = this.deLevelQueue();
        this.addCommand(setInnerColorCmd, visitedNode.id, true, DISAPPEAR_COLOR);
        this.addCommand(commitCmds);
        this.orderResult.push(visitedNode.value);
        this.addCommand(setNodeValueCmd, this.orderLabel.id, (this.orderResult.toString()).replace(/,/g, " "));
        this.addCommand(commitCmds);
        this.addCommand(setInnerColorCmd, visitedNode.id, false, "");
        this.addCommand(commitCmds);
        if (null != visitedNode.leftChild) {
            this.enLevelQueue(visitedNode.leftChild);
        }
        if (null != visitedNode.rightChild) {
            this.enLevelQueue(visitedNode.rightChild);
        }
    }
}
/**
 * 前序遍历
 */
TreeDemo.prototype.preorderTree = function () {
    let hint = "";
    if (this.root) {
        this.addCommand(setNodeValueCmd, this.orderLabel.id, "");
        this.addCommand(commitCmds);
        this.orderResult = [];
        this.orderResult.push("前序遍历的结果:");
        this.addCommand(setNodeValueCmd, this.orderLabel.id, (this.orderResult.toString()).replace(/,/g, " "));
        this.addCommand(commitCmds);
        this.executeCommand(this.preorder.bind(this), "");
    } else {
        hint += "请先通过输入表达式创建完全二叉树!";
    }
    return hint;
}
/**
 * 前序遍历
 */
TreeDemo.prototype.preorder = function () {
    this.preorderTreeNodes(this.root);
    return this.commands;
}
/**
 * 前序遍历 : 根节点 --> 左节点 --> 右节点
 * @param node
 */
TreeDemo.prototype.preorderTreeNodes = function (node) {
    if (node) {
        this.addCommand(setInnerColorCmd, node.id, true, DISAPPEAR_COLOR);
        this.addCommand(commitCmds);
        this.orderResult.push(node.value);
        this.addCommand(setNodeValueCmd, this.orderLabel.id, (this.orderResult.toString()).replace(/,/g, " "));
        this.addCommand(commitCmds);
        this.addCommand(setInnerColorCmd, node.id, false, "");
        this.addCommand(commitCmds);
        this.preorderTreeNodes(node.leftChild);
        this.preorderTreeNodes(node.rightChild);
    }
    return;
}
/**
 * 中序遍历
 */
TreeDemo.prototype.inorderTree = function () {
    let hint = "";
    if (this.root) {
        this.addCommand(setNodeValueCmd, this.orderLabel.id, "");
        this.addCommand(commitCmds);
        this.orderResult = [];
        this.orderResult.push("中序遍历的结果:")
        this.addCommand(setNodeValueCmd, this.orderLabel.id, (this.orderResult.toString()).replace(/,/g, " "));
        this.addCommand(commitCmds);
        this.executeCommand(this.inorder.bind(this), "");
    } else {
        hint += "请先通过输入表达式创建完全二叉树!";
    }
    return hint;
}
/**
 * 中序遍历
 */
TreeDemo.prototype.inorder = function () {
    this.inorderTreeNodes(this.root);
    return this.commands;
}
/**
 * @param node
 */
TreeDemo.prototype.inorderTreeNodes = function (node) {
    if (node) {
        this.inorderTreeNodes(node.leftChild);
        this.addCommand(setInnerColorCmd, node.id, true, DISAPPEAR_COLOR);
        this.addCommand(commitCmds);
        this.orderResult.push(node.value);
        this.addCommand(setNodeValueCmd, this.orderLabel.id, (this.orderResult.toString()).replace(/,/g, " "));
        this.addCommand(commitCmds);
        this.addCommand(setInnerColorCmd, node.id, false, "");
        this.addCommand(commitCmds);
        this.inorderTreeNodes(node.rightChild);
    }
}
/**
 * 后序遍历
 */
TreeDemo.prototype.postorderTree = function () {
    let hint = "";
    if (this.root) {
        this.addCommand(setNodeValueCmd, this.orderLabel.id, "");
        this.addCommand(commitCmds);
        this.orderResult = [];
        this.orderResult.push("后序遍历的结果:")
        this.addCommand(setNodeValueCmd, this.orderLabel.id, (this.orderResult.toString()).replace(/,/g, " "));
        this.addCommand(commitCmds);
        this.executeCommand(this.postorder.bind(this), "");
    } else {
        hint += "请先通过输入表达式创建完全二叉树!";
    }
    return hint;
}
/**
 *
 */
TreeDemo.prototype.postorder = function () {
    this.postorderTreeNodes(this.root);
    return this.commands;
}
/**
 * 后序遍历
 * @param node
 */
TreeDemo.prototype.postorderTreeNodes = function (node) {
    if (node) {
        this.postorderTreeNodes(node.leftChild);
        this.postorderTreeNodes(node.rightChild);
        this.addCommand(setInnerColorCmd, node.id, true, DISAPPEAR_COLOR);
        this.addCommand(commitCmds);
        this.orderResult.push(node.value);
        this.addCommand(setNodeValueCmd, this.orderLabel.id, (this.orderResult.toString()).replace(/,/g, " "));
        this.addCommand(commitCmds);
        this.addCommand(setInnerColorCmd, node.id, false, "");
        this.addCommand(commitCmds);
    }
    return;
}
/**
 *
 */
TreeDemo.prototype.resetAll = function () {
    this.addCommand(deleteAllObjectCmd);
    this.addCommand(commitCmds);
    this.id = 0;
    this.charArray = [];
    this.nodesArray = [];
    this.orderResult = [];
    this.levelQueue = [];
    if (null != this.root) {
        this.root.leftChild = null;
        this.root.rightChild = null;
    }
    this.root = null;
    this.orderLabel = null;
    this.maxY = 0;
    return this.commands;
}
/**
 * 调整坐标
 */
TreeDemo.prototype.adjustCoordinates = function () {
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
 * @param x
 * @param y
 * @param direction
 */
TreeDemo.prototype.updateTreeCoodinates = function (startNode, x, y, direction) {
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
 *
 * @param startNode
 * @returns {number}
 */
TreeDemo.prototype.updateTreeWidth = function (startNode) {
    //叶子结点
    if (null == startNode) {
        return 0;
    }
    startNode.leftWidth = Math.max(this.nodeSpacing, this.updateTreeWidth(startNode.leftChild));
    startNode.rightWidth = Math.max(this.nodeSpacing, this.updateTreeWidth(startNode.rightChild));
    return parseInt(startNode.leftWidth + startNode.rightWidth);
}
/**
 * 绘制坐标
 * @param startNode
 */
TreeDemo.prototype.repaintCoodinates = function (startNode) {
    if (null != startNode) {
        this.addCommand(moveCmd, startNode.id, startNode.x, startNode.y);
        this.repaintCoodinates(startNode.leftChild);
        this.repaintCoodinates(startNode.rightChild);
    }
}

/**
 *
 * @param id
 * @param value
 * @param x
 * @param y
 * @constructor
 */
function TreeNode(id, value, x, y) {
    this.init(id, value, x, y);
    this.leftChild = null;//左节点
    this.rightChild = null;//右节点
    this.leftWidth = 0;
    this.rightWidth = 0;
}

TreeNode.prototype = new NodeObject();
TreeNode.prototype.constructor = TreeNode;