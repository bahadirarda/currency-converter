import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CurrencyList from "../components/CurrencyList";
import CurrencyConverter from "../components/CurrencyConverter";

const HomeScreen = () => {
    const [rates, setRates] = useState({});

    return (
        <View style={styles.container}>
            <CurrencyConverter rates={rates} />
            <CurrencyList onRatesReceived={setRates} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
});

export default HomeScreen;
