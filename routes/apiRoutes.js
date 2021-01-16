// const router = require("express").Router();
const db = require("../models");
// const { Workout } = require("../models/index.js");


module.exports = function(app) {

  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
  });

  app.put("/api/workouts/:id",(req, res) => {
    db.Workout.findOneAndUpdate(
    { _id: req.params.id },
    {
        $inc: { totalDuration: req.body.duration },
        $push: { exercises: req.body }
    },
    { new: true }).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
  });

  app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
  });

  app.get("/api/workouts/range", (req, res) => {

    db.Workout.find({}).then(dbWorkout => {
        console.log("ALL WORKOUTS");
        console.log(dbWorkout);

        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    }); 
  });


};

// module.exports = router;