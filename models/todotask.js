import mongoose from "mongoose";


const TodoSchema = new mongoose.Schema({
    tasktitle: {
        type: String,
        // required: true,
        // unique: true,


    },
    taskStatus: {
        type: Boolean,
        // required: true,

    },

}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

export const Todo = mongoose.model("tododb", TodoSchema);