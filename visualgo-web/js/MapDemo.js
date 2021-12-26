function initHtml() {
    objectManager = new ObjectManager(canvas.width, canvas.height);
    animatedManager = new AnimatedManager(objectManager);
    algorithmInstance = new MapDemo(animatedManager, canvas.width, canvas.height);
}

/**
 * 显示权重，采用无向图
 * @param animatedManager
 * @param canvasWidth
 * @param canvasHeight
 * @constructor
 */
function MapDemo(animatedManager, canvasWidth, canvasHeight) {
    this.init(animatedManager, canvasWidth, canvasHeight);
    this.initAttributes();
}

MapDemo.prototype = new AlgorithmObject();
MapDemo.prototype.constructor = MapDemo;
/**
 * 初始化的属性
 */
MapDemo.prototype.initAttributes = function () {
    //画图的属性
    this.id = 0;
    this.mapNodes = [];
    this.mapEdges = [];
    this.weightMatrix = [];//权重矩阵，20及以下表示不通，20以上表示通
    this.radius = 22;
    //用于画出n边型 n >3
    this.bigRadius = 180;
    this.centerX = 300;
    this.centerY = 300;
    this.angle = 0;
    this.curves = 0.2;
    //有向为true，无向边false
    this.isDirected = false;
    //判断是否已经遍历过图
    this.isTraverse = false;
    //用于显示顺序的
    this.lineArray = [];
    this.resultArray = [];//用于存放遍历产生的节点顺序
}
/**
 *
 * @param nodeSize
 */
MapDemo.prototype.generateMap = function (nodeSize) {
    let hint = "";
    if (nodeSize > 3) {
        this.executeCommand(this.generateNodesAndEdges.bind(this), nodeSize);
    } else {
        hint += "请输入4到8";
    }
    return hint;
}
/**
 *
 */
MapDemo.prototype.resetResultNodes = function () {
    if (this.lineArray.length > 0) {
        for (let i = 0; i < this.lineArray.length; i++) {
            this.addCommand(deleteCmd, this.lineArray[i].id);
        }
    }
    if (this.resultArray.length > 0) {
        for (let i = 0; i < this.resultArray.length; i++) {
            this.addCommand(deleteCmd, this.resultArray[i].id);
        }
    }
}
/**
 * 生成随机的图
 * @param nodeSize
 * @returns {Array}
 */
MapDemo.prototype.generateNodesAndEdges = function (nodeSize) {
    let size = parseInt(nodeSize);
    if (size > 6) {
        this.centerX = 320;
        this.centerY = 320;
        this.bigRadius = 220;
    }
    if (size > 3 && size < 10) {
        this.resetAll();
        this.angle = Math.PI * 2 / size;
        let x = 0, y = 0;//用于生成点坐标的偏移量
        let sin = 0, cos = 0;
        for (let i = 0; i < size; i++) {
            sin = Math.sin(i * this.angle);
            cos = Math.cos(i * this.angle);
            x = this.centerX + this.bigRadius * sin;
            y = this.centerY - this.bigRadius * cos;
            let node = new MapNode(this.id, this.id, x, y);
            this.id++;
            this.mapNodes.push(node);
            this.addCommand(newCircleCmd, node.id, node.value, node.x, node.y, this.radius);
        }
        //产生随机的权重
        this.generateWeightMatrix();
        this.generateEdgesByMatrix();
        this.addCommand(commitCmds);
    }
    return this.commands;
}
/**
 * 通过矩阵生成边,采用下三角
 */
