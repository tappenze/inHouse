const express = require("express");

const orderRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

//gets all menu items
orderRoutes.route("/menu").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
        .collection("menu")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// gets all orders
orderRoutes.route("/order").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
        .collection("orders")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

//gets a tables orders thusfar (need to delete after people pay)
orderRoutes.route("/order/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { table_id: ObjectId(req.params.id) };
    db_connect
        .collection("orders")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

//places an order of items for a given table
orderRoutes.route("/order").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        table_id: req.body.table_id,
        items: req.body.items,
    };
    db_connect.collection("orders").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

//updates an order?
// tableRoutes.route("/order/update").post(function (req, response) {
//     let db_connect = dbo.getDb();
//     let myquery = { _id: ObjectId(req.params.id) };
//     let newvalues = {
//         $set: {
//             party_id: req.body.party_id,
//             waiter_id: req.body.waiter_id,
//             size: req.body.size,
//             status: req.body.status
//         },
//     };
//     db_connect
//         .collection("tables")
//         .updateOne(myquery, newvalues, function (err, res) {
//             if (err) throw err;
//             console.log("1 document updated");
//             response.json(res);
//         });
// });

//deletes an order
orderRoutes.route("/order/:id").delete((req, response) => {
    console.log("called order delete")
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("orders").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.status(obj);
    });
});

module.exports = orderRoutes;