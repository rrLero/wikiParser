/**
 * Created by rrlero on 29.05.17.
 */
module.exports.url_wiki = function (string) {
    string.match(/<link rel="canonical" href="(.*)"\/>/);
    return RegExp.$1;
};