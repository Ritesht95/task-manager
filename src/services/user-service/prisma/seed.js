import prisma from "../config/db.config.js";
import bcrypt, { genSaltSync } from "bcrypt";

const salt = genSaltSync(10);
const test1User = await prisma.user.upsert({
    where: {
        email: "test1@test.com",
    },
    create: {
        name: "Test 1",
        email: "test1@test.com",
        password: bcrypt.hashSync("test1234", salt)
    },
    update: {},
});
const test2User = await prisma.user.upsert({
    where: {
        email: "test2@test.com",
    },
    create: {
        name: "Test 2",
        email: "test2@test.com",
        password: bcrypt.hashSync("test1234", salt)
    },
    update: {},
});
const test3User = await prisma.user.upsert({
    where: {
        email: "test3@test.com",
    },
    create: {
        name: "Test 3",
        email: "test3@test.com",
        password: bcrypt.hashSync("test1234", salt)
    },
    update: {},
});
const test4User = await prisma.user.upsert({
    where: {
        email: "test4@test.com",
    },
    create: {
        name: "Test 4",
        email: "test4@test.com",
        password: bcrypt.hashSync("test1234", salt)
    },
    update: {},
});
console.log({ test1User, test2User, test3User, test4User });