MapDemo.prototype.generateEdgesByMatrix = function () {
    if (this.isDirected) {
        //有向边
        for (let i = 0; i < this.mapNodes.length; i++) {
            for (let j = 0; j < this.mapNodes.length; j++) {
                let sid = 0, eid = 0;
                if (this.mapNodes[i] && this.mapNodes[j]) {
                    sid = this.mapNodes[i].id;
                    eid = this.mapNodes[j].id;
                }
                if (MAX_VALUE != this.weightMatrix[sid][eid]) {
                    let curves = 0;
                    if (MAX_VALUE != this.weightMatrix[eid][sid]) {
                        curves = this.curves;
                    }
                    let edge = new MapEdge(sid, eid, curves, true, this.weightMatrix[sid][eid]);
                    this.mapEdges[sid][eid] = edge;
                    this.addCommand(connectCmd, edge.sid, edge.eid, edge.curves, edge.isDirected, edge.weight);
                    this.addCommand(setEdgeColorsCmd, edge.sid, edge.eid, "", DALISHI_COLOR);
                }
            }
        }
    } else {
        //无向边
        for (let i = 0; i < this.mapNodes.length; i++) {
            for (let j = 0; j < i; j++) {
                let sid = 0, eid = 0;
                if (this.mapNodes[i] && this.mapNodes[j]) {
                    sid = this.mapNodes[i].id;
                    eid = this.mapNodes[j].id;
                }
                if (MAX_VALUE != this.weightMatrix[sid][eid]) {
                    if (null == this.mapEdges[sid] || undefined == this.mapEdges[sid]) {
                        this.mapEdges[sid] = [];
                    }
                    let edge = new MapEdge(sid, eid, 0, false, this.weightMatrix[sid][eid]);
                    this.mapEdges[sid][eid] = edge;
                    this.addCommand(connectCmd, edge.sid, edge.eid, edge.curves, edge.isDirected, edge.weight);
                    this.addCommand(setEdgeColorsCmd, edge.sid, edge.eid, "", DALISHI_COLOR);
                }
            }
        }
    }
}
/**
 * 重置
 */
MapDemo.prototype.resetAll = function () {
    this.mapNodes = [];
    this.mapEdges = [];
    this.weightMatrix = [];
    this.bigRadius = 180;
    this.centerX = 300;
    this.centerY = 300;
    this.id = 0;
    this.addCommand(deleteAllObjectCmd);
    this.addCommand(commitCmds);
}
/**
 * 生成随机的权重矩阵
 */
MapDemo.prototype.generateWeightMatrix = function () {
    for (let i = 0; i < this.mapNodes.length; i++) {
        for (let j = 0; j < this.mapNodes.length; j++) {
            let random = parseInt(Math.random() * 100);
            let sid = 0, eid = 0;
            if (this.mapNodes[i] && this.mapNodes[j]) {
                sid = this.mapNodes[i].id;
                eid = this.mapNodes[j].id;
            }
            if (null == this.weightMatrix[sid] || undefined == this.weightMatrix[sid]) {
                this.weightMatrix[sid] = [];
            }
            if (random > 50) {
                this.weightMatrix[sid][eid] = random;
            } else {
                this.weightMatrix[sid][eid] = MAX_VALUE;
            }
        }
    }
    // console.log("-------- 权重矩阵 ----------");
    // this.printWeight(this.weightMatrix);
}
/**
 * 对矩阵进行打印
 * @param matrix
 */
MapDemo.prototype.printWeight = function (matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let str = "";
        for (let j = 0; j < matrix[i].length; j++) {
            str += matrix[i][j] + "  ";
        }
        console.log(str);
    }
}
/**
 * 向图中增加边
 * @param sid
 * @param eid
 * @returns {string}
 */
MapDemo.prototype.insertEdge = function (sid, eid) {
    let hint = "";
    let min = Math.min(sid, eid), max = Math.max(sid, eid);
    if (max <= this.getMaxNodeId() && min >= this.getMinNodeId()) {
        if (MAX_VALUE == this.weightMatrix[max][min]) {
            if (this.isTraverse) {
                this.resetResultNodes();
                this.initColorAndLineWidth();
            }
            this.executeCommand(this.insertEdgeInMap.bind(this), [max, min]);
            this.isTraverse = false;
        } else {
            hint += "边已经存在";
        }
    } else {
        if (0 == this.id) {
            hint += "没有创建图";
        } else {
            hint += "id超出范围";
        }
    }
    return hint;
}
/**
 * 执行插入边的动作
 * @returns {Array}
 */
