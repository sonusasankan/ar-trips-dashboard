import React, { useState, useEffect } from "react";
import { Button, Box, Select, MenuItem, InputLabel, FormControl, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { useTripContext } from '../context/TripContext';

const UpdateForm = ({ open, handleClose }) => {
    const { trips, updateTrip, selectedTrip } = useTripContext();

    const [formData, setFormData] = useState({
        transporter: '',
        currenStatus: '',
    });

    useEffect(() => {
        if (selectedTrip) {
            setFormData(prevData => ({
                ...prevData,
                transporter: selectedTrip.transporter || '',
                currenStatus: selectedTrip.currenStatus || '',
            }));
        }
    }, [selectedTrip]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        const updatedTripData = {
            ...selectedTrip,
            ...formData,
            lastPingTime: new Date().toISOString()
        }
        updateTrip(updatedTripData);
        handleClose();
    };

    const handleModalClose = () => {
        handleClose();
      };
    

    const uniqueTransporters = trips.map(trip => trip.transporter).filter((transporter, index, self) => self.indexOf(transporter) === index);

    // Define status options
    const statusOptions = [
        { value: 'Booked', label: 'Booked' },
        { value: 'In Transit', label: 'In Transit' },
        { value: 'Reached Destination', label: 'Reached Destination' },
        { value: 'Delivered', label: 'Delivered' },
    ];

    return (
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Trip</DialogTitle>
        <DialogContent>
            <Box component="form" sx={{ '& .MuiFormControl-root': { m: 1, width: '25ch' } }}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="transport-select-label">Transporter</InputLabel>
                    <Select
                        labelId="transport-select-label"
                        id="transport-select"
                        name="transporter"
                        value={formData.transporter}
                        onChange={handleChange}
                        label="Transporter"
                    >
                        {uniqueTransporters.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select
                        labelId="status-select-label"
                        id="status-select"
                        name="currenStatus"
                        value={formData.currenStatus}
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleModalClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">Update</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateForm;