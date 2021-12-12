const express = require("express");

const partyRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

partyRoutes.route("/party").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
        .collection("parties")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

partyRoutes.route("/reservations").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
        .collection("reservations")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

partyRoutes.route("/walkins").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
        .collection("walkins")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

partyRoutes.route("/party/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("parties")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

partyRoutes.route("/party").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        phone: req.body.phone,
        size: req.body.size,
        total: req.body.total,
    };
    console.log("Entering document:")
    console.log(myobj)
    db_connect.collection("parties").insertOne(myobj, function (err, res) {
        if (err) throw err;

        if (req.body.type === "Reservation") {
            let resobj = {
                party_id: myobj._id,
                time: req.body.time
            }
            console.log("Entering reservation:")
            console.log(resobj)
            db_connect.collection("reservations").insertOne(resobj, function (err, res) {
                if (err) throw err;
                response.json(res);
            })
        } else {
            let wiobj = {
                party_id: myobj._id
            }
            db_connect.collection("walkins").insertOne(wiobj, function (err, res) {
                if (err) throw err;
                response.json(res);
            })
        }
    })
});

partyRoutes.route("/party/update").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            name: req.body.name,
            phone: req.body.phone,
            size: req.body.size,
            total: req.body.total
        },
    };
    db_connect
        .collection("parties")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

partyRoutes.route("/party/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("parties").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");

        let secondquery = { party_id: myquery._id };
        db_connect.collection("reservations").deleteOne(secondquery)
        db_connect.collection("walkins").deleteOne(secondquery)
        response.status(obj);
    });
});

module.exports = partyRoutes;