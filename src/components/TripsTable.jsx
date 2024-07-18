import { useState, useEffect } from "react";
import { useTripContext } from '../context/TripContext';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Button, Box, TablePagination, Checkbox } from '@mui/material';
import { styled } from '@mui/system';
import TripForm from '../components/TripForm';

const useStyles = {
    table: {
      minWidth: 650,
    },
    card: {
      margin: '10px 0',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    }
};

const TableHeader = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
});

const TripsTable = () => {
    const classes = useStyles;
    const { trips, selectTrip, deselectTrip, selectedTrips } = useTripContext();
    const [orderDirection, setOrderDirection] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openModal, setOpenModal] = useState(false);
    const [formType, setFormType] = useState(null);

    const handleOpenModal = (type) => {
        setFormType(type);
        setOpenModal(true);
    };
    const handleCloseModal = () => setOpenModal(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    const handleSortRequest = (property) => {
        const isAsc = orderBy === property && orderDirection === 'asc';
        setOrderDirection(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    
    const sortedTrips = trips.slice().sort((a, b) => {
        if (orderBy) {
          if (a[orderBy] < b[orderBy]) return orderDirection === 'asc' ? -1 : 1;
          if (a[orderBy] > b[orderBy]) return orderDirection === 'asc' ? 1 : -1;
          return 0;
        }
        return trips;
    });
    
    const currentRows = sortedTrips.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    
    const calculateTATStatus = (trip) => {
        const tripEndTime = trip.tripEndTime ? new Date(trip.tripEndTime) : new Date(trip.lastPingTime);
        const tripStartTime = new Date(trip.tripStartTime);
        const timeTaken = (tripEndTime - tripStartTime) / (1000 * 60 * 60 * 24);
        if( tripEndTime <= 0) {
          return 'Others';
        }
        return timeTaken <= trip.etaDays ? 'On-time' : 'Delayed';
    };

    const handleAddTrip = (tripData) => {
        // Implement the logic to add the trip to your data store or API
        console.log('New trip data:', tripData);
    };

    const handleCheckboxChange = (event, trip) => {
        if (event.target.checked) {
            selectTrip(trip);
        } else {
            deselectTrip(trip.tripId);
        }
    };

    return (
        <>
        <TableContainer component={Paper}>
            <TableHeader>
                <Typography variant="h6">Trip List</Typography>
                <Box>
                <Button onClick={() => handleOpenModal('UPDATE')} variant="contained" color="primary" style={{ marginRight: '10px' }}>
                    Update Status
                </Button>
                <Button onClick={() => handleOpenModal('ADD')} variant="contained" color="secondary">
                    Add Trip
                </Button>
                </Box>
            </TableHeader>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {['Trip Id', 'Transporter', 'Source', 'Destination', 'Phone', 'ETA', 'Distance Remaining', 'Trip Status', 'TAT Status'].map((headCell) => (
                <TableCell key={headCell}>
                  <TableSortLabel
                    active={orderBy === headCell}
                    direction={orderBy === headCell ? orderDirection : 'asc'}
                    onClick={() => handleSortRequest(headCell)}
                  >
                    {headCell.charAt(0).toUpperCase() + headCell.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((trip) => (
              <TableRow key={trip.tripId}>
                <TableCell>{trip.tripId}</TableCell>
                <TableCell>{trip.transporter}</TableCell>
                <TableCell>{trip.source}</TableCell>
                <TableCell>{trip.dest}</TableCell>
                <TableCell>{trip.phoneNumber}</TableCell>
                <TableCell>{trip.etaDays}</TableCell>
                <TableCell>{trip.distanceRemaining}</TableCell>
                <TableCell>{trip.currenStatus}</TableCell>
                <TableCell>{calculateTATStatus(trip)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
      component="div"
      count={sortedTrips.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[5, 10, 25]}
    />
    <TripForm
        type={formType}
        open={openModal}
        handleClose={handleCloseModal}
        handleAddTrip={handleAddTrip}
      />
    </>
    );
};

export default TripsTable;
