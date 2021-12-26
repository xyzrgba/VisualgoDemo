$("#confirmInit").click(function (e) {
    let data = $("input[name='expression']").val();
    let hint = "";
    if ("" != data) {
        console.log(data);
        hint += algorithmInstance.createTree(data);
    } else {
        hint += "没有输入表达式";
    }
    if ("" != hint) {
        layer.msg(hint);
    }
    $("input[name='expression']").val("");
});
$("#confirmAppend").click(function (e) {
    let data = $("input[name='expression']").val();
    let hint = "";
    if ("" != data) {
        console.log(data);
        hint += algorithmInstance.addExpression(data);
    } else {
        hint += "没有输入表达式";
    }
    if ("" != hint) {
        layer.msg(hint);
    }
    $("input[name='expression']").val("");
});
//确保没有中文和空格
$("input[name='expression']").keyup(function () {
    let zh = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
    let sp = /\s*/g;
    this.value = this.value.replace(zh, '');
    this.value = this.value.replace(sp, '');
});
$("#confirmPreorder").click(function () {
    let hint = algorithmInstance.preorderTree();
    if (hint != "") {
        layer.msg(hint);
    }
});
$("#confirmInorder").click(function () {
    let hint = algorithmInstance.inorderTree();
    if (hint != "") {
        layer.msg(hint);
    }
});
$("#confirmPostorder").click(function () {
    let hint = algorithmInstance.postorderTree();
    if (hint != "") {
        layer.msg(hint);
    }
});

$("#confirmLevel").click(function () {
    let hint = algorithmInstance.levelTree();
    if (hint != "") {
        layer.msg(hint);
    }
});
