// mongoose for the db, express/router for the default needed to setup the backend routes
let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();
    fs = require('fs');
    //grab my helper functions
    helper = require('./helper/helper');

// imported schemas.
let pizzaSchema = require("../models/Pizza");

// grab our default provided csv
let defaultFile = {};
fs.readFile('./routes/defaultFile/data.csv', (err,inputD)=>{
    if(err){
        throw err;
    }
    defaultFile = csvJSON(inputD);
})
//parse into usable string
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

//Get highest consumption day of a given month
router.get('/pizzaMonth', async (req, res) => {
    pizzaSchema.find({date: new Date(req.query.month)})
    .then((result) => {
        console.log(result);
        result = helper.findMostPizza(JSON.stringify(result));
        res.json(result);
    })
    .catch((err) => {
        res.send(err)
    })
});

// Create Pizza
router.post("/createPizza", (req, res, next) => {
    pizzaSchema.create(req.body)
    .then((result) => {
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
                result = helper.findStreak(JSON.stringify(result));
                res.json(result);
            })
            .catch((err) => {
                res.send(err)
            })
            
        }
        else{
            result = helper.findStreak(JSON.stringify(result));
            res.send(result);
        }
    })
    .catch((err) => {
        res.send(err)
    })
});

//Alternate streak endpoint where you provide a month you want to filter over
router.get('/pizzaMonthStreak', async (req, res) => {
    pizzaSchema.find({date: new Date(req.query.month)})
    .then((result) => {
        if(Object.keys(result).length === 0){
            pizzaSchema.create(defaultFile)
            .then((result) => {
                result = helper.findStreak(JSON.stringify(result));
                res.json(result);
            })
            .catch((err) => {
                res.send(err)
            })
            
        }
        else{
            
            console.log("aa");
            console.log(result);
            result = helper.findStreak(JSON.stringify(result));
            res.send(result);
        }
    })
    .catch((err) => {
        res.send(err)
    })
});

// Get pizza info of a single person
router.get('/pizzaPerson', async (req, res) => {
    pizzaSchema.find({person: req.query.name})
    .then((result) => {
        res.send(result);
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