import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const CurrencyConverter = ({ rates }) => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [animation] = useState(new Animated.Value(0));

    const startAnimation = () => {
        if (!amount || !rates[fromCurrency] || !rates[toCurrency]) {
            return;
        }
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            setConvertedAmount(calculateConversion());
            animation.setValue(0);
        });
    };

    const calculateConversion = () => {
        if (!amount || !rates[fromCurrency] || !rates[toCurrency]) {
            return 'Dönüştürme hatası!';
        }
        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];
        const result = (parseFloat(amount) / fromRate) * toRate;
        return result.toFixed(2);
    };

    useEffect(() => {
        if (animation._value === 1) {
            setConvertedAmount(calculateConversion());
        }
    }, [animation, amount, fromCurrency, toCurrency, rates]);

    const rotateInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const animatedStyle = {
        transform: [{ rotate: rotateInterpolation }],
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Currency Converter</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Amount"
                    value={amount}
                    onChangeText={setAmount}
                />
                <View style={styles.currencyContainer}>
                    <TextInput
                        style={[styles.input, styles.currencyInput]}
                        placeholder="From"
                        value={fromCurrency}
                        onChangeText={setFromCurrency}
                    />
                    <TouchableOpacity style={styles.button} onPress={startAnimation}>
                        <Animated.View style={[styles.iconContainer, animatedStyle]}>
                            <MaterialIcons name="autorenew" size={24} color="black" />
                        </Animated.View>
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.input, styles.currencyInput]}
                        placeholder="To"
                        value={toCurrency}
                        onChangeText={setToCurrency}
                    />
                </View>
            </View>
            <Text style={styles.result}>Converted: {convertedAmount}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 18,
    },
    currencyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    currencyInput: {
        flex: 1,
        marginHorizontal: 5,
    },
    button: {
        padding: 10,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    result: {
        fontSize: 18,
        marginTop: 20,
        alignSelf: 'center',
    },
});

export default CurrencyConverter;