MapDemo.prototype.insertEdgeInMap = function (idArray) {
    let min = Math.min(idArray[0], idArray[1]), max = Math.max(idArray[0], idArray[1]);
    if (MAX_VALUE == this.weightMatrix[max][min]) {
        this.weightMatrix[max][min] = parseInt(Math.random() * 80 + 20);
        if (null == this.mapEdges[max] || undefined == this.mapEdges[max]) {
            this.mapEdges[max] = [];
        }
        let edge = new MapEdge(max, min, 0, false, this.weightMatrix[max][min]);
        this.mapEdges[max][min] = edge;
        this.addCommand(connectCmd, edge.sid, edge.eid, edge.curves, edge.isDirected, edge.weight);
        this.addCommand(setEdgeColorsCmd, edge.sid, edge.eid, "", DALISHI_COLOR);
        this.addCommand(commitCmds);
    }
    return this.commands;
}
/**
 *
 * @param sid
 * @param eid
 * @returns {string}
 */
MapDemo.prototype.deleteEdge = function (sid, eid) {
    let hint = "";
    let min = Math.min(sid, eid), max = Math.max(sid, eid);
    if (max <= this.getMaxNodeId() && min >= this.getMinNodeId()) {
        if (MAX_VALUE != this.weightMatrix[max][min]) {
            if (this.isTraverse) {
                this.resetResultNodes();
                this.initColorAndLineWidth();
            }
            this.executeCommand(this.deleteEdgeFromMap.bind(this), [max, min]);
            this.isTraverse = false;
        } else {
            hint += "边不存在";
        }
    } else {
        if (0 == this.id) {
            hint += "没有创建图";
        } else {
            hint += "id超出范围";
        }
    }
    return hint;
}
/**
 *
 * @param sid
 * @param eid
 * @returns {Array}
 */
MapDemo.prototype.deleteEdgeFromMap = function (idArray) {
    let min = Math.min(idArray[0], idArray[1]), max = Math.max(idArray[0], idArray[1]);
    if (MAX_VALUE != this.weightMatrix[max][min]) {
        this.weightMatrix[max][min] = MAX_VALUE;
        this.mapEdges[max][min] = null;
        this.addCommand(disconnectCmd, max, min);
        this.addCommand(commitCmds);
    }
    return this.commands;
}
/**
 * 获取最小的id
 * @returns {*}
 */
MapDemo.prototype.getMinNodeId = function () {
    try {
        let min = this.mapNodes[0].id;
        for (let i = 1; i < this.mapNodes.length; i++) {
            if (min > this.mapNodes[i].id) {
                min = this.mapNodes[i].id;
            }
        }
        return min;
    } catch (e) {

    }
}
/**
 * 获取最大的id
 * @returns {*}
 */
MapDemo.prototype.getMaxNodeId = function () {
    try {
        let max = this.mapNodes[0].id;
        for (let i = 1; i < this.mapNodes.length; i++) {
            if (max < this.mapNodes[i].id) {
                max = this.mapNodes[i].id;
            }
        }
        return max;
    } catch (e) {

    }
}
/**
 * 初始化BFS的结构
 */
MapDemo.prototype.initBFSAttributes = function () {
    this.bfsQueue = [];

}
/**
 * 进入队列
 * @param node
 */
MapDemo.prototype.enBfsQueue = function (node) {
    if (null != node) {
        this.bfsQueue.push(node);
        this.isVisited[node.id] = true;
    }
}
/**
 * 出队
 * @returns {*}
 */
MapDemo.prototype.deBfsQueue = function () {
    if (this.bfsQueue.length <= 0) {
        return null;
    }
    let deNode = this.bfsQueue[0];
    this.bfsQueue.splice(0, 1);
    return deNode;
}
/**
 *
 * @param startId
 */
MapDemo.prototype.bfs = function (startId) {
    if (null == this.mapNodes[startId]) {
        return;
    }
    this.enBfsQueue(this.mapNodes[startId]);
    this.addCommand(setInnerColorCmd, this.mapNodes[startId].id, true, APPEAR_COLOR);
    this.addCommand(commitCmds);
    this.addFillRect(startId);
    while (this.bfsQueue.length > 0) {
        let visited = this.deBfsQueue();
        for (let col = 0; col < this.mapNodes.length; col++) {
            if (MAX_VALUE != this.udMatrix[visited.id][col] && !this.isVisited[col]) {
                this.enBfsQueue(this.mapNodes[col]);
                let maxId = Math.max(visited.id, this.mapNodes[col].id);
                let minId = Math.min(visited.id, this.mapNodes[col].id);
                this.addCommand(setEdgeLineWidthCmd, maxId, minId, 2);
                this.addCommand(setEdgeColorsCmd, maxId, minId, "", APPEAR_COLOR);
                this.addCommand(commitCmds);
                this.addCommand(setInnerColorCmd, this.mapNodes[col].id, true, APPEAR_COLOR);
                this.addCommand(commitCmds);
                this.addFillRect(col);
            }
        }
    }
}
/**
 *
 * @param index
 */
