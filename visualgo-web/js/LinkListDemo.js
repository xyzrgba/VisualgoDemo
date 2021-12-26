/**
 * 初始化HTML页面数据
 */
function initHtml() {
    objectManager = new ObjectManager(canvas.width, canvas.height);
    animatedManager = new AnimatedManager(objectManager);
    algorithmInstance = new LinkListDemo(animatedManager, canvas.width, canvas.height);
}

/**
 * 单链表的绘制结构
 */
function LinkListDemo(animatedManager, canvasWidth, canvasHeight) {
    this.init(animatedManager, canvasWidth, canvasHeight);
    this.initAttributes();
}

LinkListDemo.prototype = new AlgorithmObject();//继承
LinkListDemo.prototype.constructor = LinkListDemo;//制定构造函数
/**
 * 初始化一个链表中的属性
 */
LinkListDemo.prototype.initAttributes = function () {
    //逻辑部分
    this.head = null;//头结点
    this.foot = null;//最后的节点
    this.length = 0;//默认链表长度
    //图形部分
    this.id = 0;
    this.width = 70;
    this.height = 40;
    this.innerWidth = this.width - 4;
    this.innerHeight = this.height - 4;
    this.interval = 50;//每个节点之间的间隔
    //创建新节点开始的位置
    this.newBeginY = 150;
    //头节点信息
    this.headArrow = null;
    this.footArrow = null;
    this.beginX = 100;
    this.beginY = this.newBeginY + 100;

    //head，end指针的位置
    this.arrowLength = 40;
    this.headArrowY = this.beginY + 25;
    this.footArrowY = this.headArrowY + this.arrowLength + 20;
    this.executeCommand(this.initHeadNode.bind(this), 0);//通过回调产生命令
}
/**
 * 初始化头结点
 * @returns {Array}
 */
LinkListDemo.prototype.initHeadNode = function () {
    this.head = new ListNode(this.id, 0, this.beginX, this.beginY, null);//让头节点记录长度
    this.foot = this.head;
    this.id++;
    this.length++;
    this.addCommand(newRectangleCmd, this.head.id, this.head.value, this.head.x, this.head.y, this.width, this.height);
    //新增的颜色控制
    this.addCommand(setInnerColorCmd, this.head.id, true, APPEAR_COLOR);
    this.headArrow = new ListNode(this.id, "head", this.beginX, this.headArrowY, null);
    this.id++;
    this.addCommand(newPointerCmd, this.headArrow.id, this.headArrow.value, this.headArrow.x, this.headArrow.y, this.arrowLength, TOP);
    this.footArrow = new ListNode(this.id, "index", this.beginX, this.footArrowY, null);
    this.id++;
    this.addCommand(newPointerCmd, this.footArrow.id, this.footArrow.value, this.footArrow.x, this.footArrow.y, this.arrowLength, TOP)
    this.addCommand(commitCmds);
    return this.commands;
}
/**
 * 提供给html使用
 * @param pos
 * @param val
 */
LinkListDemo.prototype.insertNode = function (pos, val) {
    let insertPos = parseInt(pos);
    let insertVal = val;
    let hint = "";
    if (insertPos > 0 && insertPos <= this.length) {
        this.executeCommand(this.insert.bind(this), [insertPos, insertVal]);
    } else {
        if (this.length === 1) {
            hint += "首节点的位置为0，请在位置处输入1。";
        } else {
            hint += "插入的位置错误!位置应大于 0 并且不大于 " + parseInt(this.length);
        }
    }
    return hint;
}
/**
 * 插入节点的信息，首先是位置，然后是数值
 * @param nodeInfo
 */
LinkListDemo.prototype.insert = function (nodeInfo) {
    let pos = parseInt(nodeInfo[0]);
    let value = nodeInfo[1];
    let index = this.head;//索引查找节点
    if (pos > 0 && pos <= this.length) {
        //先查找到插入前一个节点的位置
        {
            let i = 0;
            while (i < pos - 1 && index != null) {
                index = index.next;
                i++;
            }
        }
        let newNode = new ListNode(this.id, value, index.x, this.newBeginY, null);
        this.id++;
        //绘制
        this.addCommand(newRectangleCmd, newNode.id, newNode.value, newNode.x, newNode.y, this.width, this.height);
        this.addCommand(setInnerColorCmd, newNode.id, true, APPEAR_COLOR);
        this.addCommand(commitCmds);
        if (index == this.foot) {
            //插入到尾部 if(this.head==next)
            newNode.x = parseInt(index.x + this.interval + this.width);
            newNode.y = parseInt(index.y);
            index.next = newNode;
            this.foot = newNode;
            this.footArrow.x = newNode.x;
            this.footArrow.y = this.headArrowY;//和指向头节点的动画箭头平行
            //连接两个节点,参数格式startId, endId, curves, direction, weigth
            this.addCommand(connectCmd, index.id, newNode.id, 0, true, "");
            this.addCommand(setEdgeColorsCmd, index.id, newNode.id, "", BLACK_COLOR);
            this.addCommand(commitCmds);
            this.addCommand(moveCmd, newNode.id, newNode.x, newNode.y);
            this.addCommand(commitCmds);
            this.addCommand(moveCmd, this.footArrow.id, this.footArrow.x, this.footArrow.y);
            this.addCommand(commitCmds);
        } else {
            //插入到中间,查找位置
            newNode.x = parseInt(index.x + this.interval + this.width);
            newNode.y = parseInt(index.y);
            newNode.next = index.next;
            index.next = newNode;
            //逻辑上断开原来的节点之间的连接,再重新连接
            this.addCommand(connectCmd, newNode.id, newNode.next.id, 0, true, "");
            this.addCommand(setEdgeColorsCmd, newNode.id, newNode.next.id, "", BLACK_COLOR);
            this.addCommand(setEdgeColorsCmd, index.id, newNode.next.id, "", DISAPPEAR_COLOR);
            this.addCommand(commitCmds);
            this.addCommand(disconnectCmd, index.id, newNode.next.id);
            this.addCommand(commitCmds);
            this.addCommand(connectCmd, index.id, newNode.id, 0, true, "");
            this.addCommand(setEdgeColorsCmd, index.id, newNode.id, "", BLACK_COLOR);
            this.addCommand(commitCmds);
            //由于是中间插入，所以之后的节点全部后移
            this.backward(newNode.next);
            this.addCommand(moveCmd, newNode.id, newNode.x, newNode.y);
            this.addCommand(commitCmds);
        }
        this.length++;
    }
    return this.commands;
}
/**
 *
 * @param pos
 */
