/**
 * 在矩形当中，x,y是中心位置
 * @param id 图形在Node[]中位置
 * @param value 图形的值
 * @param cx 图形重心的x坐标
 * @param cy 图形重心的y坐标
 * @param width 图形的宽度
 * @param height 图形的高度
 * @constructor
 */
function AnimatedRectangle(id, value, cx, cy, width, height) {
    this.id = parseInt(id);
    this.value = value;
    this.textW = 12;
    this.textH = 5;
    this.x = parseInt(cx);
    this.y = parseInt(cy);
    this.width = parseInt(width);
    this.height = parseInt(height);
    this.updateEdgeCoordinates();
}

//继承
AnimatedRectangle.prototype = new AnimatedObject();
AnimatedRectangle.prototype.constructor = AnimatedRectangle;
/**
 * 初始化四条边对应的x,y
 */
AnimatedRectangle.prototype.updateEdgeCoordinates = function () {
    this.lx = parseInt(this.x - this.width / 2.0);
    this.rx = parseInt(this.x + this.width / 2.0);
    this.ty = parseInt(this.y - this.height / 2.0);
    this.by = parseInt(this.y + this.height / 2.0);
}

/**
 * 绘制 ctx 是 canvas.getContext("2d")
 * 通过左上角的来画
 * @param ctx
 */
AnimatedRectangle.prototype.paint = function (ctx) {
    this.updateEdgeCoordinates();
    //计算文本的宽度
    this.textW = ctx.measureText(this.value).width;
    //开始绘制
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.bgColor;
    ctx.moveTo(this.lx, this.ty);
    ctx.strokeRect(this.lx, this.ty, this.width, this.height);
    if (this.isInner) {
        ctx.fillStyle = this.innerColor;
        ctx.fillRect(parseInt(this.lx + 2), parseInt(this.ty + 2), parseInt(this.width - 4), parseInt(this.height - 4));
    }
    this.setTextStyle(ctx);
    ctx.fillStyle = this.fgColor;
    ctx.fillText(this.value, this.x, this.y);
}
/**
 *
 * @param targetX
 * @param targetY
 * @returns {number[]}
 */
AnimatedRectangle.prototype.getBreakPointCoordinates = function (targetX, targetY) {
    this.updateEdgeCoordinates();
    let x = 0, y = 0;
    //从边上出发
    if (targetX > parseInt(this.rx + this.width / 2.0)) {
        x = this.rx;
    } else if (targetX < parseInt(this.lx - this.width / 2.0)) {
        x = this.lx;
    } else {
        x = this.x;
    }
    if (targetY > parseInt(this.by + this.height / 2.0)) {
        y = this.by;
    } else if (targetY < parseInt(this.ty - this.height / 2.0)) {
        y = this.ty;
    } else {
        y = this.y;
    }
    return [x, y];
}