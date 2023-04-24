let mongoose = require("mongoose"),
    express = require("express"),
    csv = require('fast-csv'),
    router = express.Router();
    fs = require('fs');


let pizzaSchema = require("../models/Pizza");
let defaultFile = {};
fs.readFile('./routes/defaultFile/data.csv', (err,inputD)=>{
    if(err){
        throw err;
    }
    defaultFile = csvJSON(inputD);
})

function findStreak(list){
    // given an array of days + eaten food
    // keep going until the amount of pizzas on a day is less
    // easiest way: first make all dates (days), then sort the days
    // then put them into a map, and simply call each day and once its lower stop
    // return the resulting array of days
    for(i = 0; i<JSON.parse(list).length; i++){
        console.log(JSON.parse(list)[i][person]);
    }
}

function csvJSON(csv){
    csv = csv+'';
    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split(",");
    for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return JSON.parse(JSON.stringify(result)); //JSON
}

const getAllPizzas = async (req, res) => {
    pizzaSchema.find()
    .then((result) => {
        if(Object.keys(result).length === 0){
            pizzaSchema.create(defaultFile)
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.send(err)
            })
            
        }
        else{
            console.log("ey?");
            findStreak(result);
            return result;
        }
    })
    .then((result) =>{
        res.send(result);
    })
    .catch((err) => {
        res.send(err)
    })
}

module.exports = {
    getAllPizzas,
}