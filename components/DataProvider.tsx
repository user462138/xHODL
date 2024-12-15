import { BitcoinPrice, CryptoData, CryptoDataWallet } from "@/types";
import React, { useState, useContext, useEffect } from "react";
import { Alert } from "react-native";

export interface DataContext {
    cryptos: CryptoData[];
    loading: boolean;
    walletData: CryptoDataWallet[];
    setWalletData: (_coinsWallet: CryptoDataWallet[]) => void;
    dataChart: number[];
    setDataChart: (_coinsDataChart: number[]) => void;
    labelsChart: string[];
    setLabelsChart: (_coinsLabelsChart: string[]) => void;
    loadData: () => void;
    fetchBitcoinData: () => void;
    error: string | null;
    postData: (BitcoinPriceData: BitcoinPrice) => void;
}

export const DataContext = React.createContext<DataContext>({
    cryptos: [],
    loading: false,
    walletData: [],
    setWalletData: (_coinsWallet: CryptoDataWallet[]) => { },
    dataChart: [],
    setDataChart: (_coinsDataChart: number[]) => { },
    labelsChart: [],
    setLabelsChart: (_coinsLabelsChart: string[]) => { },
    loadData: () => { },
    fetchBitcoinData: () => { },
    error: null,
    postData: (_BitcoinPriceData: BitcoinPrice) => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [cryptos, setCryptos] = useState<CryptoData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [dataChart, setDataChart] = useState<number[]>([]);
    const [labelsChart, setLabelsChart] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [walletData, setWalletData] = useState<CryptoDataWallet[]>([]);

    const loadData = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                headers: {
                    'X-CMC_PRO_API_KEY': "251683cf-e253-44a8-a218-2455ac9e2193",
                },
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch crypto data');
            }

            const result = await response.json();
            const data = result.data.map((item: any) => ({
                id: item.id,
                name: item.name,
                symbol: item.symbol,
                price_usd: item.quote.USD.price,
                percent_change_24h: item.quote.USD.percent_change_24h,
                logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`, // Construct the logo URL
            }));
            setCryptos(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Mock data for user wallet
    useEffect(() => {
        if (cryptos.length > 0 && walletData.length === 0) {
            setWalletData((prevWalletData) => [
                ...prevWalletData,
                {
                    name: cryptos[0].name,
                    coin: cryptos[0],
                    amount: 1.5,
                    balance: 1.5 * cryptos[0].price_usd,
                    color: "#F7931A",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                },
                {
                    name: cryptos[1].name,
                    coin: cryptos[1],
                    amount: 3.2,
                    balance: 3.2 * cryptos[1].price_usd,
                    color: "#3C3C3D",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                },
                {
                    name: cryptos[2].name,
                    coin: cryptos[2],
                    amount: 1500,
                    balance: 1500 * cryptos[2].price_usd,
                    color: "#0085C7",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                },
                {
                    name: cryptos[3].name,
                    coin: cryptos[3],
                    amount: 25.0,
                    balance: 25.0 * cryptos[3].price_usd,
                    color: "#B3B3B3",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                },
            ]);
        }
    }, [cryptos]);


    const fetchBitcoinData = async () => {
        try {
            const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlhemFuLmR1a2hhbkBzdHVkZW50LmFwLmJlIiwiaWF0IjoxNzMzNzM1NzMyfQ.BXhrfHf6PPtsWOhYol_WnXi9Ary5rxWNWJbJ8snSRcQ";
            const headers = {
                Authorization: `Bearer ${token}`
            };
            const response = await fetch('https://sampleapis.assimilate.be/bitcoin/historical_prices/', {
                headers: headers,
            });
            const json: BitcoinPrice[] = await response.json();

            const parseDate = (dateString: string): Date => {
                const [day, month, year] = dateString.split("/").map(Number);
                return new Date(year, month - 1, day);
            };
            const sortedByDate = json.reverse().sort((a, b) => parseDate(a.Date).getTime() - parseDate(b.Date).getTime());
            const sortedByDateSlice = sortedByDate.slice(-6)

            // Format the dates from "DD/MM/YYYY" to "MMM D, YYYY"
            const prices = sortedByDateSlice.map(item => item.Price); // Y-as: prijzen
            const dates = sortedByDateSlice.map((item) => formatDate(item.Date)); // X-as: datums

            const maxPoints = 30;
            const step = Math.ceil(prices.length / maxPoints);
            setDataChart(prices.filter((_, index) => index % step === 0));
            setLabelsChart(dates.filter((_, index) => index % step === 0));

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string): string => {
        const [day, month, year] = dateString.split('/').map(Number);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[month - 1]} ${day}`;
    };

    useEffect(() => {
        fetchBitcoinData();
    }, []);

    const postData = async (BitcoinPriceData: BitcoinPrice): Promise<Response | undefined> => {
        try {
            // Generate the new entry with any required transformations
            const newEntry: BitcoinPrice = {
                ...BitcoinPriceData,
                ChangePercentFromLastMonth: -99,
            };
            console.log('Posting Data:', newEntry);
    
            // Use a secure method to retrieve tokens, not hardcoded values
            const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlhemFuLmR1a2hhbkBzdHVkZW50LmFwLmJlIiwiaWF0IjoxNzMzNzM1NzMyfQ.BXhrfHf6PPtsWOhYol_WnXi9Ary5rxWNWJbJ8snSRcQ";            if (!token) {
                throw new Error('Authorization token is missing');
            }
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            const response = await fetch('https://sampleapis.assimilate.be/bitcoin/historical_prices', {
                method: 'POST',
                headers,
                body: JSON.stringify(newEntry),
            });
            if (!response.ok) {
                console.error('Failed to post data:', response.status, response.statusText);
                Alert.alert('Error', `Failed to post data: ${response.statusText}`);
                return undefined;
            }

            return response;

        } catch (error) {
            console.error('Error posting data:', error);
            Alert.alert('Error', 'An unexpected error occurred while posting data.');
            return undefined;
        }
    };
    
    return (
        <DataContext.Provider value={{ cryptos, walletData, dataChart, setDataChart, labelsChart, setLabelsChart, setWalletData, loadData, fetchBitcoinData, loading, error, postData }}>
            {children}
        </DataContext.Provider>
    )
}