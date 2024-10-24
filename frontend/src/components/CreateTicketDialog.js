import React, { useState } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import '../styles/CreateTicketDialog.css';

const CreateTicketDialog = ({ open, setOpenDialog, fetchTickets }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        contactInfo: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/tickets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            fetchTickets();
            setOpenDialog(false);
            setFormData({ title: '', description: '', contactInfo: '' });
        }
    };

    return (
        <Dialog open={open} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Create New Ticket</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill in the ticket details below.
                </DialogContentText>
                <form onSubmit={handleSubmit}>
                    {['title', 'description', 'contactInfo'].map((field, index) => (
                        <TextField
                            key={field}
                            autoFocus={index === 0}
                            margin="dense"
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            fullWidth
                            required
                            multiline={field === 'description'}
                            rows={field === 'description' ? 4 : 1}
                            className="text-field"
                        />
                    ))}
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setOpenDialog(false)}
                    color="secondary"
                    className="cancel-button"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    className="create-button"
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateTicketDialog;