MapDemo.prototype.addFillRect = function (index) {
    let fillRect = new MapNode(this.id, this.mapNodes[parseInt(index)].id, this.resultX + this.resultArray.length * this.resultWidth, this.resultY);
    this.id++;
    this.resultArray.push(fillRect);
    this.addCommand(newFillRectangleCmd, fillRect.id, fillRect.value, fillRect.x, fillRect.y, this.resultWidth - this.interval, this.resultHeight - this.interval);
    this.addCommand(setNodeColorsCmd, fillRect.id, WHITE_COLOR, APPEAR_COLOR);
    this.addCommand(commitCmds);
}
/**
 *
 * @param startId
 */
MapDemo.prototype.startBfsTraverse = function (startId) {
    this.initTraverseAttributes();
    this.initVisited();
    this.bfs(startId);
    return this.commands;
}
/**
 *
 * @param startId
 * @returns {string}
 */
MapDemo.prototype.startBFS = function (startId) {
    let hint = "";
    if (this.mapNodes.length > 0) {
        if (startId >= this.getMinNodeId() && startId <= this.getMaxNodeId()) {
            if (this.isTraverse) {
                this.resetResultNodes();
                this.initColorAndLineWidth();
            }
            this.initBFSAttributes();
            this.initVisited();
            this.initUndirectedMatrix();
            this.initColorAndLineWidth();
            this.executeCommand(this.startBfsTraverse.bind(this), startId);
            this.isTraverse = true;
        } else {
            hint += "id无效!";
        }
    } else {
        hint += "请先创建图!";
    }
    return hint;
}

/**
 * 遍历图添加命令
 * @param startId
 */
MapDemo.prototype.dfs = function (startId) {
    let row = parseInt(startId);
    if (!this.isVisited[row]) {
        this.isVisited[row] = true;
        this.addCommand(setInnerColorCmd, this.mapNodes[row].id, true, APPEAR_COLOR);
        this.addCommand(commitCmds);
        this.addFillRect(row);
        for (let col = 0; col < this.mapNodes.length; col++) {
            if (MAX_VALUE != this.udMatrix[row][col] && !this.isVisited[col]) {
                let maxId = Math.max(this.mapNodes[row].id, this.mapNodes[col].id);
                let minId = Math.min(this.mapNodes[row].id, this.mapNodes[col].id);
                this.addCommand(setEdgeLineWidthCmd, maxId, minId, 2);
                this.addCommand(setEdgeColorsCmd, maxId, minId, "", APPEAR_COLOR);
                this.addCommand(commitCmds);
                this.dfs(col);
            }
        }
    }
}
/**
 * 遍历图并返回命令
 * @param startId
 * @returns {Array}
 */
MapDemo.prototype.startDfsTraverse = function (startId) {
    this.initTraverseAttributes();
    this.dfs(startId);
    return this.commands;
}

/**
 *
 * @param startId
 */
MapDemo.prototype.startDFS = function (startId) {
    let hint = "";
    if (this.mapNodes.length > 0) {
        if (startId <= this.getMaxNodeId() && startId >= this.getMinNodeId()) {
            if (this.isTraverse) {
                this.resetResultNodes();
                this.initColorAndLineWidth();
            }
            this.initVisited();
            this.initUndirectedMatrix();
            this.initColorAndLineWidth();
            this.executeCommand(this.startDfsTraverse.bind(this), startId);
            this.isTraverse = true;
        } else {
            hint += "输入的id无效!";
        }
    } else {
        hint += "请先创建图";
    }
    return hint;
}
/**
 * 初始化
 */
