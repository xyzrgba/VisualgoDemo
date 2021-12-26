//使用相对路径
function initFrame(pagePath) {
    try {
        $("#stage-body").contents().find("body").html("");
        $("#stage-body").attr("src", pagePath);
    } catch (e) {}
}
