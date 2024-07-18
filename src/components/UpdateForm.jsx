import React, { useState } from "react";
import { TextField, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const UpdateForm = () => {
    // const { trips, selectedTrips } = useTripContext();

    const [formData, setFormData] = useState({
        currentStatus: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Define status options
    const statusOptions = [
        { value: 'booked', label: 'Booked' },
        { value: 'In Transit', label: 'In Transit' },
        { value: 'Reached Destination', label: 'Reached Destination' },
        { value: 'Delivered', label: 'Delivered' },
    ];

    return (
        <Box component="form" sx={{ '& .MuiFormControl-root': { m: 1, width: '25ch' } }}>
            <FormControl fullWidth margin="normal">
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                    labelId="status-select-label"
                    id="status-select"
                    name="currentStatus"
                    value={formData.currentStatus}
                    onChange={handleChange}
                    label="Status"
                >
                    {statusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default UpdateForm;