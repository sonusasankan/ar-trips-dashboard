import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

// Create context
const TripContext = createContext();

// Custom hook for using the context
export const useTripContext = () => useContext(TripContext);

// Action types
const INIT_TRIPS = 'INIT_TRIPS';
const ADD_TRIP = 'ADD_TRIP';
const UPDATE_TRIP = 'UPDATE_TRIP';

// Reducer function
const tripReducer = (state, action) => {
  switch (action.type) {
    case INIT_TRIPS:
      return action.payload;
    case ADD_TRIP:
      return [action.payload, ...state];
    case UPDATE_TRIP:
      return state.map(trip => trip.tripId === action.payload.tripId ? action.payload : trip);
    default:
      return state;
  }
};

// Context provider component
export const TripProvider = ({ children }) => {
  const [trips, dispatch] = useReducer(tripReducer, []);
  const [totals, setTotals] = useState({ total: 0, delivered: 0, onTimePercentage: 0, delayed: 0, inTransit: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        const sortedData = sortTrips(data.data);
        dispatch({ type: 'INIT_TRIPS', payload: sortedData });
        calculateTotals(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    sortTrips(trips)
    calculateTotals(trips);
  }, [trips]);

  const sortTrips = (trips) => {
    return trips.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  };

  const calculateTotals = (trips) => {
    const total = trips.length;
    const delivered = trips.filter(trip => trip.currentStatusCode === "DEL").length;
    const inTransit = trips.filter(trip => trip.currentStatusCode === "INT").length;
    const delayed = trips.filter(trip => {
      const tripEndTime = trip.tripEndTime ? new Date(trip.tripEndTime) : new Date(trip.lastPingTime);
      const tripStartTime = new Date(trip.tripStartTime);
      const timeTaken = (tripEndTime - tripStartTime) / (1000 * 60 * 60 * 24);
      return timeTaken > trip.etaDays;
    }).length;
    const onTime = delivered - delayed;
    const onTimePercentage = delivered ? ((onTime / delivered) * 100).toFixed(2) : 0;

    setTotals({ total, delivered, onTimePercentage, delayed, inTransit });
  };

  const addTrip = (trip) => {
    dispatch({ type: ADD_TRIP, payload: trip });
  };

  const updateTrip = (trip) => {
    dispatch({ type: UPDATE_TRIP, payload: trip });
  };

  return (
    <TripContext.Provider value={{ trips, totals, addTrip, updateTrip  }}>
      {children}
    </TripContext.Provider>
  );
};
