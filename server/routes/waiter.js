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