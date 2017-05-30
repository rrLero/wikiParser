var request = require('request'), fs = require('fs'), title = require("./title"),
    description = require("./description"), body = require("./body"),
    urlWiki = require("./url"), db = require("./db");
var URL = 'https://en.wikipedia.org/wiki/Special:Random';
var js = {};
var MongoClient = require('mongodb').MongoClient , assert = require('assert');



module.exports.wiki = function() {
        request(URL, function (err, res, string) {
            if (err) throw err;
            MongoClient.connect(db.url, function(err, db) {
                assert.equal(null, err);
                db.collection('js').insert({'title': title.title(string), 'description': description.description(string),
                                            'urlWiki': urlWiki.url_wiki(string), 'body': body.body(string)});
                db.close();
            });
        });
};
