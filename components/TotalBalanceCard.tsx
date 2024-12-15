import { useContext, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { DataContext } from "./DataProvider";

const TotalBalanceCard = () => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const { walletData } = useContext(DataContext);
    const [displayBalance, setDisplayBalance] = useState<string>('0.00');


    function formatToUSNumber(input: string | number | null | undefined): string {
        if (input === null || input === undefined) {
            return '0.00'; 
        }
        const numberInput = typeof input === 'string' ? parseFloat(input) : input;
        if (isNaN(numberInput)) {
            return '0.00'; 
        }
        // Format the number with 2 fixed decimal places first
        let fixedDecimal = numberInput.toFixed(2); 
        // Return the formatted number as a string in US format with commas
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(fixedDecimal));
    }

    useEffect(() => {
        const newBalance = walletData.reduce((acc, coin) => acc + coin.balance, 0);
        Animated.timing(animatedValue, {
            toValue: newBalance,
            duration: 500, 
            useNativeDriver: false, 
        }).start();
        // Listen to the animated value changes and update display
        const listener = animatedValue.addListener(({ value }) => {
            setDisplayBalance(formatToUSNumber(value.toFixed(2))); 
        });
        return () => {
            animatedValue.removeListener(listener); 
        };
    }, [walletData]);

    return (
        <>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.headerText}>Total Wallet Balance</Text>
                    <Text style={styles.totalBalance}>{displayBalance}</Text>
                </Card.Content>
            </Card>

        </>
    )
}

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    card: {
        margin: 20,
        marginBottom: 0,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#121212',
        width: screenWidth - 45
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    totalBalance: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#4CAF50",
        marginLeft: 'auto'
    },
});
export default TotalBalanceCard;