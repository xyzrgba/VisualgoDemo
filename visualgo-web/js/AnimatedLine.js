/**
 * @param id
 * @param startX
 * @param startY
 * @param enX
 * @param endY
 * @constructor
 */
function AnimatedLine(id, startX, startY, enX, endY) {
    this.id = parseInt(id);
    this.startX = parseInt(startX);
    this.startY = parseInt(startY);
    this.endX = parseInt(enX);
    this.endY = parseInt(endY);
}

AnimatedLine.prototype = new AnimatedObject();
AnimatedLine.prototype.constructor = AnimatedLine;
/**
 * 绘制方法
 * @param ctx
 */
AnimatedLine.prototype.paint = function (ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.bgColor;
    ctx.lineWidth = this.lineWidth;
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
}