/**
 * 所有动画对象的基类
 * @constructor
 */
function AnimatedObject() {
    this.init();
}

/**
 * 默认初始化
 */
AnimatedObject.prototype.init = function () {
    this.id = -1;//默认不存在
    this.value = "";//对象的值,
    this.x = 0;
    this.y = 0;
    this.alpha = 1;//默认不透明
    this.fgColor = "#000";//前景颜色
    this.bgColor = "#000";//背景颜色007db8
    this.isInner = false;//是否填充内部
    this.innerColor = "#000";//填充的颜色
    this.lineWidth = 1;//线宽
}
/**
 * 设置前景和背景色
 * @param fgColor
 * @param bgColor
 */
AnimatedObject.prototype.setColors = function (fgColor, bgColor) {
    if (fgColor != "") {
        this.fgColor = fgColor;
    }
    if (bgColor != "") {
        this.bgColor = bgColor;
    }
}
/**
 * 设置新的重心位置
 * @param x
 * @param y
 */
AnimatedObject.prototype.setCoordinates = function (x, y) {
    this.x = x;
    this.y = y;
}
/**
 * 获取文本位置
 * @returns {Array}
 */
AnimatedObject.prototype.getTextCoordinates = function () {

}

/**
 * 子类实现，绘制
 * @param ctx
 */
AnimatedObject.prototype.paint = function (ctx) {

}
/**
 * 通过参考另一个节点，确定边在自身的端点坐标
 * @param targetX
 * @param targetY
 * @returns {number[]}
 */
AnimatedObject.prototype.getBreakPointCoordinates = function (targetX, targetY) {

}
/**
 * 设置ctx中的文本
 * @param ctx
 */
AnimatedObject.prototype.setTextStyle = function (ctx) {
    ctx.font = "12pt Arial";
    ctx.textBaseline = "middle";//设置基准线
    ctx.globalAlpha = 1.0;//设置透明度
    ctx.fillStyle = this.fgColor;
    ctx.textAlign = CENTER;
}
/**
 *
 * @param lineWidth
 */
AnimatedObject.prototype.setLineWidth = function (lineWidth) {
    this.lineWidth = parseInt(lineWidth);
}
