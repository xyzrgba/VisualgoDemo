//确认删除
$("#confirmDelete").click(function () {
    let pos = $("input[name='deletePos']").val();
    let hint = "";
    if (pos != "") {
        hint = algorithmInstance.deleteNode(pos);
    } else {
        hint += "请输入需要删除的位置!";
    }
    if (hint != "") {
        layer.msg(hint);
    }
    $("input[name='deletePos']").val("");
});
//添加
$("#confirmInsert").click(function () {
    let val = $("input[name='insertVal']").val();
    let pos = $("input[name='insertPos']").val();
    let hint = "";
    if (val != "" && pos != "") {
        hint = algorithmInstance.insertNode(pos, val);
    } else {
        if (val == "") {
            hint += "输入的值为空!";
        }
        if (pos == "") {
            hint += "输入的位置为空!";
        }
    }
    if (hint != "") {
        layer.msg(hint);
    }
    $("input[name='insertVal']").val("");
    $("input[name='insertPos']").val("");
});
//初始化大小
$("#confirmInit").click(function (e) {
    let size = $("input[name='initSize']").val();
    let hint = algorithmInstance.initArray(parseInt(size));
    if (hint) {
        layer.msg(hint);
    }
    $("input[name='initSize']").val("")
});