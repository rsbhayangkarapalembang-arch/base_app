const request = require('supertest');
const app = require('../src/app');
const userService = require('../src/services/user.service');

jest.mock('../src/services/user.service');

describe('User Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    userService.getAllUsers.mockResolvedValue([{ id: 'a', name: 'A', email: 'a@mail.com' }]);

    const response = await request(app).get('/api/v1/users');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
  });

  it('should validate user id', async () => {
    const response = await request(app).get('/api/v1/users/invalid-id');

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
