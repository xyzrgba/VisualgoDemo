/**
 * 用于绘制startNode到endNode的边,
 * curves用于绘制曲线的参数，用canvas中的二次贝塞尔曲线
 * @param startNode 出发点
 * @param endNode 结束点
 * @param curves 弯曲度 [0,1]0表示直线
 * @param isDirected 方向
 * @param weigth 权重
 * @constructor
 */
function AnimatedEdge(startNode, endNode, curves, isDirected, weight) {
    this.startNode = startNode;
    this.endNode = endNode;
    this.curves = parseFloat(curves);
    this.isDirected = isDirected;
    this.weight = weight;
    //端点
    this.startCoordinates = null;
    this.endCoordinates = null;
    //控制点
    this.cx = 0;
    this.cy = 0;
    //长度
    this.arrowLength = 10;
    //角度
    this.angle = Math.PI / 5.0;
    this.scaleWeight = 1 / 5.0;
}

AnimatedEdge.prototype = new AnimatedObject();
AnimatedEdge.prototype.constructor = AnimatedEdge;
/**
 * 绘制边,
 * @param ctx
 */
AnimatedEdge.prototype.paint = function (ctx) {
    ctx.beginPath();
    ctx.globalAlpha = 1;
    //画线
    this.startCoordinates = this.startNode.getBreakPointCoordinates(this.endNode.x, this.endNode.y);
    this.endCoordinates = this.endNode.getBreakPointCoordinates(this.startNode.x, this.startNode.y);
    //距离
    let dx = this.endCoordinates[0] - this.startCoordinates[0], dy = this.endCoordinates[1] - this.startCoordinates[1];
    //中点和弯曲度作为控制点的参数
    let mx = (this.startCoordinates[0] + this.endCoordinates[0]) / 2.0,
        my = (this.startCoordinates[1] + this.endCoordinates[1]) / 2.0;
    this.cx = mx - dx * this.curves, this.cy = my + dy * this.curves;
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.bgColor;
    ctx.moveTo(this.startCoordinates[0], this.startCoordinates[1]);
    ctx.quadraticCurveTo(this.cx, this.cy, this.endCoordinates[0], this.endCoordinates[1]);
    ctx.stroke();
    if (this.isDirected.toLowerCase() === "true") {
        this.paintArrow(ctx);
    }
    if ("" != this.weight) {
        let L = Math.sqrt(dx * dx + dy * dy);
        let sin = dx / L, cos = dy / L;
        let tx = this.startCoordinates[0] + L * this.scaleWeight * sin,
            ty = this.startCoordinates[1] + L * this.scaleWeight * cos;
        this.setTextStyle(ctx);
        ctx.font = "10pt Arial";
        ctx.fillText(this.weight, tx, ty);
    }
}
/**
 * 如果有箭头就画箭头,
 * 如果是静态的就四个方向，如果动态的话，控制点
 * 顶部 sin(x+y) = sin(x)cos(y) + cos(x)sin(y)
 *      cos(x+y) = cos(x)cos(y) - sin(x)sin(y)
 *      tx = endPos[0] + arrowLength * cos(x+y)
 *      ty = endPos[1] + arrowLength * sin(x+y)
 * 底部 sin(x-y) = sin(x)cos(y) - cos(x)sin(y)
 *      cos(x-y) = cos(x)cos(y) + sin(x)sin(y)
 *      bx = endPos[0] + arrowLength * cos(x-y)
 *      by = endPos[1] - arrowLength * sin(x-y)
 * @param ctx
 */
AnimatedEdge.prototype.paintArrow = function (ctx) {
    ctx.beginPath();
    let dx = this.cx - this.endCoordinates[0], dy = this.cy - this.endCoordinates[1];
    let controlLength = Math.sqrt(dx * dx + dy * dy);
    let siny = dy / controlLength * 1.0, cosy = dx / controlLength * 1.0;
    let sinx = Math.sin(this.angle), cosx = Math.cos(this.angle);
    let tx = this.endCoordinates[0] + this.arrowLength * (cosx * cosy - sinx * siny),
        ty = this.endCoordinates[1] + this.arrowLength * (sinx * cosy + cosx * siny);
    let bx = this.endCoordinates[0] + this.arrowLength * (cosx * cosy + sinx * siny),
        by = this.endCoordinates[1] - this.arrowLength * (sinx * cosy - cosx * siny);
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.bgColor;
    ctx.moveTo(tx, ty);
    ctx.lineTo(this.endCoordinates[0], this.endCoordinates[1]);
    ctx.lineTo(bx, by);
    ctx.stroke();
    ctx.closePath();
}