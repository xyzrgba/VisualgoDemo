$("#confirmInit").click(function (e) {
    let size = $("input[name='initSize']").val();
    let hint = "";
    if ("" != size && parseInt(size) > 3) {
        hint += algorithmInstance.generateMap(size);
    }
    else {
        hint += "请输入4 - 9 !"
    }
    if ("" != hint) {
        layer.msg(hint);
    }
    $("input[name='initSize']").val("");
});

$("#confirmAdd").click(function (e) {
    let sid = $("input[name='startId']").val();
    let eid = $("input[name='endId']").val();
    let hint = "";
    if ("" != sid && "" != eid) {
        if (sid != eid) {
            hint += algorithmInstance.insertEdge(parseInt(sid), parseInt(eid));
        } else {
            hint += "不能在自身添加!";
        }
    } else {
        hint += "输入的值不能为空!"
    }
    if ("" != hint) {
        layer.msg(hint);
    }
    $("input[name='startId']").val("");
    $("input[name='endId']").val("");
});
$("#confirmSub").click(function (e) {
    let sid = $("input[name='startId']").val();
    let eid = $("input[name='endId']").val();
    let hint = "";
    if ("" != sid && "" != eid) {
        if (sid != eid) {
            hint += algorithmInstance.deleteEdge(parseInt(sid), parseInt(eid));
        } else {
            hint += "自身边不存在!";
        }
    } else {
        hint += "输入的值不能为空!"
    }
    if ("" != hint) {
        layer.msg(hint);
    }
    $("input[name='startId']").val("");
    $("input[name='endId']").val("");
});
$("#confirmDFS").click(function (e) {
    let startId = $("input[name='startTraverseID']").val();
    let hint = "";
    if ("" != startId) {
        hint += algorithmInstance.startDFS(startId);
    } else {
        hint += "输入的id无效!"
    }
    if ("" != hint) {
        layer.msg(hint);
    }
    $("input[name='startTraverseID']").val("");
});
$("#confirmBFS").click(function () {
    let startId = $("input[name='startTraverseID']").val();
    let hint = "";
    if ("" != startId) {
        hint += algorithmInstance.startBFS(startId);
    } else {
        hint += "输入的id无效!"
    }
    if ("" != hint) {
        layer.msg(hint);
    }
    $("input[name='startTraverseID']").val("");
});
$("#confirmDijkstra").click(function () {
    let startId = $("input[name='startDID']").val();
    let endId = $("input[name='endDID']").val();
    let hint = "";
    if ("" != startId && "" != endId) {
        hint += algorithmInstance.runDijkatra(startId, endId);
    } else {
        hint += "输入的无效!";
    }
    if ("" != hint) {
        layer.msg(hint);
    }
    $("input[name='startDID']").val("");
    $("input[name='endDID']").val("");
});
$("#confirmPrim").click(function () {
    let hint = algorithmInstance.runPrim();
    if ("" != hint) {
        layer.msg(hint);
    }
});