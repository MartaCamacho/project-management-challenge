const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Project = require("../models/project");
const Task = require("../models/task");

// GET route => to get all the projects
router.get('/projects', (req, res, next) => {
Project.find().populate('tasks')
        .then((allTheProjects) => {
            res.json(allTheProjects)
        })
        .catch(err => {
            res.jason(err);
        });
    });

// POST route => to create a new project
router.post("/projects",  (req, res, next) => {
    // utilizamos el método create de mongoose y pasamos los parámetros del body para crear nuestro nuevo 'project' y guardarlo en BDD.
    const { title, description } = req.body;
    Project.create({
        title,
        description,
        tasks: []
    })
    .then (response => {res.json(response)})
  
    .catch (error => {res.json(error)})
      });

// GET route => to get a specific project/detailed view
router.get('/projects/:id', (req, res, next)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }
      Project.findById(req.params.id).populate('tasks')
      .then((theProject) => {
          res.json(theProject)
      })
      .catch(err => {
          res.jason(err);
      });  
  })

// PUT route => to update a specific project
router.put('/projects/:id', (req, res, next)=>{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    Project.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
        res.json({message: `Project with ${req.params.id} is updated successfully.`})
    })
    .catch(err => {
        res.jason(err);
    })
  })

// DELETE route => to delete a specific project
router.delete('/projects/:id', (req, res, next)=>{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Project.findByIdAndRemove(req.params.id).populate('tasks')
    .then((theProject) => {
        res.json({message: `Project with ${req.params.id} is removed successfully.`})
    })
    .catch(err => {
        res.jason(err);
    })
  })

module.exports = router;
