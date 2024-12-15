export interface CryptoData {
    id: string;
    name: string;
    symbol: string;
    price_usd: number;
    percent_change_24h: number;
    logo: string;
}
export interface CryptoDataWallet {
    name: string
    coin: CryptoData
    amount: number
    balance: number
    color: string
    legendFontColor: string
    legendFontSize: number
}
export interface BitcoinPrice {
    id?: number;
    Date: string; // Formaat: "01/01/2022"
    Price: number;
    Open: number;
    High: number;
    ChangePercentFromLastMonth: number;
    Volume: string;
}
export interface NewsItem {
    id: string;
    title: string;
    body: string;
    url?: string;
    imageurl?: string;
}