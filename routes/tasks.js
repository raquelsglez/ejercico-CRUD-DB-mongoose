const Task = require("../models/task.js"); 

const tasksRoutes = (app) => {
    app.post("/create", async(req, res) => {
        try {
            const task = await Task.create(req.body);
            res.status(201).send(task);

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem trying to create a task" });
        };
    });

    app.get("/", async(req, res) => {
        try {
            const tasks = await Task.find();
            res.status(200).send(tasks);

        } catch (error) {
            console.error(error);
            res.status(500).send({message: "There was a problem trying to get the tasks"});
        };
    });

    app.get("/id/:_id", async(req, res) => {
        try {
            const task = await Task.findById(req.params._id);

            if(!task){
                return res.status(404).send({message: "Task not found"});
            };

            res.status(200).send(task);

        } catch (error) {
            console.log(error);
            res.status(500).send({message: "There was a problem trying to get the task"});
        };
    });

    app.put("/markAsCompleted/:_id", async(req, res) => {
        try {
            const task = await Task.findById(req.params._id);

            if(!task){
                return res.status(404).send({message: "Task not found"});
            };

            task.completed = true;
            const updatedTask = await task.save();
            res.status(200).send(updatedTask);

        } catch (error) {
            console.log(error);
            res.status(500).send({message: "There was a problem trying to update the task"});
        };
    });

    app.put("/id/:_id", async(req, res) => {
        try {
            const {title} = req.body;

            const task = await Task.findById(req.params._id);
            if(!task){
                return res.status(404).send({message: "Task not found"});
            };

            task.title = title;
            const updatedTask = await task.save();
            res.status(200).send(updatedTask);

        } catch (error) {
            console.log(error);
            res.status(500).send({message: "There was a problem trying to update the task"});
        };
    });

    app.delete("/id/:_id", async(req, res) => {
        try {
            const task = await Task.findByIdAndDelete(req.params._id);

            if(!task){
                return res.status(404).send({message: "Task not found"});
            };

            res.status(200).send({message: "Deleted task"});

        } catch (error) {
            console.log(error);
            res.status(500).send({message: "There was a problem trying to delete the task"});
        };
    });
};

module.exports = { tasksRoutes };