MapDemo.prototype.initTraverseAttributes = function () {
    this.resetResultNodes();
    this.lineArray = [];
    this.resultArray = [];
    this.startX = this.centerX + this.bigRadius + 150;
    this.startY = this.centerY;
    this.arrayHeight = 52;
    this.arrayWidth = this.arrayHeight;
    this.arrayLength = (this.mapNodes.length + 1) * this.arrayWidth;
    this.resultY = this.startY + this.arrayHeight / 2;
    this.resultX = this.startX + this.arrayWidth * 3 / 4;
    this.resultWidth = this.arrayWidth;
    this.resultHeight = this.arrayHeight;
    this.interval = 4;
    this.initTraverseAnimations();
}
/**
 * 初始化遍历的动画顺序演示
 */
MapDemo.prototype.initTraverseAnimations = function () {
    for (let i = 0; i < 2; i++) {
        let line = new MapNode(this.id, "", this.startX, parseInt(this.startY + i * this.arrayHeight));
        this.id++;
        this.lineArray.push(line);
        this.addCommand(newLineCmd, line.id, line.x, line.y, line.x + this.arrayLength, line.y);
        this.addCommand(setNodeLineWidthCmd, line.id, 2);
        this.addCommand(setNodeColorsCmd, line.id, "", APPEAR_COLOR);
    }
    // let label = new MapNode(this.id, "遍历结果", this.arrayLength / 2 + this.startX, this.startY + this.arrayHeight + this.interval * 3);
    // this.id++;
    // this.lineArray.push(label);
    // this.addCommand(newLabelCmd, label.id, label.value, label.x, label.y);
    this.addCommand(commitCmds);
}
/**
 * 遍历用的
 */
MapDemo.prototype.initVisited = function () {
    //存储访问的顺序
    this.isVisited = [];
    for (let i = 0; i < this.mapNodes.length; i++) {
        this.isVisited[this.mapNodes[i].id] = false;
    }

}
/**
 * 初始化无向矩阵
 */
MapDemo.prototype.initUndirectedMatrix = function () {
    this.udMatrix = [];
    for (let row = 0; row < this.mapNodes.length; row++) {
        let rowid = this.mapNodes[row].id;
        if (null == this.udMatrix[rowid] || undefined == this.udMatrix[rowid]) {
            this.udMatrix[rowid] = [];
        }
        for (let col = 0; col < row; col++) {
            let colid = this.mapNodes[col].id;
            this.udMatrix[rowid][colid] = this.weightMatrix[rowid][colid];
            this.udMatrix[colid][rowid] = this.weightMatrix[rowid][colid];
        }
        this.udMatrix[rowid][rowid] = 0;
    }
}
/**
 * 初始化所有边的颜色
 */
MapDemo.prototype.initColorAndLineWidth = function () {
    for (let i = 0; i < this.mapNodes.length; i++) {
        this.addCommand(setInnerColorCmd, this.mapNodes[i].id, false, "");
    }
    for (let i = 0; i < this.mapNodes.length; i++) {
        for (let j = 0; j < i; j++) {
            if (MAX_VALUE != this.udMatrix[i][j]) {
                let maxId = Math.max(this.mapNodes[i].id, this.mapNodes[j].id);
                let minId = Math.min(this.mapNodes[i].id, this.mapNodes[j].id);
                this.addCommand(setEdgeColorsCmd, maxId, minId, BLACK_COLOR, DALISHI_COLOR);
                this.addCommand(setEdgeLineWidthCmd, maxId, minId, 1);
            }
        }
    }
    this.addCommand(commitCmds);
}
/**
 *
 * @param startId
 * @param endId
 * @returns {string}
 */
MapDemo.prototype.runDijkatra = function (startId, endId) {
    let hint = "";
    if (this.mapNodes.length > 0) {
        if (startId >= this.getMinNodeId() && startId <= this.getMaxNodeId() &&
            endId >= this.getMinNodeId() && endId <= this.getMaxNodeId()) {
            if (this.isTraverse) {
                this.resetResultNodes();
            }
            this.initUndirectedMatrix();
            this.initVisited();
            this.initColorAndLineWidth();
            this.isTraverse = false;
            this.executeCommand(this.prepareDijkatra.bind(this), [startId, endId]);
        } else {
            hint += "id超出范围";
        }
    } else {
        hint += "请先创建图!";
    }
    return hint;
}
/**
 *
 * @param idArray
 * @returns {Array}
 */
