const express = require("express");

const tableRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

tableRoutes.route("/table").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
        .collection("tables")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

tableRoutes.route("/table/occupied").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
        .collection("tables")
        .find({ status: "Occupied"})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

tableRoutes.route("/table/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("tables")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

tableRoutes.route("/table").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        party_id: req.body.party_id,
        waiter_id: req.body.waiter_id,
        size: req.body.size,
        status: req.body.status
    };
    console.log("Entering document:")
    console.log(myobj)
    db_connect.collection("tables").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

tableRoutes.route("/table/update").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            name: req.body.name,
            party_id: req.body.party_id,
            waiter_id: req.body.waiter_id,
            size: req.body.size,
            status: req.body.status
        },
    };
    db_connect
        .collection("tables")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

tableRoutes.route("/table/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("tables").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.status(obj);
    });
});

module.exports = tableRoutes;