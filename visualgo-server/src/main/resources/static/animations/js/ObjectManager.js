/**
 * 用于管理AnimatedObject的类
 * 动画逻辑层管理，绘制
 * @param canvasWidth
 * @param canvasHeight
 * @constructor
 */
function ObjectManager(canvasWidth, canvasHeight) {
    this.nodes = [];//用于绘制一个节点,一位数组
    this.edges = [];//用于绘制边，二维数组
    this.ctx = document.querySelector("#canvas").getContext("2d");//绘制图画的工具箱
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
}

/**
 * 开始绘制
 */
ObjectManager.prototype.paint = function () {
    //清空画布
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    //node是一位数组
    for (let i = 0; i < this.nodes.length; i++) {
        if (null != this.nodes[i]) {
            this.nodes[i].paint(this.ctx);
        }
    }
    //edge是二维数组
    for (let i = 0; i < this.edges.length; i++) {
        if (this.edges[i] != null) {
            for (let j = 0; j < this.edges[i].length; j++) {
                if (null != this.edges[i][j] && undefined != this.edges[i][j]) {
                    this.edges[i][j].paint(this.ctx);
                }
            }
        }
    }
}
/**
 * 创建矩形图形
 * @param id
 * @param value
 * @param x
 * @param y
 * @param width
 * @param height
 */
ObjectManager.prototype.newRectangleNode = function (id, value, x, y, width, height) {
    if (null == this.nodes[id]) {
        this.nodes[id] = new AnimatedRectangle(id, value, x, y, width, height);
    }
}
/**
 * 创建填充的矩形
 * @param id
 * @param value
 * @param x
 * @param y
 * @param width
 * @param height
 */
ObjectManager.prototype.newFillRectangleNode = function (id, value, x, y, width, height) {
    if (null == this.nodes[id]) {
        this.nodes[id] = new AnimatedFillRectangle(id, value, x, y, width, height);
    }
}
/**
 * 创建圆形节点
 * @param id
 * @param value
 * @param x
 * @param y
 * @param radius
 */
ObjectManager.prototype.newCircleNode = function (id, value, x, y, radius) {
    if (null == this.nodes[id]) {
        this.nodes[id] = new AnimatedCircle(id, value, x, y, radius);
    }
}
/**
 * 创建新的标签用于显示文字
 * @param id
 * @param value
 * @param x
 * @param y
 */
ObjectManager.prototype.newLabelNode = function (id, value, x, y) {
    if (null == this.nodes[id]) {
        this.nodes[id] = new AnimatedLabel(id, value, x, y);
    }
}
/**
 * 划线
 * @param id
 * @param startX
 * @param startY
 * @param length
 * @param direction
 */
ObjectManager.prototype.newLineNode = function (id, startX, startY, enX, endY) {
    if (null == this.nodes[id]) {
        this.nodes[id] = new AnimatedLine(id, startX, startY, enX, endY);
    }
}
/**
 * 创建指指示器，用于指示操作位置
 * @param id
 * @param text
 * @param x
 * @param y
 * @param length
 * @param direction
 */
ObjectManager.prototype.newPointerNode = function (id, text, x, y, length, direction) {
    if (null == this.nodes[id]) {
        this.nodes[id] = new AnimatedPointer(id, text, x, y, length, direction);
    }
}
/**
 * 连接两个节点
 * @param startId
 * @param endId
 * @param curves
 * @param isDirection
 * @param weigth
 */
ObjectManager.prototype.connectNode = function (startId, endId, curves, isDirection, weigth) {
    if (null != this.nodes[startId] && null != this.nodes[endId]) {
        //图，树，表
        if (null == this.edges[startId] || undefined == this.edges[startId]) {
            this.edges[startId] = [];
        }
        let newEdge = new AnimatedEdge(this.nodes[startId], this.nodes[endId], curves, isDirection, weigth);
        this.edges[startId].push(newEdge);//对开始节点而言是正向边，对结束节点而言是反向边
    } else {
        alert("有节点不存在");
    }
}
/**
 * 取消两个节点的边，边是二维数组
 * @param startId
 * @param endId
 */