MapDemo.prototype.prepareDijkatra = function (idArray) {
    let startId = parseInt(idArray[0]), endId = parseInt(idArray[1]);
    this.dijkatra(startId, endId);
    return this.commands;
}
/**
 *
 * @param startId
 * @param endId
 */
MapDemo.prototype.printDijkatraPaths = function (startId, endId, nodesArray) {
    // for (let i = 0; i < this.mapNodes.length; i++) {
    //     if (i != startId) {
    //         console.log(startId + " 到 " + i + " 最短距离: " + this.dist[i] + " , 路径是:" + i);
    //         let temp = nodesArray[i];
    //         while (temp != startId) {
    //             console.log(" -- " + temp);
    //             temp = nodesArray[temp];
    //         }
    //         console.log(" -- " + startId);
    //     }
    //     for (let i = 0; i < nodesArray.length; i++) {
    //         console.log(nodesArray[i]);
    //     }
    // }
    let pathStack = [];
    pathStack.push(endId);
    let temp = nodesArray[endId];
    while (temp != startId) {
        pathStack.push(temp);
        temp = nodesArray[temp];
    }
    pathStack.push(startId);
    this.addCommand(setInnerColorCmd, pathStack[pathStack.length - 1], true, APPEAR_COLOR);
    this.addCommand(commitCmds);
    for (let i = pathStack.length - 1; i > 0; i--) {
        let maxId = Math.max(pathStack[i], pathStack[i - 1]), minId = Math.min(pathStack[i], pathStack[i - 1]);
        this.addCommand(setEdgeLineWidthCmd, maxId, minId, 2);
        this.addCommand(setEdgeColorsCmd, maxId, minId, "", APPEAR_COLOR);
        this.addCommand(setInnerColorCmd, pathStack[i - 1], true, APPEAR_COLOR);
        this.addCommand(commitCmds);
    }
}
/**
 *
 * @param startId
 * @param endId
 */
MapDemo.prototype.dijkatra = function (startId, endId) {
    let minDist = MAX_VALUE;//最短的距离
    let minDistIndex;//权值最小的那个顶点的下标
    let visited = [];//记录是否访问
    let distArray = [];//源点到i顶点的最短距离
    let preNodeArray = [];//记录最短路径。pre[i]放的是i的前驱节点
    visited[startId] = true;
    //初始化
    for (let i = 0; i < this.mapNodes.length; i++) {
        distArray[i] = this.udMatrix[startId][i];
        preNodeArray[i] = startId;//让每一个前驱都指向startId
    }
    //遍历n-1次，
    for (let i = 1; i < this.mapNodes.length; i++) {
        minDist = MAX_VALUE;
        for (let j = 0; j < this.mapNodes.length; j++) {
            //寻找最小权重的边，确保这个点没有找过
            if (!this.isVisited[j] && distArray[j] < minDist) {
                minDist = distArray[j];
                minDistIndex = j;
            }
        }
        this.isVisited[minDistIndex] = true;//访问最小的节点
        for (let j = 0; j < this.mapNodes.length; j++) {
            //若下标为minCostIndex顶点各边权值小于此前这些顶点未被加入生成树权值,并且没有访问过
            if (!this.isVisited[j] && MAX_VALUE != this.udMatrix[minDistIndex][j]
                && minDist + this.udMatrix[minDistIndex][j] < distArray[j]) {
                distArray[j] = minDist + this.udMatrix[minDistIndex][j];//将较小的权存入distArray
                preNodeArray[j] = minDistIndex;
            }
        }
    }
    //根据生成的路径表打印
    this.printDijkatraPaths(startId, endId, preNodeArray);
}

/**
 *
 * @returns {string}
 */
MapDemo.prototype.runPrim = function () {
    let hint = "";
    if (this.mapNodes.length > 0) {
        if (this.isTraverse) {
            this.resetResultNodes();
        }
        this.initUndirectedMatrix();
        this.initColorAndLineWidth();
        this.isTraverse = false;
        this.executeCommand(this.preparePrim.bind(this), "");
    } else {
        hint += "请先创建图!";
    }
    return hint;
}
/**
 *
 * @returns {Array}
 */
MapDemo.prototype.preparePrim = function () {
    this.prim();
    return this.commands;
}
/**
 *
 */
