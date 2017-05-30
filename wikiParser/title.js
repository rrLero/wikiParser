/**
 * Created by rrlero on 26.05.17.
 */
module.exports.title = function(string) {
    var regexpTitle = /<title>(.*?)- Wikipedia/g;
    var title = string.match(regexpTitle);
    return delStr('<title>', '- Wikipedia', title );


    function delStr(strOne, strTwo, array) {
        var i = 0;
        var new_array = [];
        while (array[i]) {

            new_array[i] = array[i++].replace(strOne, '').replace(strTwo, '');
        }
        return new_array[0]
    }
};