ObjectManager.prototype.disconnectNode = function (startId, endId) {
    let sid = parseInt(startId), eid = parseInt(endId);
    try {
        if (this.edges[sid]) {
            for (let i = 0; i < this.edges[sid].length; i++) {
                if (this.nodes[eid] == this.edges[sid][i].endNode) {
                    //如果是最后一个就弹出去，不是的话，用最后一个填充到这里，然后再弹出顶部
                    if (i != this.edges[sid].length) {
                        this.edges[sid][i] = this.edges[sid][this.edges[sid].length - 1];
                    }
                    this.edges[sid].pop();
                }
            }
        }
    } catch (e) {
        console.log("没有这条边!");
    }

}
/**
 * 删除节点
 * @param id
 */
ObjectManager.prototype.deleteNode = function (id) {
    if (null != this.nodes[id]) {
        this.nodes[id] = null;
    }
}
/**
 * 设置节点的XY坐标
 * @param id
 * @param x
 * @param y
 */
ObjectManager.prototype.setNodeCoordinates = function (id, x, y) {
    if (null != this.nodes[id]) {
        this.nodes[id].x = x;
        this.nodes[id].y = y;
    }
}
/**
 * 设置内部是否填充
 * @param id
 * @param isInner
 * @param innerColor
 */
ObjectManager.prototype.setNodeInner = function (id, isInner, innerColor) {
    if (null != this.nodes[id]) {
        if ("" != isInner) {
            this.nodes[id].isInner = isInner === "true" ? true : false;
        }
        if ("" != innerColor) {
            this.nodes[id].innerColor = innerColor;
        }
    }
}
/**
 * 设置节点的前景色和背景色
 * @param id
 * @param fgColor
 * @param bgColor
 */
ObjectManager.prototype.setNodeColors = function (id, fgColor, bgColor) {
    if (null != this.nodes[id]) {
        this.nodes[id].setColors(fgColor, bgColor);
    }
}
/**
 * 设置边的颜色
 * @param startId
 * @param endId
 * @param fgColor
 * @param bgColor
 */
ObjectManager.prototype.setEdgeColors = function (startId, endId, fgColor, bgColor) {
    let sid = parseInt(startId), eid = parseInt(endId);
    for (let i = 0; i < this.edges.length; i++) {
        if (this.edges[i]) {
            for (let j = 0; j < this.edges[i].length; j++) {
                if (this.nodes[sid] == this.edges[i][j].startNode && this.nodes[eid] == this.edges[i][j].endNode) {
                    this.edges[i][j].setColors(fgColor, bgColor);
                }
            }
        }
    }
}
/**
 *
 * @param id
 * @param lineWidth
 */
ObjectManager.prototype.setNodeLineWidth = function (id, lineWidth) {
    if (this.nodes[id]) {
        this.nodes[id].lineWidth = lineWidth;
    }
}
/**
 *
 * @param startId
 * @param endId
 * @param lineWidth
 */
ObjectManager.prototype.setEdgeLineWidth = function (startId, endId, lineWidth) {
    let sid = parseInt(startId), eid = parseInt(endId);
    for (let i = 0; i < this.edges.length; i++) {
        if (this.edges[i]) {
            for (let j = 0; j < this.edges[i].length; j++) {
                if (this.nodes[sid] == this.edges[i][j].startNode && this.nodes[eid] == this.edges[i][j].endNode) {
                    this.edges[i][j].setLineWidth(lineWidth);
                }
            }
        }
    }
}
/**
 * 删除所有的对象
 */
ObjectManager.prototype.deleteAllObjects = function () {
    this.nodes = [];
    this.edges = [];
}
/**
 * 设置节点的值
 * @param id
 * @param value
 */
ObjectManager.prototype.setNodeValue = function (id, value) {
    if (this.nodes[id]) {
        this.nodes[id].value = value;
    }
}
/**
 * 获取节点的X坐标
 * @param id
 * @returns {*}
 */
ObjectManager.prototype.getXCoordinate = function (id) {
    return this.nodes[id].x;
}
/**
 * 获取节点的Y坐标
 * @param id
 * @returns {*}
 */
ObjectManager.prototype.getYCoordinate = function (id) {
    return this.nodes[id].y;
}