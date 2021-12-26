/**
 * 都是在canvas上操作的指令
 * new是创建一个对象，
 * move是移动对象
 * coonect是连接两个节点的指令
 * undo 是取消命令
 */
const newRectangleCmd = "newRectangle";//创建一个矩形图形
const newCircleCmd = "newCircle";//创建一个圆形图形
const newLabelCmd = "newLabel";//创建一个文本图形
const newPointerCmd = "newPointer";//创建一个指示器
const newFillRectangleCmd = "newFillRectangle";//创建一个填充的矩形
const newLineCmd = "newLine";
const deleteCmd = "delete";//删除一个节点
const moveCmd = "move";//移动图形
const connectCmd = "connection";//连接两个图形  startId, endId, curves, direction, weigth, edgeColor
const disconnectCmd = "disconection";//取消两个图形  startId, endId
const commitCmds = "commit";//完成一步动画
const setNodeColorsCmd = "setNodeColors";//设置前景和背景色
const setEdgeColorsCmd = "setEdgeColors";//设置边的前景和背景色
const setCoordinatesCmd = "setCoordinates";//更新位置
const setInnerColorCmd = "setInnerColor";//设置内部的颜色
const setNodeValueCmd = "setNodeValue";//设置节点的值
const deleteAllObjectCmd = "clearAllObject";
const setEdgeLineWidthCmd = "setEdgeLineWidth";
const setNodeLineWidthCmd = "setNodeLineWidth";
/**
 * 箭头长度
 */
const TOP = "top";
const BOTTOM = "bottom";
const LEFT = "left";
const RIGHT = "right";
const CENTER = "center";
const APPEAR_COLOR = "#5cb3cc";
const DISAPPEAR_COLOR = "#ee3f4d";
const WHITE_COLOR = "#ffffff";
const BLACK_COLOR = "#000000";
const FENGXINZI_COLOR = "#c8adc4";
const DALISHI_COLOR = "#c4cbcf";
const HAOHUANG_COLOR = "#dfc243";
const MEIHONG_COLOR = "#c45a65";
const YUNSHUILAN_COLOR = "#baccd9";
const HUAQING_COLOR = "#2376b7";

const MAX_VALUE = 10000;
/**
 * 命令组装符
 * @type {string}
 */
const splite = "|";
/**
 * 动画的控制变量
 */
var timer;//动画计时器
var interval = 12;//刷新的间隔
var animatedManager;
var objectManager;
var algorithmInstance;
