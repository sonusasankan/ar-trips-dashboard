'use client';
import { useState, useEffect } from "react";
import { useTripContext } from '../context/TripContext';
import { Box, Container, Typography, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import styles from "./page.module.css";

//Table
import TripsTable from '../components/TripsTable';


const StyledContainer = styled(Container)({
  maxWidth: '100% !important',
  width: '100%',
  backgroundColor: 'transparent'
});

export default function Home() {
  const { trips, totals } = useTripContext();

  return (
      <StyledContainer >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography>Total Trips</Typography>
                <Typography variant="h5">{totals.total}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Typography variant="subtitle1">Delivered</Typography>
                    <Typography variant="h5">{totals.delivered}</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <CircularProgress
                        variant="determinate"
                        value={80}
                        size={50}
                        thickness={4}
                      />
                    </Box>
                    <p>On time: {totals.onTimePercentage}%</p>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item md={4}>
                    <Typography>Delayed</Typography>
                    <Typography variant="h5">{totals.delayed}</Typography>
                  </Grid>
                  <Grid item md={4}>
                    <Typography>In Transit</Typography>
                    <Typography variant="h5">{totals.inTransit}</Typography>
                  </Grid>
                  <Grid item md={4}>
                    <Typography>Delivered</Typography>
                    <Typography variant="h5">{totals.inTransit}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <TripsTable/>
    </StyledContainer>
  );
}
