const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const ticketsFilePath = path.join(__dirname, '../data/tickets.json');

// Helper function to read tickets from the JSON file
const readTickets = () => {
    const data = fs.readFileSync(ticketsFilePath);
    return JSON.parse(data);
};

// Helper function to write tickets to the JSON file
const writeTickets = (tickets) => {
    fs.writeFileSync(ticketsFilePath, JSON.stringify(tickets, null, 2));
};

// Get all tickets with filtering and sorting
router.get('/', (req, res) => {
    const { status, sortBy } = req.query;
    let tickets = readTickets();

    // Filter tickets by status if provided
    if (status) {
        tickets = tickets.filter(ticket => ticket.status === status);
    }

    // Sort tickets by the specified field if provided
    if (sortBy) {
        tickets.sort((a, b) => new Date(b[sortBy]) - new Date(a[sortBy]));
    }

    res.json(tickets);
});

// Create a new ticket
router.post('/', (req, res) => {
    const { title, description, contactInfo } = req.body;
    const tickets = readTickets();
    const newTicket = {
        id: Date.now().toString(), // Using timestamp as a unique ID
        title,
        description,
        contactInfo,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'pending'
    };
    tickets.push(newTicket);
    writeTickets(tickets);
    res.status(201).json(newTicket);
});

// Update a ticket's information and status
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, contactInfo, status } = req.body;
    const tickets = readTickets();
    const ticketIndex = tickets.findIndex(ticket => ticket.id === id);

    if (ticketIndex === -1) {
        return res.status(404).json({ message: 'Ticket not found' });
    }

    // Update ticket fields
    const updatedTicket = {
        ...tickets[ticketIndex],
        title: title || tickets[ticketIndex].title,
        description: description || tickets[ticketIndex].description,
        contactInfo: contactInfo || tickets[ticketIndex].contactInfo,
        status: status || tickets[ticketIndex].status,
        updatedAt: new Date().toISOString() // Update timestamp
    };

    tickets[ticketIndex] = updatedTicket;
    writeTickets(tickets);
    res.json(updatedTicket);
});

module.exports = router;
