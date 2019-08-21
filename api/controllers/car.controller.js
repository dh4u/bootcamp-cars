/* In this file, you will create all the code needed to perform CRUD operations using Mongoose. */
const Car = require('../models/car.model.js');
const mongoose = require('mongoose');

// set up some variables / functions that I will use later
const d = new Date;
const currentYear = d.getFullYear();
//https://github.com/kelektiv/node-uuid
function uuidv4() {
    const uuidv1 = require('uuid/v1');
    return uuidv1();
}

exports.create = function(req, res) {
    // Create and Save a new car
    let carModel = new Car({
        make: 'Land Rover',
        model: 'Range Rover',
        year: currentYear,
        VIN: uuidv4()
    });
    carModel.save(function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while creating the inventory record." });
        } else {
            console.log(data);
            res.send('The car has been added to the inventory');
        }
    });
};

exports.findAll = function(req, res) {
    Car.find(function(err, cars) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while retrieving cars." });
        } else {
            res.send(cars);
        }
    });
}

exports.updateByVIN = function(req, res) {
    let query = { VIN: 'A123' };
    Car.findOneAndUpdate(query, { VIN: 'Hyperion', updateDate: Date.now }, { new: true }, function(err, doc) {
        if (err) {
            console.log("Something wrong when updating data!");
            res.send("ERROR: Not Updated. " + err);
        }
        res.send("Updated");
    });
}

exports.deleteCarsByVIN = function(req, res) {
    Car.findOneAndRemove({ VIN: 'A123' }, function(err) {
        if (err) {
            console.log("ERROR: Cars NOT removed. " + err);
            res.send("ERROR: Cars NOT removed. " + err);
        }
        res.send("Cars removed");
    });
}