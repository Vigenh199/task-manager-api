const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const { userOne, userOneId, userOneToken, setupDatabase, userTwoId, userTwoToken, taskOne } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOneToken}`)
        .send({
            description: 'From my test'
        })                    
        .expect(201);
    
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.owner).toEqual(userOneId);
})

test('Should get all tasks for user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOneToken}`)
        .expect(200);

    expect(response.body.length).toEqual(2);
})

test('Should not delete other user task', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwoToken}`)
        .send()
        .expect(404);

    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
})