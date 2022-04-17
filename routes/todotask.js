import express from "express";
const TodoRouter = express.Router();

import { createTodo, updateTodo, getTodoById, viewAllTodos, deleteTodo, completeTodo } from "../controllers/todotask.js";




/**
 * @openapi
 * tags:
 *  name: todos
 */

//schema
/**
 * @openapi
 * components:
 *  schemas:
 *    addingTodo:
 *      type: object
 *      required:
 *        -title
 *        
 *      example:
 *        title: Do web dev assignment
 *       
 *      properties:
 *        title:
 *          type: string
 *          description: Title of a task
 
 * 
 */

// create todo

/**
 * @openapi
 * /api/todo:
 *  post:
 *    
 *    summary: Allow a user to create a todo
 *    tags:
 *      - todos
 *    description: add a task
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/addingTodo"
 *    
 *    responses:
 *      200:
 *        description: added!
 *
 */

TodoRouter.post("/", createTodo);

/**
 * @openapi
 * /api/todo/{id}:
 *  put:
 *   summary: update a task
 *   tags:
 *      - Posts
 *   descrption: updating
 *   parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description:  a valid task id
 *   response:
 *      200:
 *        description:A  task is returned
 *      404:
 *        description:  task doesnot exist
 */

TodoRouter.put("/:id", updateTodo);

TodoRouter.put("/checked/:id", completeTodo);


/**
 * @openapi
 * /api/todo/{id}:
 *  get:
 *    summary: Allow to get a task by using its ID
 *    tags:
 *      - Todos
 *    description: Allow............
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: A valid mongo db id
 *    responses:
 *      200:
 *        description: A task is returned
 *      404:
 *        description: task doesnot exist
 *
 *
 */


TodoRouter.get("/:id", getTodoById)
    /**
     * @openapi
     * /api/todo:
     *  get:
     *    summary: Get a list of all tasks
     *    tags:
     *      - Todos
     *    responses:
     *      200:
     *        description: A list of all todos.
     */
TodoRouter.get("/", viewAllTodos)

/**
 * @openapi
 * /api/todo/{id}:
 *  delete:
 *    summary: delete a task
 *    tags:
 *      - Todos
 *    description: delete task associated with provided id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *    responses:
 *      200:
 *        description: task deleted
 */

TodoRouter.delete("/:id", deleteTodo)

export default TodoRouter;