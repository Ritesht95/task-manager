import prisma from "../config/db.config.js";

const test1Task = await prisma.task.upsert({
    where: {
        id: 1
    },
    create: {
        title: "Task 1",
        description: "Task 1 Description",
        dueDate: new Date(2024, 7, 20),
        userId: 4
    },  
    update: {},
});
const test2Task = await prisma.task.upsert({
    where: {
        id: 2
    },
    create: {
        title: "Task 2",
        description: "Task 2 Description",
        dueDate: new Date(2024, 7, 21),
        userId: 3
    },  
    update: {},
});
const test3Task = await prisma.task.upsert({
    where: {
        id: 3
    },
    create: {
        title: "Task 3",
        description: "Task 3 Description",
        dueDate: new Date(2024, 7, 22),
        userId: 2
    },  
    update: {},
});
const test4Task = await prisma.task.upsert({
    where: {
        id: 4
    },
    create: {
        title: "Task 4",
        description: "Task 4 Description",
        dueDate: new Date(2024, 7, 23),
        userId: 1
    },  
    update: {},
});
console.log({ test1Task, test2Task, test3Task, test4Task });
