const BASE_URL = `https://v6.exchangerate-api.com/v6/fbc8230f8dfc566e7d60bd35/latest`;

export const fetchRates = async (baseCurrency: string) => {
    const url = `${BASE_URL}/${baseCurrency}`; // Doğru URL yapısı
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.result === 'success') {
            console.log('Data:', data);
            return data.conversion_rates;
        } else {
            console.error('API Error:', data['error-type']);
            return null;
        }
    } catch (error) {
        console.error('API fetch error:', error);
        return null;
    }
};