MapDemo.prototype.prim = function () {
    let minCostIndex;//最小权重的索引值
    let minCost = MAX_VALUE;//最小的权重
    let nodesArray = []; // 保存相关顶点下标
    let costArray = []; // 保存相关顶点间的权值
    for (let i = 0; i < this.mapNodes.length; i++) {
        costArray[i] = this.udMatrix[0][i]; //将V0顶点与之有边的权的权值存入数组
        nodesArray[i] = 0; //初始化都为v0的下标
    }
    for (let i = 1; i < this.mapNodes.length; i++) {
        minCost = MAX_VALUE;
        for (let j = 0; j < this.mapNodes.length; j++) {
            //如果权值不为0且小于minCost
            if (costArray[j] != 0 && costArray[j] < minCost) {
                minCost = costArray[j];
                minCostIndex = j;
            }
        }
        costArray[minCostIndex] = 0; //将当前顶点的权值设置为0，表示此顶点已完成任务
        let maxId = Math.max(this.mapNodes[nodesArray[minCostIndex]].id, this.mapNodes[minCostIndex].id),
            minId = Math.min(this.mapNodes[nodesArray[minCostIndex]].id, this.mapNodes[minCostIndex].id);
        this.addCommand(setInnerColorCmd, minId, true, APPEAR_COLOR);
        this.addCommand(setEdgeLineWidthCmd, maxId, minId, 2);
        this.addCommand(setEdgeColorsCmd, maxId, minId, "", APPEAR_COLOR);
        this.addCommand(setInnerColorCmd, maxId, true, APPEAR_COLOR);
        this.addCommand(commitCmds);
        //循环所有顶点
        for (let j = 0; j < this.mapNodes.length; j++) {
            //若下标为minCostIndex顶点各边权值小于此前这些顶点未被加入生成树权值
            if (costArray[j] != 0 && this.udMatrix[minCostIndex][j] < costArray[j]) {
                costArray[j] = this.udMatrix[minCostIndex][j]; //将较小权值存入 costArray
                nodesArray[j] = minCostIndex;
            }
        }
    }
}

/**
 * 图的节点
 * @param id
 * @param value
 * @param x
 * @param y
 * @constructor
 */
function MapNode(id, value, x, y) {
    this.init(id, value, x, y);
}

MapNode.prototype = new NodeObject();
MapNode.prototype.constructor = MapNode;

/**
 * 图的边，从snode到enode
 * @param sId
 * @param eId
 * @param curves
 * @param isDirected
 * @param weight
 * @constructor
 */
function MapEdge(sId, eId, curves, isDirected, weight) {
    this.sid = sId;
    this.eid = eId;
    this.isDirected = isDirected;
    this.weight = weight;
    this.curves = curves;
}

MapEdge.prototype = new NodeObject();
MapEdge.prototype.constructor = MapEdge;
/**
 * //废弃的BFS实现
 MapDemo.prototype.bfs = function (startId) {
    let next = 0;
    if (!this.isVisited[startId]) {
        this.isVisited[startId] = true;
        this.bfsQueue.push(this.mapNodes[startId].id);
        this.addCommand(setInnerColorCmd, this.mapNodes[startId].id, true, APPEAR_COLOR);
        this.addCommand(commitCmds);
        this.addFillRect(startId);
    }
    next = this.bfsQueue.length;
    for (let col = 0; col < this.mapNodes.length; col++) {
        if (this.udMatrix[startId][col] > 0 && !Array.isInArray(this.bfsQueue, this.mapNodes[col].id)) {
            this.bfsQueue.push(this.mapNodes[col].id);
            this.isVisited[this.mapNodes[col].id] = true;
            let maxId = Math.max(startId, this.mapNodes[col].id);
            let minId = Math.min(startId, this.mapNodes[col].id);
            this.addCommand(setEdgeLineWidthCmd, maxId, minId, 2);
            this.addCommand(setEdgeColorsCmd, maxId, minId, "", APPEAR_COLOR);
            this.addCommand(commitCmds);
            this.addCommand(setInnerColorCmd, this.mapNodes[col].id, true, APPEAR_COLOR);
            this.addCommand(commitCmds);
            this.addFillRect(col);
        }
    }
    for (let i = next; i < this.bfsQueue.length; i++) {
        this.bfs(this.bfsQueue[i]);
    }
}
 */