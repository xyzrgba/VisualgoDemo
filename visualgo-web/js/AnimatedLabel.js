/**
 * 动画的文本绘制
 * @param id
 * @param value
 * @constructor
 */
function AnimatedLabel(id, value, x, y) {
    this.id = parseInt(id);//父类
    this.value = value;
    this.x = parseInt(x);
    this.y = parseInt(y);
}

AnimatedLabel.prototype = new AnimatedObject();
AnimatedLabel.prototype.constructor = AnimatedLabel;
/**
 * 绘制类型
 * @param ctx
 */
AnimatedLabel.prototype.paint = function (ctx) {
    ctx.beginPath();
    this.setTextStyle(ctx);
    ctx.lineWidth =this.lineWidth;
    ctx.fillText(this.value, this.x, this.y);
}