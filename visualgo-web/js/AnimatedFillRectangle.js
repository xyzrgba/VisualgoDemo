/**
 *
 * @param id
 * @param value
 * @param cx
 * @param cy
 * @param width
 * @param height
 * @constructor
 */
function AnimatedFillRectangle(id, value, cx, cy, width, height) {
    this.id = parseInt(id);
    this.value = value;
    this.x = parseInt(cx);
    this.y = parseInt(cy);
    this.width = parseInt(width);
    this.height = parseInt(height);
}

AnimatedFillRectangle.prototype = new AnimatedObject();
AnimatedFillRectangle.prototype.constructor = AnimatedFillRectangle;
/**
 * 绘制
 * @param ctx
 */
AnimatedFillRectangle.prototype.paint = function (ctx) {
    ctx.beginPath();
    this.textW = ctx.measureText(this.value);
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(parseInt(this.x - this.width / 2.0), parseInt(this.y - this.height / 2.0), this.width, this.height);
    this.setTextStyle(ctx);
    ctx.fillText(this.value, this.x, this.y);
}