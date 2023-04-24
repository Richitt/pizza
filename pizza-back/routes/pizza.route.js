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
    console.log("started");
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
    console.log(JSON.stringify(result))
    return JSON.parse(JSON.stringify(result)); //JSON
}

// Create Pizza

router.post("/createPizza", (req, res, next) => {
    console.log("asdfasdfasdf");
    console.log(req);
    console.log(req.body);
    pizzaSchema.create(req.body)
    .then((result) => {
        console.log("aa" + result);
        res.json(result);
    })
    .catch((err) => {
        res.send(err)
    })
  });

// Read pizza
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

// Update pizza
router.route("/updatePizza/:id")
    .get((req, res) => {
        console.log("asdfasdfasdfadada");
    pizzaSchema.findById(
        req.params.id, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        });
    })
    .put((req, res, next) => {
        pizzaSchema.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        (error, data) => {
            if (error) {
                return next(error);
                console.log(error);
                } else {
                    res.json(data);
                    console.log("Pizza updated successfully !");
                }
            }
        );
  });

router.delete("/deletePizza/:id", 
  (req, res, next) => {
    pizzaSchema.findByIdAndRemove(
        req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data,
        });
      }
    });
  });
    
  module.exports = router;