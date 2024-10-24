const request = require('supertest');
const app = require('../app');

describe('Ticket API Endpoints', () => {
    it('should return 200 and list all tickets', async () => {
        const res = await request(app).get('/api/tickets');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should create a new ticket', async () => {
        const newTicket = {
            title: 'Sample Ticket',
            description: 'This is a test ticket.',
            contactInfo: 'user@example.com',
            status: 'pending'
        };

        const res = await request(app)
            .post('/api/tickets')
            .send(newTicket);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe(newTicket.title);
    });
});
