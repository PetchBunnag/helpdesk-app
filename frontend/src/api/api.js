const API_URL = 'http://localhost:3000/api/tickets';

export const fetchTickets = async () => {
    const res = await fetch(API_URL);
    return res.json();
};

export const updateTicketStatus = async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
};
