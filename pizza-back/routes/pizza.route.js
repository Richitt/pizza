let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();


let pizzaSchema = require("../models/Pizza");


// Create Pizza

router.post("/createPizza", (req, res, next) => {
    console.log("asdfasdfasdf");
    console.log(req);
    console.log(req.body);
    pizzaSchema.create(req.body)
    .then((result) => {
        console.log("aa" + result);
    })
    .catch((err) => {
        console.log("whoa");
        res.send(err)
    })
  });

// Read pizza
router.get("/", (req, res) => {
    console.log("asdfasdfasdfaa");
    return{};
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