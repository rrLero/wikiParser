/**
 * Created by rrlero on 29.05.17.
 */
// НЕОБХОДИМЫЕ ПАКЕТЫ И ПЕРЕМЕННЫЕ
// ==================================================
var express = require('express');
var app     = express();

// КОНФИГУРАЦИЯ ПРИЛОЖЕНИЯ
// ==================================================
// сообщаем Node где лежат ресурсы сайта
app.use(express.static(__dirname + '/public'));

// устанавливаем движок EJS для представления
app.set('view engine', 'ejs');

// УСТАНОВКА МАРШРУТОВ
// ===================================================

app.get('/', function(req, res) {

    res.render('pages/index')

});
app.route('/get').get( function (req, res) {
    var wiki = require("./wikiParser/app");
    for (var i=0; i<5; i++){
        wiki.wiki();
    }
    res.redirect('/');

});
app.route('/db/:articleId').get( function (req, res) {
    var dab = require("./wikiParser/db");
    var MongoClient = require('mongodb').MongoClient , assert = require('assert');

    MongoClient.connect(dab.url, function(err, db) {
        assert.equal(null, err);
        db.collection('js').find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            for (var i=0; i < docs.length; i++) {
                if (docs[i].title.trim() === req.params.articleId.trim()) {
                    res.render('pages/results', {result: docs[i]});
                }
            }
        });
        db.close();
    });
});

app.route('/list').get( function (req, res) {
    var dab = require("./wikiParser/db");
    var MongoClient = require('mongodb').MongoClient , assert = require('assert');

    MongoClient.connect(dab.url, function(err, db) {
        assert.equal(null, err);
        db.collection('js').find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            res.render('pages/lisr', {result: docs});
        });

        db.close();
    });


});


// ЗАПУСК СЕРВЕРА
// ==================================================
app.listen(5000);
console.log('Приложение запущено! Смотрите на http://localhost:5000');