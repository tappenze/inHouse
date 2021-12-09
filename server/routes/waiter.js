const express = require("express");

const waiterRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

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

//create new waiter
waiterRoutes.route("/waiter").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        tables: req.body.tables,
        tips: 0.0,
    };
    db_connect.collection("waiters").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

//delete waiter
waiterRoutes.route("/waiter/:id").delete((req, res) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id)};
    db_connect.collection("waiters").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("waiter fired");
        response.status(obj);
    });
});

//update waiter's info (tips + arrays)
waiterRoutes.route("/waiter").post(function(req, resp) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id)};
    let newvalues = {
        $set: {
            name: req.body.size,
            tables: req.body.tables,
            tips: 0.0,
        },
    };
    db_connect.collection("waiters").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("waiter information updated");
        response.json(res);
    });
});