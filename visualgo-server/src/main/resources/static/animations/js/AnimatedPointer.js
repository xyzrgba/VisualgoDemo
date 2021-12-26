/**
 * 指示器的动画类
 * direction是枚举类型上下左右的字符
 * @param id
 * @param value
 * @param length
 * @param direction
 * @constructor
 */
function AnimatedPointer(id, value, x, y, length, direction) {
    this.id = parseInt(id);
    this.value = value;
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.length = parseInt(length);//箭头的长度
    this.direction = direction;
    //箭头的宽高
    this.arrowLength = 10;
    this.angle = Math.PI / 6;
    this.width = this.arrowLength * Math.sin(this.angle);
    this.height = this.arrowLength * Math.cos(this.angle);
    this.interval = 4;//文字与标签的间隔
    //文本的长宽
    this.textW = 0;
    this.textH = 10;
}

AnimatedPointer.prototype = new AnimatedObject();
AnimatedPointer.prototype.constructor = AnimatedPointer;

/**
 *
 * @param ctx
 */
AnimatedPointer.prototype.paint = function (ctx) {
    this.paintArrow(ctx);
    this.paintText(ctx);
}
/**
 * 画文本
 * @param ctx
 */
AnimatedPointer.prototype.paintText = function (ctx) {
    this.textW = ctx.measureText(this.value).width;
    let textCoordinates = this.getTextCoordinates();
    ctx.lineWidth = this.lineWidth;
    this.setTextStyle(ctx);
    ctx.fillText(this.value, parseInt(textCoordinates[0]), parseInt(textCoordinates[1]));
}
/**
 * 绘制指示器
 * @param ctx
 */
AnimatedPointer.prototype.paintArrow = function (ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.bgColor;
    //比较小写的字符
    switch (this.direction) {
        //如果是指向顶部
        case TOP: {
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, parseInt(this.y + this.length));
            ctx.moveTo(parseInt(this.x - this.width), parseInt(this.y + this.height));
            ctx.lineTo(this.x, this.y);
            ctx.lineTo(parseInt(this.x + this.width), parseInt(this.y + this.height));
        }
            break;
        case BOTTOM: {
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, parseInt(this.y - this.length));
            ctx.moveTo(parseInt(this.x - this.width), parseInt(this.y - this.height));
            ctx.lineTo(this.x, this.y);
            ctx.lineTo(parseInt(this.x + this.width), parseInt(this.y - this.height));
        }
            break;
        case LEFT: {
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(parseInt(this.x + this.length), this.y);
            ctx.moveTo(parseInt(this.x + this.height), parseInt(this.y - this.width));
            ctx.lineTo(this.x, this.y);
            ctx.lineTo(parseInt(this.x + this.height), parseInt(this.y + this.width));
        }
            break;
        case RIGHT: {
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(parseInt(this.x - length), this.y);
            ctx.moveTo(parseInt(this.x - this.height), parseInt(this.y - this.width));
            ctx.lineTo(this.x, this.y);
            ctx.lineTo(parseInt(this.x - this.height), parseInt(this.y + this.width));
        }
            break;
        default:
            break;
    }
    ctx.stroke();
    ctx.closePath();
}
/**
 * 获取绘制文本的坐标
 * @returns {number[]}
 */
AnimatedPointer.prototype.getTextCoordinates = function () {
    let tx = 0, ty = 0;
    switch (this.direction) {
        case TOP: {
            tx = this.x;
            ty = parseInt(this.y + this.length + this.interval + this.textH / 2.0);
        }
            break;
        case BOTTOM: {
            tx = this.x;
            ty = parseInt(this.y - this.length - this.interval - this.textH / 2.0);
        }
            break;
        case RIGHT: {
            tx = parseInt(this.x - this.length - this.interval - this.textW / 2.0);
            ty = this.y;
        }
            break;
        case LEFT: {
            tx = parseInt(this.x + this.length + this.interval + this.textW / 2.0);
            ty = this.y;
        }
            break;
        default:
            break;
    }
    return [tx, ty];
}