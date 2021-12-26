$("#confirmInit").click(function () {
    algorithmInstance.createTree();
});
$("#confirmClearAll").click(function () {
    let hint = algorithmInstance.clearAll();
    if (hint != "") {
        layer.msg(hint);
    }
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