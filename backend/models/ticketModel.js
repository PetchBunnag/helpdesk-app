const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const tickets = require('../data/tickets.json');

// Save tickets to the JSON file
const saveTickets = (data) => {
    fs.writeFileSync('./data/tickets.json', JSON.stringify(data, null, 2));
};

// Get all tickets, optionally filter by status
exports.getTickets = (status) => {
    if (status) return tickets.filter(ticket => ticket.status === status);
    return tickets;
};

// Create a new ticket
exports.createTicket = (title, description, contact) => {
    const newTicket = {
        id: uuidv4(),
        title,
        description,
        contact,
        status: 'Pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };
    tickets.push(newTicket);
    saveTickets(tickets);
    return newTicket;
};

// Update a ticket’s info
exports.updateTicket = (id, title, description, contact) => {
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return null;
    ticket.title = title;
    ticket.description = description;
    ticket.contact = contact;
    ticket.updated_at = new Date().toISOString();
    saveTickets(tickets);
    return ticket;
};

// Update ticket status
exports.updateStatus = (id, status) => {
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return null;
    ticket.status = status;
    ticket.updated_at = new Date().toISOString();
    saveTickets(tickets);
    return ticket;
};
