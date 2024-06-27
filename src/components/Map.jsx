import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import MapComponent from './MapComponent';

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const ipAddress = response.data.ip;
        const locationResponse = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
        setUserLocation({
          latitude: locationResponse.data.latitude,
          longitude: locationResponse.data.longitude,
        });
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Your Location
      </Typography>
      {userLocation && (
        <div>
          <Typography variant="body1">Latitude: {userLocation.latitude}</Typography>
          <Typography variant="body1">Longitude: {userLocation.longitude}</Typography>
          {/* Add map component or visualization here */}
          <MapComponent lat={userLocation.latitude} lng={userLocation.longitude}/>
        </div>
      )}
    </Container>
  );
};

export default Map;
