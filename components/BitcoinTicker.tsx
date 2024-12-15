import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, Animated } from "react-native";
import { Card, Text } from "react-native-paper";

const BitcoinTicker: React.FC = () => {
  const [price, setPrice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // const [bitcoinId] = useState("bitcoin");  // The CoinMarketCap ID for Bitcoin

  const fetchBitcoinPrice = async () => {
    try {
      const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice/BTC.json*");
      if (!response.ok) {
        throw new Error("Failed to fetch Bitcoin price");
      }
      const data = await response.json();
      setPrice(data.bpi.USD.rate);
    } catch (err) {
      setError("Failed to fetch Bitcoin price");
    }
  };

  useEffect(() => {
    fetchBitcoinPrice();
    const interval = setInterval(fetchBitcoinPrice, 30000); // Update every 30 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const [displayBalance, setDisplayBalance] = useState("0.00");
  const animatedValue = useRef(new Animated.Value(0)).current; 

  function removeCommas(input: string | null | undefined): string | null {
    if (input === null || input === undefined) {
      return null;
    }
    return input.replace(",", '');
  }

  function formatToUSNumber(input: string | number | null | undefined): string {
    if (input === null || input === undefined) {
        return '0.00'; 
    }

    const numberInput = typeof input === 'string' ? parseFloat(input) : input;

    if (isNaN(numberInput)) {
        return '0.00'; // Return a default value if input is not a valid number
    }

    // Format the number with 2 fixed decimal places first
    let fixedDecimal = numberInput.toFixed(2); // Ensures two decimal places

    // Return the formatted number as a string in US format with commas
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(fixedDecimal));
}


  useEffect(() => {
    // Convert price to a number, default to 0 if null or invalid
    const newBalance = parseFloat(removeCommas(price) || '0') || 0;
    // console.log(newBalance)
    // console.log(price)

    // Animate the transition to the new balance
    Animated.timing(animatedValue, {
      toValue: newBalance,
      duration: 500, // Animation duration in milliseconds
      useNativeDriver: false, // Can't use native driver for text interpolation
    }).start();

    // Update the display balance during the animation
    const listener = animatedValue.addListener(({ value }) => {
      setDisplayBalance(formatToUSNumber(value.toFixed(2))); // Format the number to US format
    });

    // Cleanup listener on unmount or when `price` changes
    return () => {
      animatedValue.removeListener(listener);
    };
  }, [price]);



  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Image
            source={{
              uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/1.png`,
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>Bitcoin Price (USD)</Text>
        </View>
        {price ? (
          <Text style={styles.price}>{displayBalance}</Text>
        ) : (
          <Text style={styles.error}>{error || "Loading..."}</Text>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#121212'
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  error: {
    fontSize: 16,
    color: "#F44336",
  },
});

export default BitcoinTicker;
