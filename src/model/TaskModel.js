let mongoose = require("mongoose");
let { ObjectId } = mongoose.Schema;

let TaskSchema = new mongoose.Schema({

    UserID: {
        type: ObjectId,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Completed", "Deleted", "In Progress"],
        required: true,
    }
}, { timestamps: true, versionKey: false }
)

let TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;