const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId();
const userOneToken = jwt.sign({ _id: userOneId }, process.env.JWT_SECRET);
const userOne = {
    _id: userOneId,
    name: 'Anna',
    email: 'anna@example.com',
    password: 'anna1234!',
    tokens: [{
        token: userOneToken
    }]
}

const userTwoId = new mongoose.Types.ObjectId();
const userTwoToken = jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET);
const userTwo = {
    _id: userTwoId,
    name: 'John',
    email: 'john@example.com',
    password: 'john1234!',
    tokens: [{
        token: userTwoToken
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "First task",
    completed: false,
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "Second task",
    completed: true,
    owner: userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "Third task",
    completed: true,
    owner: userTwoId
}

const setupDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
}

module.exports = {
    userOne,
    userOneId,
    userOneToken,
    userTwo,
    userTwoId,
    userTwoToken,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}