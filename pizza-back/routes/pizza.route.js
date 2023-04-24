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
function findStreak(list){
    // given an array of days + eaten food
    // keep going until the amount of pizzas on a day is less
    // easiest way: first make all dates (days), then sort the days
    // then put them into a map, and simply call each day and once its lower stop
    // return the resulting array of days
    
    var temp = JSON.parse(list);
    for(i = 0; i<temp.length; i++){
        var days = Math.floor(new Date(temp[i]["date"]).getTime() / (1000*60*60*24));
        temp[i]["days"] = days;

    }
    temp = temp.sort((a, b) => {
        return a["days"] - b["days"];
    })

    var largestStreak=0;
    var streak = 0;
    var pastpizzas = 0;
    var pizzas = 0;
    var currDay = temp[0]["date"];
    var dayList = [];
    var finalArray = [];
    for (i = 0; i<temp.length; i++){
        if(temp[i]["date"] == currDay){
            pizzas++;
        }
        else{
            if(pizzas>pastpizzas){
                streak++;
                //last day was part of the streak
                dayList.push({pizzaStreak: streak, day: currDay});
                if(streak>largestStreak){
                    //if streak is larger, update the largest date array
                    finalArray = dayList;
                }
                largestStreak = Math.max(largestStreak, streak);
            }
            else{
                streak = 1;
                //empty day array;
                dayList = [];
                //start finding a new one
                dayList.push({pizzaStreak: streak, day: currDay});
            }
            pastpizzas = pizzas;
            pizzas=1;
            currDay=temp[i]["date"];
        }
    }
    return finalArray;
}

// Create Pizza

router.post("/createPizza", (req, res, next) => {
    pizzaSchema.create(req.body)
    .then((result) => {
        console.log("aa" + result);
        res.json(result);
    })
    .catch((err) => {
        res.send(err)
    })
  });

// Get Pizza Streak endpoint
router.get('/pizzaStreak', async (req, res) => {
    pizzaSchema.find()
    .then((result) => {
        if(Object.keys(result).length === 0){
            pizzaSchema.create(defaultFile)
            .then((result) => {
                result = findStreak(JSON.stringify(result));
                res.json(result);
            })
            .catch((err) => {
                res.send(err)
            })
            
        }
        else{
            result = findStreak(JSON.stringify(result));
            res.send(result);
        }
    })
    .catch((err) => {
        res.send(err)
    })
});

//Get all Pizzas
router.get("/", async (req, res) => {
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
            res.send(result);
        }
    })
    .catch((err) => {
        res.send(err)
    })
  });


  // could use put, but this is more malleable as an update route
  // since i want to have a body
  // this updates meats in a person's order
  router.post("/updatePizza/:id", async (req, res, next) => {
    pizzaSchema.updateMany({person: req.params.id}, {"meat-type": req.body.meatType}) 
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        res.send(err)
    })
  });

  //delete all pizzas from a given person
  router.delete("/deletePizza/:id", async (req, res, next) => {
    pizzaSchema.deleteMany({person: req.params.id})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        res.send(err)
    })
  });

  module.exports = router;