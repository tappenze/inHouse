const express = require("express");

const menuRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

//gets all menu items
menuRoutes.route("/menu").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
        .collection("menu")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

//gets one menu item
menuRoutes.route("/menu:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("menu")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

//create new menu item
menuRoutes.route("/menu").post(function (req, res) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        price: req.body.price
    };
    db_connect.collection("menu").insertOne(myobj, function(err, result) {
        if (err) throw err;
        res.json(result);
    })
});

//edit a menu item
menuRoutes.route("/menu").update(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            name: req.body.name,
            price: req.body.price
        }
    };
    db_connect.collection("menu").updateOne(myquery, newvalues, function(err, result) {
        if (err) throw err;
        res.json(result);
    })
});

//delete a menu item
menuRoutes.route("/menu:id").delete((req, res) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("menu").deleteOne(myquery, function(err, result) {
        if (err) throw err;
        res.status(result);
    })
});

module.exports = menuRoutes;