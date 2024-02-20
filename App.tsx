import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { fetchRates } from "./src/api/CurrencyAPI";
import HomeScreen from "./src/screens/HomeScreen";

let currency = 'USD';

const App = () => {
  useEffect(() => {
    fetchRates(currency).then(rates => {
      if (rates) {
        console.log(`${currency} için döviz kurları:`, rates);
      }
    });
  }, []);

  return (
      <View style={styles.container}>
        <HomeScreen />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
