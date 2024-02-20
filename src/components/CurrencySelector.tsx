import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CurrencySelector = ({ currencies, selectedCurrency, onSelectCurrency }) => {
    return (
        <View style={styles.container}>
            {currencies.map((currency) => (
                <TouchableOpacity
                    key={currency}
                    style={[styles.currencyButton, currency === selectedCurrency && styles.selectedCurrencyButton]}
                    onPress={() => onSelectCurrency(currency)}
                >
                    <Text style={styles.currencyButtonText}>{currency}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 10,
        zIndex: 99,
        gap: 10,
    },
    currencyButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginRight: 10,
    },
    selectedCurrencyButton: {
        backgroundColor: '#007bff',
    },
    currencyButtonText: {
        fontSize: 16,
        color: 'black',
    },
});

export default CurrencySelector;
