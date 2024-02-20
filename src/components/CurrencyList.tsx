import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { fetchRates } from "../api/CurrencyAPI";

const { width } = Dimensions.get('window');

interface Rates {
    [key: string]: number;
}

interface CurrencyListProps {
    onRatesReceived: (rates: Rates) => void;
}

const CurrencyCard = ({ currency, rate }) => {
    return (
        <TouchableOpacity style={styles.card}>
            <View style={styles.cardContent}>
                <Text style={styles.currency}>{currency}</Text>
                {/* Display rate or a placeholder if rate is not available */}
                <Text style={styles.rate}>{rate !== 'N/A' ? `${rate}` : 'Not available'}</Text>
            </View>
        </TouchableOpacity>
    );
};

const CurrencyList = ({ onRatesReceived }: CurrencyListProps) => {
    const [rates, setRates] = useState<Rates>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRates = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchRates('USD');
                if (data) {
                    setRates(data);
                    onRatesReceived(data);
                } else {
                    setError('Data could not be retrieved.');
                }
            } catch (error) {
                setError('An error occurred.');
            } finally {
                setLoading(false);
            }
        };

        loadRates();
    }, [onRatesReceived]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Currency Exchange Rates</Text>
            <FlatList
                data={Object.entries(rates)}
                keyExtractor={(_, index) => `currency-${index}`}
                renderItem={({ item }) => {
                    const [currency, rateValue] = item;
                    const rate = (typeof rateValue === 'number') ? rateValue.toFixed(2) : 'N/A';
                    return <CurrencyCard currency={currency} rate={rate} />;
                }}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 3, // Android için gölge
        shadowOffset: { width: 1, height: 1 }, // iOS için gölge
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    currency: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    rate: {
        fontSize: 18,
    },
    list: {
        paddingBottom: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default CurrencyList;
