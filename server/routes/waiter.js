const express = require("express");

const waiterRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// Data sanitization against NoSQL query injection
const mongoSanitize = require('express-mongo-sanitize');
const app = express();

app.use(express.json());
app.use(mongoSanitize()); 

//gets all waiters
waiterRoutes.route("/waiters").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
        .collection("waiters")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

waiterRoutes.route("/waiters/tables").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = [
        { "$addFields": { "stringid": { "$toString": "$_id" }}},
        {$lookup: {from: "tables", localField: "stringid", foreignField: "waiter_id", as: "table"}},
        {$unwind: "$table"},
        {$group: {_id: "$_id", count: {$sum: 1}}}
    ]

    db_connect.collection("waiters").aggregate(myquery).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    })
})

waiterRoutes.route("/waiters/expectedtips").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = [
    { "$addFields": { "stringid": { "$toString": "$_id" }}},
    {$lookup: {from: "orders", localField: "stringid", foreignField: "table_id", as: "eachorder"}}, 
    {$unwind: "$eachorder"}, 
    {$unwind: "$eachorder.items"},
    { "$addFields": { "itemObject": { "$toObjectId": "$eachorder.items" }}},
    {$lookup: {from: "menu", localField: "itemObject", foreignField: "_id", as: "eachitem"}}, 
    {$unwind: "$eachitem"}, 
    { "$addFields": { "waiterObject": { "$toObjectId": "$waiter_id" }}},
    {$lookup: {from: "waiters", localField: "waiterObject", foreignField: "_id", as: "waiter"}},
    {$unwind: "$waiter"}, 
    {$group: {_id: "$waiter._id", total: {$sum: "$eachitem.price"}}},
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
});

//create new waiter
waiterRoutes.route("/waiters").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        tips: req.body.tips,
    };
    console.log("succesffuly added waiter");
    db_connect.collection("waiters").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

//delete waiter
waiterRoutes.route("/waiters/:id").delete((req, res) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id)};
    db_connect.collection("waiters").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("waiter fired");
        res.status(obj);
    console.log("successfully deleted waiter")
    });
});

//update waiter's info (tips)
waiterRoutes.route("/waiters/:id").put(function(req, resp) {
    let db_connect = dbo.getDb();
    let waiterID = { _id: ObjectId(req.params.id)};
    let newvalues = {
        $set: {
            name: req.body.name,
            tips: req.body.tips,
        },
    };
    db_connect.collection("waiters").updateOne(waiterID, newvalues, function(err, res) {
        if (err) throw err;
        console.log("waiter information updated");
        resp.json(res);
    });
});

module.exports = waiterRoutes;