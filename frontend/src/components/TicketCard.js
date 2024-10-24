import React from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Select,
    MenuItem,
    FormControl,
} from '@mui/material';
import '../styles/TicketCard.css';

const statusColors = {
    pending: { status: 'pending-status', ticket: 'pending-ticket' },
    accepted: { status: 'accepted-status', ticket: 'accepted-ticket' },
    resolved: { status: 'resolved-status', ticket: 'resolved-ticket' },
    rejected: { status: 'rejected-status', ticket: 'rejected-ticket' },
    default: { status: 'default-status', ticket: 'default-ticket' },
};

const TicketCard = ({ status, tickets, handleStatusChange }) => {
    const { status: statusClass, ticket: ticketClass } = statusColors[status] || statusColors.default;

    return (
        <div className={`ticket-card ${ticketClass}`}>
            <Typography variant="subtitle1" gutterBottom className={`status-text ${statusClass}`}>
                <b>{status}</b>
            </Typography>

            <div className="ticket-list">
                {tickets.map((ticket) => (
                    <Card key={ticket.id} className="ticket-item">
                        <CardContent>
                            <Typography variant="subtitle1">
                                <b>{ticket.title}</b>
                            </Typography>
                            <Typography>{ticket.description}</Typography>
                            <Typography>
                                <b>Contact:</b> {ticket.contactInfo}
                            </Typography>
                            <Typography>
                                <b>Created At:</b> {new Date(ticket.createdAt).toLocaleString()}
                            </Typography>
                            <Typography>
                                <b>Updated At:</b> {new Date(ticket.updatedAt).toLocaleString()}
                            </Typography>
                        </CardContent>

                        <CardActions>
                            <FormControl fullWidth>
                                <Select
                                    value={ticket.status}
                                    onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                                >
                                    {['pending', 'accepted', 'resolved', 'rejected'].map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TicketCard;
