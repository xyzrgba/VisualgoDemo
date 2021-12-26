function initHtml() {
    objectManager = new ObjectManager(canvas.width, canvas.height);
    animatedManager = new AnimatedManager(objectManager);
    algorithmInstance = new BinaryTreeDemo(animatedManager, canvas.width, canvas.height);
}

/**
 * 完全二叉树
 * @param animatedManager
 * @param canvasWidth
 * @param canvasHeight
 * @constructor
 */
function BinaryTreeDemo(animatedManager, canvasWidth, canvasHeight) {
    this.init(animatedManager, canvasWidth, canvasHeight);
    this.initAttributes();
}

BinaryTreeDemo.prototype = new AlgorithmObject();
BinaryTreeDemo.prototype.constructor = BinaryTreeDemo;
/**
 * 初始化二叉树属性
 */
BinaryTreeDemo.prototype.initAttributes = function () {
    //逻辑部分
    this.id = 0;
    this.root = null;//根节点
    //图形属性
    this.orderResult = [];
    this.rootX = this.canvasWidth / 2.0;
    this.rootY = 80;
    this.radius = 20;//圆的半径
    this.levelSpacing = 120;//每一层的高度
    this.depth = parseInt((this.canvasHeight - this.rootY) / this.levelSpacing);
    this.leafSpacing = parseInt(0.8 * this.canvasWidth / (Math.pow(2, this.depth) - 1));
    //有树构成的三角形的底和高
    this.height = this.depth * this.levelSpacing;
    this.width = this.leafSpacing * Math.pow(2, this.depth);
    this.orderLabel = null;
}
/**
 * 清空全部的节点
 */
BinaryTreeDemo.prototype.resetAll = function () {
    if (this.id > 0) {
        this.addCommand(deleteAllObjectCmd);
        this.addCommand(commitCmds);
        this.orderlabel = null;
        if (null != this.root) {
            this.root.leftChild = null;
            this.root.rightChild = null;
        }
        this.root = null;
        this.orderResult = [];
        this.id = 0;
    }
    return this.commands;
}
/**
 * 创建根节点
 * @param value
 */
BinaryTreeDemo.prototype.createRootNode = function () {
    if (null != this.root) {
        this.resetAll();
        this.orderResult = [];
    }
    this.root = new BinaryTreeNode(this.id, String.fromCharCode(parseInt(Math.random() * 26) + 65), this.rootX, this.rootY);
    this.id++;
    this.addCommand(newCircleCmd, this.root.id, this.root.value, this.root.x, this.root.y, this.radius);
    // this.addCommand(setInnerColorCmd, this.root.id, true, APPEAR_COLOR);
    // this.addCommand(commitCmds);
    this.orderLabel = new BinaryTreeNode(this.id, "", this.rootX, parseInt(this.rootY + this.height));
    this.id++;
    this.addCommand(newLabelCmd, this.orderLabel.id, this.orderLabel.value, this.orderLabel.x, this.orderLabel.y);
    // this.addCommand(commitCmds);
}

/**
 * 创建树
 */
BinaryTreeDemo.prototype.createTree = function () {
    this.executeCommand(this.createBinaryTree.bind(this), "");
}
/**
 * 通过根节点创建一个五层的树
 * @returns {Array}
 */
BinaryTreeDemo.prototype.createBinaryTree = function () {
    this.createRootNode();
    if (this.root) {
        this.createTreeNodes(this.root, this.root.x, this.root.y);
        this.addCommand(commitCmds);
    }
    return this.commands;
}
/**
 * 递归创建其他节点
 */
BinaryTreeDemo.prototype.createTreeNodes = function (node, parentX, parentY) {
    let lastLevel = (parentY - this.rootY) / this.levelSpacing;
    let lastSections = Math.pow(2, lastLevel + 1);
    let currentLevel = lastLevel + 1;
    let currentSections = Math.pow(2, currentLevel + 1);
    let offsetX = this.width / lastSections - this.width / currentSections;
    let currentY = parentY + this.levelSpacing;
    if (currentLevel < this.depth) {
        node.leftChild = new BinaryTreeNode(this.id, String.fromCharCode(parseInt(Math.random() * 26) + 65), parentX - offsetX, currentY);
        this.id++;
        this.addCommand(newCircleCmd, node.leftChild.id, node.leftChild.value, node.leftChild.x, node.leftChild.y, this.radius);
        // this.addCommand(setInnerColorCmd, node.leftChild.id, true, APPEAR_COLOR);
        this.addCommand(connectCmd, node.id, node.leftChild.id, 0, false, "");
        // this.addCommand(commitCmds);
        this.createTreeNodes(node.leftChild, node.leftChild.x, node.leftChild.y);
        node.rightChild = new BinaryTreeNode(this.id, String.fromCharCode(parseInt(Math.random() * 26) + 65), parentX + offsetX, currentY);
        this.id++;
        this.addCommand(newCircleCmd, node.rightChild.id, node.rightChild.value, node.rightChild.x, node.rightChild.y, this.radius);
        // this.addCommand(setInnerColorCmd, node.rightChild.id, true, APPEAR_COLOR);
        this.addCommand(connectCmd, node.id, node.rightChild.id, 0, false, "");
        // this.addCommand(commitCmds);
        this.createTreeNodes(node.rightChild, node.rightChild.x, node.rightChild.y);
    }
    return;
}
/**
 * 清空canvas
 */
BinaryTreeDemo.prototype.clearAll = function () {
    let hint = "";
    this.executeCommand(this.resetAll.bind(this), "");
    return hint;
}
/**
 * 中序遍历
 */
BinaryTreeDemo.prototype.inorderTree = function () {
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
        hint += "请先创建满二叉树!";
    }
    return hint;
}
/**
 * 中序遍历
 */
BinaryTreeDemo.prototype.inorder = function () {
    this.inorderTreeNodes(this.root);
    return this.commands;
}
/**
 * @param node
 */
BinaryTreeDemo.prototype.inorderTreeNodes = function (node) {
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
BinaryTreeDemo.prototype.postorderTree = function () {
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
        hint += "请先创建满二叉树!";
    }
    return hint;
}
/**
 *
 */
BinaryTreeDemo.prototype.postorder = function () {
    this.postorderTreeNodes(this.root);
    return this.commands;
}
BinaryTreeDemo.prototype.postorderTreeNodes = function (node) {
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
 * 前序遍历
 */
BinaryTreeDemo.prototype.preorderTree = function () {
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
        hint += "请先创建满二叉树!";
    }
    return hint;
}
/**
 * 前序遍历
 */
BinaryTreeDemo.prototype.preorder = function () {
    this.preorderTreeNodes(this.root);
    return this.commands;
}
/**
 * 前序遍历 : 根节点 --> 左节点 --> 右节点
 * @param node
 */
BinaryTreeDemo.prototype.preorderTreeNodes = function (node) {
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
 * 二叉树节点的属性
 * @param id
 * @param value
 * @param x
 * @param y
 * @constructor
 */
function BinaryTreeNode(id, value, x, y) {
    this.init(id, value, x, y);
    this.leftChild = null;//左节点
    this.rightChild = null;//右节点
}

BinaryTreeNode.prototype = new NodeObject();
BinaryTreeNode.prototype.constructor = BinaryTreeNode;