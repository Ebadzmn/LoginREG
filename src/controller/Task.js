let TaskModel = require("../model/TaskModel");
const mongoose = require("mongoose");
let ObjectId = mongoose.Types.ObjectId;

exports.createTask = async (req, res) => {
    try {
        let UserID = req.headers._id;
        const { title, description,status } = req.body;
        const task = await TaskModel.create({
            UserID,
            title,
            description,
            status
        });
        res.json(task);
    } catch (error) {
        console.log(error);
    }
}

exports.GetTaskByUser = async (req, res) => {
    try {
        let UserID = req.headers._id;
        const task = await TaskModel.find({ UserID });
        res.json(task);
    } catch (error) {
        console.log(error);
    }
}

// exports.listTaskByStatus = async (req, res) => {
//     try {
//         let UserID = req.headers._id;
//         const task = await TaskModel.find({ UserID, status: req.params.status });
//         res.json(task);
//     } catch (error) {
//         console.log(error);
//     }
// }

exports.ListTaskByStatus = async (req, res) => {
    try{
        let UserID = new ObjectId(req.headers._id);
        let status = req.params.status;


        let matchStage = {
            $match: {
                UserID: UserID,
            }
        }
        let matchStage2 = {
            $match: {
                status: status,
            }
        }
        let joinStage = {
            $lookup: {
                from: "users",
                localField: "UserID",
                foreignField: "_id",
                as: "user"
            }
        }
        let unwindStage = {
            $unwind: "$user"
        }


        let projectStage = {
            $project: {
                _id: 1,
                title: 1,
                description: 1,
                status: 1,
                "user.name": 1,
                "user.email": 1,
            }
        }
        let data = await TaskModel.aggregate([matchStage,matchStage2, joinStage, unwindStage,projectStage]);
        res.json(data);
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}

exports.TaskBycount = async (req, res) => {
    try{
        let UserID = new ObjectId(req.headers._id);

        let matchStage = {
            $match: {
                UserID: UserID,
            }
        }

        let JoinStage = {
            $lookup: {
                from: "users",
                localField: "UserID",
                foreignField: "_id",
                as: "user"
            }
        }
        let unwindStage = {
            $unwind: "$user"
        }
        let groupStage = {
            $group: {
                _id: "$status",
                count: { $sum: 1 },
            }
        }
        let projectStage = {
            $project: {
                _id: 0,
                status: "$_id",
                count: 1,
            }
        }
        let data = await TaskModel.aggregate([matchStage, JoinStage, unwindStage, groupStage, projectStage]);
        res.json(data);
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}

exports.UpdateTask = async (req, res) => {
    try{
        let UserID = req.headers._id;
        const { status } = req.body;
        const task = await TaskModel.findOneAndUpdate({_id: req.params.id, UserID}, {
            status
        });
        res.json(task);
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}