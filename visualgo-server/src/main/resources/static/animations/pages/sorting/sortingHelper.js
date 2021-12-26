$("input[name='initArray']").keypress(function () {
    let exp = /[0-9,.]/;
    return exp.test(String.fromCharCode(event.keyCode));
});

$("#confirmInit").click(function () {
    let string = $("input[name='initArray']").val();
    let hint = "";
    if ("" != string) {
        algorithmInstance.createArray(string);
    } else {
        hint += "请输入1到50之间的数，例如:1,2,5,7,10,4,23,12";
    }
    if ("" != hint) {
        layer.msg(hint);
    }
    $("input[name='initArray']").val("")
});
$("#confirmRun").click(function () {
    let hint = algorithmInstance.runSorting();
    if ("" != hint) {
        layer.msg(hint);
    }
});