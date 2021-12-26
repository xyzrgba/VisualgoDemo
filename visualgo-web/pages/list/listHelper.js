//确认删除
$("#confirmDelete").click(function () {
    let pos = $("input[name='deletePos']").val();
    let hint = "";
    if (pos != "") {
        hint += algorithmInstance.deleteNode(pos);
    } else {
        hint += "未输入数值";
    }
    if (hint != "") {
        layer.msg(hint);
    }
    $("input[name='deletePos']").val("")
});
//确认插入
$("#confirmInsert").click(function () {
    let pos = $("input[name='insertPos']").val();
    let val = $("input[name='insertVal']").val();
    let hint = "";
    if (pos != "" && val != "") {
        hint += algorithmInstance.insertNode(pos, val);
    } else {
        if (val == "") {
            hint += "请输入值!";
        }
        if (pos == "") {
            hint += "请插入的正确位置！"
        }
    }
    if (hint != "") {
        layer.msg(hint);
    }
    $("input[name='insertPos']").val("");
    $("input[name='insertVal']").val("");
});