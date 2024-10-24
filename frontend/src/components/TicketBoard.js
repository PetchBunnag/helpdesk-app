import React, { useEffect, useState, useCallback } from 'react';
import { Container, Grid, Box } from '@mui/material';
import TicketCard from './TicketCard';
import FilterSideBar from './FilterSideBar';
import CreateTicketDialog from './CreateTicketDialog';
import '../styles/TicketBoard.css';

const TicketBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [statusFilter, setStatusFilter] = useState('');
    const [sortBy, setSortBy] = useState('');

    const statuses = ['pending', 'accepted', 'resolved', 'rejected'];

    const fetchTickets = useCallback(async () => {
        try {
            const query = new URLSearchParams({ status: statusFilter, sortBy }).toString();
            const response = await fetch(`http://localhost:3000/api/tickets?${query}`);
            if (!response.ok) throw new Error('Failed to fetch tickets');
            const data = await response.json();
            setTickets(data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    }, [statusFilter, sortBy]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:3000/api/tickets/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                fetchTickets();
            } else {
                console.error('Failed to update ticket status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const groupedTickets = statuses.reduce((acc, status) => {
        acc[status] = tickets.filter((ticket) => ticket.status === status);
        return acc;
    }, {});

    return (
        <Container maxWidth="xl" className="container">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3} md={2}>
                    <FilterSideBar
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                    />
                </Grid>

                <Grid item xs={12} sm={9} className="ticket-grid">
                    <Box className="ticket-box">
                        {statuses.map((status) =>
                            (statusFilter === '' || status === statusFilter) && (
                                <Box key={status} className="ticket-card-container">
                                    <TicketCard
                                        status={status}
                                        tickets={groupedTickets[status]}
                                        handleStatusChange={handleStatusChange}
                                    />
                                </Box>
                            )
                        )}
                    </Box>
                </Grid>
            </Grid>

            <CreateTicketDialog
                open={openDialog}
                setOpenDialog={setOpenDialog}
                fetchTickets={fetchTickets}
            />
        </Container>
    );
};

export default TicketBoard;
