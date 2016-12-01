'use strict';

var Users = require('../models/users.js');

function ClickHandler () {

    this.getClicks = function (req, res) {
        Users
            .findOne({ 'github.id': req.user.github.id }, { '_id': false })
            .exec(function (err, result) {
                if (err) { throw err; }

                res.json(result.nbrClicks);
            });
    };

    this.addClick = function (req, res) {
        Users
            .findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
            .exec(function (err, result) {
                    if (err) { throw err; }

                    res.json(result.nbrClicks);
                }
            );
    };

    this.resetClicks = function (req, res) {
        Users
            .findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
            .exec(function (err, result) {
                    if (err) { throw err; }

                    res.json(result.nbrClicks);
                }
            );
    };

}


/*function clickHandler () {

this.getClicks = function (req, res) {
    Users
        .findOne({}, { '_id': false })
        .exec(function (err, result) {
                if (err) { throw err; }

                if (result) {
                    res.json(result);
                } else {
                    var newDoc = new Clicks({ 'clicks': 0 });
                    newDoc.save(function (err, doc) {
                        if (err) { throw err; }

                        res.json(doc);
                    });

                }
            });
};


this.addClick = function (req, res) {
    Clicks
        .findOneAndUpdate({}, { $inc: { 'clicks': 1 } })
        .exec(function (err, result) {
                if (err) { throw err; }

                res.json(result);
            }
        );
};


this.resetClicks = function (req, res) {
    Clicks
        .findOneAndUpdate({}, { 'clicks': 0 })
        .exec(function (err, result) {
                if (err) { throw err; }

                res.json(result);
            }
        );
};

} // close clickHandler*/

module.exports = ClickHandler; //export clickHandler

