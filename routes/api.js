const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts", (req, res) => {
  Workout.find({})
  .sort({ date: -1 })
  .then(dbWorkout => {
    res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});
router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  router.put("/api/workouts/:id", (req, res) => {
    Workout.updateOne({ _id: req.params.id }, { 
      $push: {
        exercises: req.body 
      } 
    },
      // runValidators ensures new exercises will meet schema requirements
      { 
        new: true,
        runValidators: true 
      }
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  router.get("/api/workouts/range", (req, res) => {
    Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

module.exports = router;