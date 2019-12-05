/*
 * @Author: kangpeng 
 * @Date: 2019-11-21 15:58:07 
 * @Last Modified by: kangpeng
 * @Last Modified time: 2019-11-21 15:58:44
 */
function date(timestamp, pattern) {
    pattern = pattern || "yyyy-MM-dd";
    var tmp = new Date(timestamp);
    var o = {
        "M+": tmp.getMonth() + 1, //月份
        "d+": tmp.getDate(), //日
        "h+": tmp.getHours(), //小时
        "m+": tmp.getMinutes(), //分
        "s+": tmp.getSeconds(), //秒
        "q+": Math.floor((tmp.getMonth() + 3) / 3), //季度
        "S": tmp.getMilliseconds() //毫秒
    }

    if (/(y+)/.test(pattern)) {
        pattern = pattern.replace(RegExp.$1, (tmp.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(pattern)) {
            pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return pattern;
}