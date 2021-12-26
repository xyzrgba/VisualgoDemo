/**
 * context.arc(x,y,r,sAngle,eAngle,counterclockwise);
 * @param id
 * @param value
 * @param x
 * @param y
 * @param radius 半径
 * @constructor
 */
function AnimatedCircle(id, value, x, y, radius) {
    this.id = parseInt(id);
    this.value = value;
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.radius = parseInt(radius);//半径
}

AnimatedCircle.prototype = new AnimatedObject();
AnimatedCircle.prototype.constructor = AnimatedCircle;
/**
 * 绘制
 * @param ctx
 */
AnimatedCircle.prototype.paint = function (ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.bgColor;
    ctx.lineWidth = this.lineWidth;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    if (this.isInner) {
        ctx.beginPath();
        ctx.fillStyle = this.innerColor;
        ctx.arc(this.x, this.y, parseInt(this.radius - 2), 0, 2 * Math.PI);
        ctx.fill();
    }
    this.setTextStyle(ctx);
    ctx.fillText(this.value, this.x, this.y);
}
/**
 *
 * @param targetX
 * @param targetY
 * @returns {number[]}
 */
AnimatedCircle.prototype.getBreakPointCoordinates = function (targetX, targetY) {
    let dx = targetX - this.x, dy = targetY - this.y;
    let centerDistance = Math.sqrt(dx * dx + dy * dy);//圆心距
    let sin = dy / centerDistance, cos = dx / centerDistance;
    let x = this.x + this.radius * cos, y = this.y + this.radius * sin;
    return [x, y];
}