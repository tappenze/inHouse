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

tableRoutes.route("/tabletotals/").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = [
    { "$addFields": { "stringid": { "$toString": "$_id" }}},
    {$lookup: {from: "orders", localField: "stringid", foreignField: "table_id", as: "eachorder"}}, 
    {$unwind: "$eachorder"}, 
    {$unwind: "$eachorder.items"},
    { "$addFields": { "itemObject": { "$toObjectId": "$eachorder.items" }}},
    {$lookup: {from: "menu", localField: "itemObject", foreignField: "_id", as: "eachitem"}}, 
    {$unwind: "$eachitem"}, 
    {$group: {_id: "$_id", total: {$sum: "$eachitem.price"}}},
    ];
    console.log("here we go")
    db_connect.collection("tables").aggregate(myquery).toArray(function(err, docs) {
        if (err) {
            console.log("an error")
            assert.equal(null);
        }
        else {
            console.log(docs);
            res.json(docs);
        } 
    });
    // console.log(results)
    // res.json(results)
    // db_connect
    //     .collection("tables")
    //     .findOne(myquery, function (err, result) {
    //         if (err) throw err;
    //         res.json(result);
    //     });
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
    console.log("called table delete")
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("tables").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.status(obj);
    });
});

module.exports = tableRoutes;