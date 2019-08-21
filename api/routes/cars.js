const express = require('express')
const carRoutes = express.Router()
//const mongoose = require('mongoose');

// require the cars model in our routes
let Car = require('../models/car.model')

// select all of the cars
carRoutes.route('/api').get(
    (req, res) => {
        Car.find({},
            (err, cars) => {
                if(err){
                    console.log(err)
                }
                else
                {
                    res.json(cars)
                    //res.send(JSON.stringify(cars))
                }
            }
        )
        //console.log("/api in cars.js!!")
    }
)

// select one car
carRoutes.route('/api/car/:id').get(
    (req, res) => {
        console.log('getting from /api/show/:id')
        let id = req.params.id
        //res.send(`id: ${id}`)

        // if the id is not 0 then it is a car in the database
        if(id !== "0" ){
            // find the car
            Car.findById(id, (err, car) => {
                if(err){
                    console.log(err)
                }
                else
                {
                    console.log(car)
                    res.json(car)
                }
            })
        }
        // if the id is 0 then set up an empty structure to return to the form
        else
        {
            var d = new Date
            let car = {"year": d.getFullYear(),"VIN":"","color":"","_id":"0","make":"","model":""}
            res.json(car)
        }
        // DEBUG: res.send("/api/show/:id in cars.js!!")
    }
)

// select all of the cars by finding with no criteria
carRoutes.route('/api/cars').get(
    (req, res) => {
        Car.find({},
            (err, cars) => {
                if(err){
                    console.log(err)
                }
                else
                {
                    res.json(cars)
                }
            }
        )
    }
)

// delete a car
carRoutes.route('/api/delete/:id').delete(
    (req, res) => {
        Car.findByIdAndRemove({_id: req.params.id}, 
            (err, car) => {
                if(err) res.json(err)
                else res.json("Successfully removed")
            }
        )
    }
)

// saving a new car
carRoutes.route('/api/insert/').post(
    (req, res) => {
        let car = new Car({
            make: req.query.make
            ,model: req.query.model
            ,year: req.query.year
            ,VIN: req.query.VIN
            ,color: req.query.color
            ,timestamps: Date(Date.now)
        })

        car.save().then(car => {
            res.json("Insert complete")
        }).catch(err => {
            res.status(400).send(`Unable to insert the record to the database\n${err}`)
        })
    }
)

// select all of the cars older than a particular year
carRoutes.route('/api/older/:year').get(
    (req, res) => {
        Car.find({year: {$lte: req.params.year}},
            (err, cars) => {
                if(err){
                    //console.log(err)
                }
                else
                {
                    res.json(cars)
                    //res.send(JSON.stringify(cars))
                }
            }
        )
        //res.send("/api in cars.js!!")
    }
)

// update a car
carRoutes.route('/api/update/:id').put(
    (req, res) => {
        //res.send(req.params.id)
        console.log('getting from /api/update/:id')
        Car.findById(req.params.id, (err, car) => {
            if(err){
                console.log(err)
            }
            else if(!car)
            {
                res.status(404).send("data could not be found")
            }
            else 
            {
                // update the object
                let updateList = [
                    car.make = req.query.make
                    ,car.model = req.query.model
                    ,car.year = req.query.year
                    ,car.VIN = req.query.VIN
                    ,car.color = req.query.color
                ]
                //DEBUG: console.log("req.query");
                //DEBUG: console.log(req.query);
                //DEBUG: console.log("updateList");
                //DEBUG: console.log(updateList);
                //DEBUG: console.log("car")
                //DEBUG: console.log(car)
                //res.send(car)

                car.save().then(car => {
                    res.json("Update complete")
                }).catch(err => {
                    console.log("Something wrong when updating data!");
                    res.status(400).send(`Unable to update the record\n${err}`)
                })
            }
        })
    }
)

// select all of the distinct model years in the database
carRoutes.route('/api/years').get(
    (req, res) => {
        Car.distinct("year",
            (err, years) => {
                if(err){
                    console.log(err)
                }
                else
                {
                    //console.log(years)
                    //console.log(typeof(years))
                    //console.log(years.length)
                    res.send(years)
                }
            }
        )
    }
)
module.exports = carRoutes