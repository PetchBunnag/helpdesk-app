import React from 'react';
import {
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from '@mui/material';
import '../styles/FilterSideBar.css';

const statuses = ['pending', 'accepted', 'resolved', 'rejected'];

const FilterSideBar = ({
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    openDialog,
    setOpenDialog,
}) => (
    <Box className="filter-sidebar">
        <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
            sx={{ mb: 6, p: 2, maxWidth: 200 }}
            fullWidth
        >
            <b>Create Ticket</b>
        </Button>

        <Typography variant="h6" gutterBottom>
            <b>Filters & Sorting</b>
        </Typography>

        <FormControl fullWidth margin="normal" className="form-control">
            <InputLabel>Status Filter</InputLabel>
            <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <MenuItem value="">
                    <em>All Statuses</em>
                </MenuItem>
                {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" className="form-control">
            <InputLabel>Sort By</InputLabel>
            <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <MenuItem value="">
                    <em>No Sorting</em>
                </MenuItem>
                <MenuItem value="updatedAt">Latest Update</MenuItem>
            </Select>
        </FormControl>
    </Box>
);

export default FilterSideBar;
