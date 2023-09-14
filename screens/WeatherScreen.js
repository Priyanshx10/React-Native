import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const WeatherScreen = ({ route }) => {
  const [weatherData, setWeatherData] = useState(null);
  const { city } = route.params;

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with an actual API key
    const API_KEY = '10513eb5e42e6ee0fe9cbcd0d4af0347';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    axios
      .get(API_URL)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, [city]);

  return (
    <View style={styles.container}>
      {weatherData ? (
        <>
          <Text style={styles.city}>{weatherData.name}, {weatherData.sys.country}</Text>
          <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
          <Text style={styles.description}>{weatherData.weather[0].description}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 20,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default WeatherScreen;
