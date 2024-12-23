import { request } from './global/jest.setup';

const testUser = {
    name: 'John Doe',
    email: 'js@gmail.com',
    password: '123'
}

describe('Users API Endpoints', () => {
    test('POST /api/users - Add New User', async () => {
        const response = await request.post('/api/users').send(testUser);
        expect(response.status).toBe(201);
        expect(response.body.data.name).toBe(testUser.name);
        testUser._id = response.body.data._id;
    });

    test('GET /api/users - Get All Users', async () => {
        const response = await request.get('/api/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('GET /api/users/:id - Get A User', async () => {
        const response = await request.get(`/api/users/${testUser._id}`);
        expect(response.status).toBe(200);
        expect(response.body.data._id).toBe(testUser._id);
    });

    test('PUT /api/users/:id - Update A User', async () => {
        const updatedUser = {
            name: 'John Doe The Updated',
            email: 'js@gmail.com',
            password: '123'
        };

        const response = await request.put(`/api/users/${testUser._id}`).send(updatedUser);
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe(updatedUser.name);
    });

    test('DELETE /api/users/:id - Delete A User', async () => {
        const response = await request.delete(`/api/users/${testUser._id}`);
        expect(response.status).toBe(200);
    });
});
