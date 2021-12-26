$("#confirmInsert").click(function () {
    let val = $("input[name='insertValue']").val();
    let hint = "";
    if ("" != val) {
        hint += algorithmInstance.insertValue(val);
    } else {
        hint += "输入的值为空!";
    }
    if ("" != hint) {
        layer.msg(hint);
    }
    $("input[name='insertValue']").val("");
});
$("#confirmDelete").click(function () {
    let val = $("input[name='deleteValue']").val();
    let hint = "";
    if ("" != val) {
        hint += algorithmInstance.deleteValue(val);
    } else {
        hint += "输入的值为空!";
    }
    if ("" != hint) {
        layer.msg(hint);
    }
    $("input[name='deleteValue']").val("");
});
$("#confirmClear").click(function () {
    let hint = algorithmInstance.clearAll();
    if ("" != hint) {
        layer.msg(hint);
    }
});