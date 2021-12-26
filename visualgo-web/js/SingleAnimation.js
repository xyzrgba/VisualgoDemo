/**
 * 那个节点的动画，从哪里到哪里
 * @param id
 * @param beginX
 * @param beginY
 * @param endX
 * @param endY
 * @constructor
 */
function SingleAnimation(id, beginX, beginY, endX, endY) {
    this.id = id;
    this.beginX = beginX;
    this.beginY = beginY;
    this.endX = endX;
    this.endY = endY;

    this.toString = function () {
        return this.id + " " + this.beginX + " " + this.beginY + " " + this.endX + " " + this.endY;
    }
}