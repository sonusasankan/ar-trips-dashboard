import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import { useTripContext } from '../context/TripContext';

import UpdateForm from './UpdateForm';

const TripForm = ({ type, open, handleClose }) => {
  const { addTrip } = useTripContext();
  const [formData, setFormData] = useState({
    tripId: '',
    transporter: '',
    source: '',
    dest: '',
    phoneNumber: '',
    etaDays: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.tripId) newErrors.tripId = 'Trip ID is required';
    if (!formData.transporter) newErrors.transporter = 'Transporter is required';
    if (!formData.source) newErrors.source = 'Source is required';
    if (!formData.dest) newErrors.dest = 'Destination is required';
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }
    if (!formData.etaDays) {
      newErrors.etaDays = 'ETA is required';
    } else if (isNaN(formData.etaDays) || formData.etaDays <= 0) {
      newErrors.etaDays = 'ETA must be a positive number';
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const newTripData = {
        ...formData,
        createdAt: new Date().toISOString(), // Adding createdAt with today's date
        currentStatusCode: 'BKD',
        currenStatus: "Booked",
        lastPingTime: new Date().toISOString(),
        tripStartTime: new Date().toISOString(),
        tripEndTime: null,
        etaDays: Number(formData.etaDays),
        distanceRemaining: 0
      };
      addTrip(newTripData);
      handleClose();
    }
  };

  const handleModalClose = () => {
    setFormData({
      tripId: '',
      transporter: '',
      source: '',
      dest: '',
      phoneNumber: '',
      etaDays: '',
    });
    setErrors({});
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{ type === 'ADD' ? 'Add New Trip' : 'Update Trip'}</DialogTitle>
      <DialogContent>
        {type === 'ADD' ?  
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <TextField
          name="tripId"
          label="Trip ID"
          type="number"
          value={formData.tripId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          error={!!errors.tripId}
          helperText={errors.tripId}
        />
        <TextField
          name="transporter"
          label="Transporter"
          value={formData.transporter}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          error={!!errors.transporter}
          helperText={errors.transporter}
        />
        <TextField
          name="source"
          label="Source"
          value={formData.source}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          error={!!errors.source}
          helperText={errors.source}
        />
        <TextField
          name="dest"
          label="Destination"
          value={formData.dest}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          error={!!errors.dest}
          helperText={errors.dest}
        />
        <TextField
          name="phoneNumber"
          label="Phone"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
        />
        <TextField
          name="etaDays"
          label="ETA"
          value={formData.etaDays}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          error={!!errors.etaDays}
          helperText={errors.etaDays}
        />
      </Box>
        : 
        <UpdateForm/>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">{ type === 'ADD' ? 'Add Trip' : 'Update'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TripForm;
