const request = require('supertest');
const app = require('../src/app');
const authService = require('../src/services/auth.service');

jest.mock('../src/services/auth.service');

describe('Auth Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register user', async () => {
    authService.register.mockResolvedValue({ id: 'uuid', name: 'Test', email: 'test@mail.com' });

    const response = await request(app).post('/api/v1/auth/register').send({
      name: 'Test User',
      email: 'test@mail.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it('should reject invalid register payload', async () => {
    const response = await request(app).post('/api/v1/auth/register').send({
      name: 'ab',
      email: 'wrong',
      password: '123',
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('should login user', async () => {
    authService.login.mockResolvedValue({ id: 'uuid', name: 'Test', email: 'test@mail.com' });

    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'test@mail.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
