import pkg from "http-errors";
import mongoose from "mongoose";
const Mongoose = mongoose;
const { BadRequest, Conflict, NotFound, Unauthorized } = pkg;

import { Todo } from "../models/todotask.js";





//update

export const updateTodo = async(req, res) => {
    const id = req.params.id;
    const todo = await Todo.findById(id);

    if (!todo) {
        return res.status(400).json({
            success: false,
            data: {
                message: "Task Not Found",
            },
        });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
        new: true,
    });

    return res.status(200).json({
        success: true,
        data: {
            message: "Todo task has been updated successfully ",
        },
    });
};

// creating  a new task
export const createTodo = async(req, res) => {
    const tasktitle = req.body.tasktitle;

    const existingTodo = await Todo.findOne({ tasktitle: tasktitle });

    if (existingTodo) {
        return res.status(409).json({
            success: false,
            data: {
                message: "Task Title exists already",
            },
        });
    }

    // create task using req.body
    try {
        const Obj = {...req.body, taskStatus: "true" };
        const task = await Todo.create(Obj);
        console.log(req.body)
        res.status(201).json({
            success: true,
            data: { message: "Your task has been created Successfully" },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            data: {
                message: error.message,
            },
        });
    }
};


//completing a task in order to mark it as done
export const completeTodo = async(req, res) => {
    const id = req.params.id;
    const todo = await Todo.findById(id);

    if (!todo) {
        return res.status(400).json({
            success: false,
            data: {
                message: "Task not found",
            },
        });
    }


    const updatedTodo = await Todo.findByIdAndUpdate(id, { taskStatus: !todo.taskStatus }, { new: true });

    return res.status(200).json({
        success: true,
        data: {
            message: "You have completed your task",
        },
    });
};

//READING THE TASKS LIST

//get one by id: To get Just 1 specific task 

export const getTodoById = async(req, res) => {
    if (!req.params.id || !Mongoose.isValidObjectId(req.params.id)) {
        // throw new BadRequest("Missing task id");
        return res.status(400).json({
            success: false,
            data: {
                message: "Missing: Task Id",
            },
        });
    }

    const id = req.params.id;
    const todo = await Todo.findById(id);

    if (!todo) {
        return res.status(400).json({
            success: false,
            data: {
                message: "No such task with this Id Exists",
            },
        });
    } else {
        return res.status(200).json({
            message: true,
            data: todo
        })
    }

};


//get all: To get all the tasks being created 

export const viewAllTodos = async(req, res) => {
    const todo = await Todo.find();
    return res.status(200).json({
        success: true,
        data: {
            data: todo,
        },
    });
};


// Deleting a Todo list
export const deleteTodo = async(req, res) => {
    const id = req.params.id;
    const todo = await Todo.findById(id);

    if (!todo) {
        return res.status(400).json({
            success: false,
            data: {
                message: "No task found",
            },
        });
    }

    await Todo.findByIdAndDelete(id);
    return res.status(200).json({
        success: true,
        data: {
            message: "This task has been deleted successfully",
        },
    });
};