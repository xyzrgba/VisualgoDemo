canvas.width = $("#canvas").parent().width();
canvas.height = $("#canvas").parent().height();
layui.use('layer', function () {
    var layer = layui.layer;
});
layui.use('element', function () {
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    //监听导航点击
    element.on('nav(demo)', function (elem) {
        //console.log(elem)
        layer.msg(elem.text());
    });
});
//绑定点击事件，显示和隐藏
let preBtns = $(".preBtn");
let leftDivs = $(".left");
if (preBtns.length === leftDivs.length) {
    for (let i = 0; i < preBtns.length; i++) {
        $(preBtns[i]).bind("click", function () {
            for (let j = 0; j < leftDivs.length; j++) {
                if (i === j) {
                    $(leftDivs[j]).toggle();
                } else {
                    $(leftDivs[j]).hide();
                }
            }
        });
    }
}
//数字输入框输入中文和空格
let inputs = $("input[type='number']");
if (inputs.length > 0) {
    for (let i = 0; i < inputs.length; i++) {
        $(inputs[i]).keypress(function (e) {
            return (/[\d\.]/.test(String.fromCharCode(event.keyCode)));
        });
    }
}
//屏蔽汉字和空格
$("input").keyup(function () {
    let exp = /[\u4E00-\u9FA5\uF900-\uFA2D\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]*|[\s*]/g;
    this.value = this.value.replace(exp, '');

});