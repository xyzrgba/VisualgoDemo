//确认删除
$("#confirmDelete").click(function () {
    let hint = algorithmInstance.popNode();
    if (hint != "") {
        layer.msg(hint);
    }
});
//确认入队
$("#confirmInsert").click(function () {
    let val = $("input[name='insertVal']").val();
    let hint = "";
    if (val != "") {
        hint += algorithmInstance.pushNode(val);
    } else {
        hint += "请输入入队的值!";
    }
    if (hint != "") {
        layer.msg(hint);
    }
    $("input[name='insertVal']").val("")
});
//初始化大小
$("#confirmInit").click(function (e) {
    let size = $("input[name='initSize']").val();
    let hint = "";
    if (size != "" && parseInt(size) > 0) {
        hint += algorithmInstance.initQueue(parseInt(size));
    } else {
        hint += "请输入正确的大小!";
    }
    if (hint != "") {
        layer.msg(hint);
    }
    $("input[name='initSize']").val("");
});