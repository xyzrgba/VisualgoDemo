/**
 * 动画管理类，动画绘制层
 * @param objectManager
 * @constructor
 */
function AnimatedManager(objectManager) {
    this.objectManager = objectManager;//运动对象管理
    this.stepCommands = null;//动画命令数组
    this.currentStep = 0;//指示提交过来的动画数组的索引，从那一步在开始执行
    this.currentFrame = 0;
    this.maxFrame = 25;
    this.movedCommands = [];
}

/**
 * 开始新一步的动画
 * @param commands
 */
AnimatedManager.prototype.startSeriesAnimations = function (commands) {
    clearTimeout(timer);
    this.stepCommands = commands;
    this.startParsingNextCommands();
    timer = setTimeout(timeout, interval);
}
/**
 * 分析下一步的指令
 */
AnimatedManager.prototype.startParsingNextCommands = function () {
    let isCommitCmd = false;//是否分析完毕
    while (this.currentStep < this.stepCommands.length && !isCommitCmd) {
        let nextCommands = this.stepCommands[this.currentStep].split(splite);//返回一个数组
        switch (nextCommands[0]) {
            case newRectangleCmd: {
                this.objectManager.newRectangleNode(nextCommands[1], nextCommands[2],
                    nextCommands[3], nextCommands[4], nextCommands[5], nextCommands[6]);
            }
                break;
            case newFillRectangleCmd: {
                this.objectManager.newFillRectangleNode(nextCommands[1], nextCommands[2], nextCommands[3],
                    nextCommands[4], nextCommands[5], nextCommands[6]);
            }
                break;
            case newCircleCmd: {
                this.objectManager.newCircleNode(nextCommands[1], nextCommands[2], nextCommands[3], nextCommands[4], nextCommands[5]);
            }
                break;
            case newPointerCmd: {
                this.objectManager.newPointerNode(nextCommands[1], nextCommands[2], nextCommands[3],
                    nextCommands[4], nextCommands[5], nextCommands[6]);
            }
                break;
            case newLabelCmd: {
                this.objectManager.newLabelNode(nextCommands[1], nextCommands[2], nextCommands[3], nextCommands[4]);
            }
                break;
            case newLineCmd: {
                this.objectManager.newLineNode(nextCommands[1], nextCommands[2], nextCommands[3], nextCommands[4], nextCommands[5]);
            }
                break;
            case moveCmd: {
                let id = parseInt(nextCommands[1]);
                let oldX = this.objectManager.getXCoordinate(id), oldY = this.objectManager.getYCoordinate(id);
                let moveAnimation = new SingleAnimation(id, parseInt(oldX), parseInt(oldY),
                    parseInt(nextCommands[2]), parseInt(nextCommands[3]));
                this.movedCommands.push(moveAnimation);
            }
                break;
            case connectCmd: {
                this.objectManager.connectNode(nextCommands[1], nextCommands[2], nextCommands[3],
                    nextCommands[4], nextCommands[5]);
            }
                break;
            case disconnectCmd: {
                this.objectManager.disconnectNode(nextCommands[1], nextCommands[2]);
            }
                break;
            case deleteCmd: {
                this.objectManager.deleteNode(nextCommands[1]);
            }
                break;
            case deleteAllObjectCmd: {
                this.objectManager.deleteAllObjects();
            }
                break;
            case setNodeValueCmd: {
                this.objectManager.setNodeValue(nextCommands[1], nextCommands[2]);
            }
                break;
            case setNodeColorsCmd: {
                this.objectManager.setNodeColors(nextCommands[1], nextCommands[2], nextCommands[3]);
            }
                break;
            case setEdgeColorsCmd: {
                this.objectManager.setEdgeColors(nextCommands[1], nextCommands[2], nextCommands[3], nextCommands[4]);
            }
                break;
            case setCoordinatesCmd: {
                this.objectManager.setNodeCoordinates(nextCommands[1], nextCommands[2], nextCommands[3]);
            }
                break;
            case setEdgeLineWidthCmd: {
                this.objectManager.setEdgeLineWidth(nextCommands[1], nextCommands[2], nextCommands[3]);
            }
                break;
            case setNodeLineWidthCmd: {
                this.objectManager.setNodeLineWidth(nextCommands[1], nextCommands[2]);
            }
                break;
            case setInnerColorCmd: {
                this.objectManager.setNodeInner(nextCommands[1], nextCommands[2], nextCommands[3]);
            }
                break;
            case commitCmds: {
                isCommitCmd = true;
            }
                break;
            default:
                break;
        }
        this.currentStep++;
    }
    this.currentFrame = 0;//现在的帧
}
/**
 * 更新需要移动的动画信息
 */
AnimatedManager.prototype.update = function () {
    this.currentFrame++;
    for (let i = 0; i < this.movedCommands.length; i++) {
        //进度条式移动
        if (this.currentFrame < this.maxFrame) {
            let v = parseFloat(this.currentFrame / this.maxFrame * 1.0);//速度
            let movingNode = this.movedCommands[i];
            let newX = parseInt(movingNode.beginX + v * (movingNode.endX - movingNode.beginX));
            let newY = parseInt(movingNode.beginY + v * (movingNode.endY - movingNode.beginY));
            this.objectManager.setNodeCoordinates(movingNode.id, newX, newY);
        } else {
            //到达位置
            this.objectManager.setNodeCoordinates(parseInt(this.movedCommands[i].id), parseInt(this.movedCommands[i].endX), parseInt(this.movedCommands[i].endY));
        }
    }
    if (this.currentFrame > this.maxFrame) {
        this.movedCommands = [];
        this.startParsingNextCommands();//继续分析下一步指令
    }
}

/**
 * 动画定时刷新函数
 */
function timeout() {
    timer = setTimeout("timeout()", interval);
    animatedManager.update();//更新指令
    objectManager.paint();//重新画图
}