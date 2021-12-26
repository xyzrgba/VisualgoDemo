//确认删除
$("#confirmDelete").click(function () {
    let pos = $("input[name='deletePos']").val();
    let hint = algorithmInstance.popNode();
    if (hint != "") {
        layer.msg(hint);
    }
    $("input[name='deletePos']").val("");
});
//确认压入
$("#confirmInsert").click(function () {
    let val = $("input[name='insertVal']").val();
    let hint = "";
    if (val != "") {
        hint += algorithmInstance.pushNode(val);
    } else {
        hint += "请输入待压入的数据";
    }
    if (hint != "") {
        layer.msg(hint);
    }
    $("input[name='insertVal']").val("");
});
//初始化大小
$("#confirmInit").click(function (e) {
    let size = $("input[name='initSize']").val();
    let hint = "";
    hint += algorithmInstance.initStack(parseInt(size));
    if (hint != "") {
        layer.msg(hint);
    }
    $("input[name='initSize']").val("");
});