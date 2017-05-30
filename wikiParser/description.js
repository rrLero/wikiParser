module.exports.description = function(string) {
    string.match(/<p>(.*?)<\/p>/);
    return RegExp.$1.replace(/<(.*?)>/g, '').replace(/\[1\]/, '');
};