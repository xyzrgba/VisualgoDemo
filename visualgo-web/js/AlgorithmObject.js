/**
 * 算法对象类
 * @constructor
 */
function AlgorithmObject() {
}

/**
 *
 * @param animatedManager
 * @param canvasWidth
 * @param canvasHeight
 */
AlgorithmObject.prototype.init = function (animatedManager, canvasWidth, canvasHeight) {
    this.id = 0;
    this.animatedManager = animatedManager;
    this.canvasWidth = parseInt(canvasWidth);
    this.canvasHeight = parseInt(canvasHeight);
    this.commands = [];//命令方式绘制，然后解析命令
}
/**
 * 初始化属性
 */
AlgorithmObject.prototype.initAttributes = function () {

}
/**
 * 完成某个动作的绘制,动作是函数名称
 * @param funcName
 * @param value
 */
AlgorithmObject.prototype.executeCommand = function (functionName, argumentsValue) {
    let cmds = functionName(argumentsValue);//首先得到命令然后绘制
    this.animatedManager.startSeriesAnimations(cmds);
}
/**
 * 添加并组装指令
 */
AlgorithmObject.prototype.addCommand = function () {
    let cmd = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        cmd += splite + arguments[i];
    }
    this.commands.push(cmd);//这是一步动画
}