LinkListDemo.prototype.deleteNode = function (pos) {
    let hint = "";
    let delPos = parseInt(pos);
    if (delPos > 0 && delPos < this.length) {
        this.executeCommand(this.delete.bind(this), parseInt(pos));
    } else {
        if (this.length === 1) {
            hint += "不能删除首节点。";
        } else {
            hint += "删除的位置错误！位置应大于 0 并且不大于 " + parseInt(this.length - 1);
        }
    }
    return hint;
}
//通过位置删除
LinkListDemo.prototype.delete = function (pos) {
    let delPos = parseInt(pos);
    let delNode = null;
    if (delPos > 0 && delPos < this.length) {
        let index = this.head;
        //查找到删除前的一个节点
        {
            let i = 0;
            while (i < delPos - 1 && null != index) {
                index = index.next;
                i++;
            }
        }
        delNode = index.next;
        this.addCommand(setInnerColorCmd, delNode.id, "", DISAPPEAR_COLOR);
        this.addCommand(setEdgeColorsCmd, index.id, delNode.id, "", DISAPPEAR_COLOR);
        this.addCommand(commitCmds);
        if (null != delNode) {
            //删除尾结点
            if (delNode == this.foot) {
                this.foot = index;
                this.foot.next = null;
                this.footArrow.x = this.foot.x;
                if (this.foot == this.head) {
                    this.footArrow.y = this.footArrowY;
                } else {
                    this.footArrow.y = this.headArrowY;
                }
                //移动尾指针
                this.addCommand(moveCmd, this.footArrow.id, this.footArrow.x, this.footArrow.y);
                this.addCommand(commitCmds);
                index.next = null;
                this.addCommand(disconnectCmd, index.id, delNode.id);
                this.addCommand(commitCmds);
                this.addCommand(deleteCmd, delNode.id);
                this.addCommand(commitCmds);
            } else {
                //从链表中移除节点
                delNode.y = delNode.y - 2 * this.height;
                this.addCommand(setEdgeColorsCmd, delNode.id, delNode.next.id, "", DISAPPEAR_COLOR);
                this.addCommand(moveCmd, delNode.id, delNode.x, delNode.y);
                this.addCommand(commitCmds);
                this.addCommand(disconnectCmd, index.id, delNode.id);
                this.addCommand(commitCmds);
                this.addCommand(connectCmd, index.id, delNode.next.id, 0, true, "");
                this.addCommand(setEdgeColorsCmd, index.id, delNode.next.id, "", BLACK_COLOR);
                this.addCommand(commitCmds);
                index.next = delNode.next;
                delNode.next = null;
                this.addCommand(disconnectCmd, delNode.id, index.next.id);
                this.addCommand(commitCmds);
                this.addCommand(deleteCmd, delNode.id);
                this.addCommand(commitCmds);
                this.forward(index.next);
                this.addCommand(commitCmds);
            }
            this.length--;
        }
    }
    return this.commands;
}
/**
 * 向前移动
 * @param startNode
 */
LinkListDemo.prototype.forward = function (startNode) {
    let snode = startNode;
    while (snode != null) {
        snode.x = parseInt(snode.x - this.width - this.interval);
        snode.y = snode.y;
        this.addCommand(moveCmd, snode.id, snode.x, snode.y);
        snode = snode.next;
    }
    //结束后尾指针的移动
    if (this.head != this.foot) {
        this.footArrow.x = this.foot.x;
        this.footArrow.y = this.headArrowY;
        this.addCommand(moveCmd, this.footArrow.id, this.footArrow.x, this.footArrow.y);
    }
}
/**
 * 向后移动
 * @param startNode
 */
LinkListDemo.prototype.backward = function (startNode) {
    let snode = startNode;
    while (snode != this.foot) {
        snode.x = snode.next.x;
        snode.y = snode.next.y;
        this.addCommand(moveCmd, snode.id, snode.x, snode.y);
        snode = snode.next;
    }
    //结束后到了尾结点移动
    this.foot.x = parseInt(this.foot.x + this.interval + this.width);
    this.foot.y = parseInt(this.foot.y);
    this.addCommand(moveCmd, this.foot.id, this.foot.x, this.foot.y);
    this.footArrow.x = this.foot.x;
    this.footArrow.y = this.headArrowY;
    this.addCommand(moveCmd, this.footArrow.id, this.footArrow.x, this.footArrow.y);
}

/**
 *  链表节点的逻辑结构
 */
function ListNode(id, value, x, y, next) {
    this.init(id, value, x, y);
    this.next = next;
}

ListNode.prototype = new NodeObject();
ListNode.prototype.constructor = ListNode;