/**
 * Created by rrlero on 27.05.17.
 */
module.exports.body = function(string) {
    var newString = string.substring(string.indexOf('<h2>'), string.search(/NewPP limit report/)), bodyString;
    var fs = require('fs');
    var regexpBody = /h2>/gim;
    var h2IndexesArray = [];



    while (match = regexpBody.exec(newString)) {
        h2IndexesArray.push(match.index)
    }


    var json = {};
    for (i=0; i<= h2IndexesArray.length-1; i+=2) {
        var newStringTitle = newString.substring(h2IndexesArray[i]+3, h2IndexesArray[i+1]-2)
            .replace(/<(.*?)>/gim, '').replace(/\^ /g, '').replace(/\s\s+/g, '').replace(/\[edit\]/, '');


        if ( h2IndexesArray[i+2] ) {
            bodyString = newString.substring(h2IndexesArray[i+1]+3, h2IndexesArray[i+2]-2)
                .replace(/<(.*?)>/gim, '').replace(/\^ /g, '').replace(/\s\s+/g, '');
            bodyString = bodyString.replace(!bodyString.search(/\n/) && /\n/, '');
            json[newStringTitle] = bodyString;

        }
        else {
            bodyString = newString.substring(h2IndexesArray[i+1]+3, newString.length)
                .replace(/<(.*?)>/gim, '').replace(/\^ /g, '').replace(/\s\s+/g, '');
            bodyString = bodyString.replace(!bodyString.search(/\n/) && /\n/, '');
            json[newStringTitle] = bodyString;
        }
    }
    return json;
};