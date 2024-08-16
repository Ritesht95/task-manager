import prisma from "../config/db.config.js";

class TaskController {
    static async create(req, res) {
        try {
            const userId = parseInt(req.user.id);
            const newTask = await prisma.task.create({
                data: {
                    ...req.body.task, userId
                }
            });

            res.json({ message: "Task created successfully!", task: newTask });
        } catch(err) {
            res.status(500).json({ message: "Something went wrong! Please try again." });
        }
    }


    static async update(req, res) {
        try {
            const userId = parseInt(req.user.id);
            const taskId = req.params.taskId;
            const updatedTask = await prisma.task.update({
                where: {
                    id: taskId
                },
                data: {
                    ...req.body.task, userId
                }
            });

            res.json({ message: "Task updated successfully!", task: updatedTask });
        } catch(err) {
            res.status(500).json({ message: "Something went wrong! Please try again." });
        }
    }

    static async delete(req, res) {
        try {
            const taskId = req.params.taskId;
            const deletedTask = await prisma.task.delete({
                where: {
                    id: taskId
                },
            });

            res.json({ message: "Task deleted successfully!", task: deletedTask });
        } catch(err) {
            res.status(500).json({ message: "Something went wrong! Please try again." });
        }
    }

    static async getAll(req, res) {
        try {
            console.log(req.user);
            const userId = parseInt(req.user.id);
            const tasks = await prisma.task.findMany({
                where: {
                    userId
                }
            });
            if (tasks && tasks.length) {
                res.json({ message: "Tasks fetched successfully!", tasks });
            } else {
                res.status(404).json({ message: "Tasks not found!" })
            }
        } catch(err) {
            res.status(500).json({ message: "Something went wrong! Please try again.", err });
        }
    }

    static async getById(req, res) {
        try {
            const userId = parseInt(req.user.id);
            console.log(req.params);
            const taskId = parseInt(req.params.taskId);
            const task = await prisma.task.findFirst({
                where: {
                    id: taskId,
                    userId
                }
            });
            if (task) {
                res.json({ message: "Tasks fetched successfully!", task })
            } else {
                res.status(404).json({ message: "Task not found!" })
            }
        } catch(err) {
            res.status(500).json({ message: "Something went wrong! Please try again." });
        }
    }
}

export default TaskController;