import LinearGradientBackground from '@/components/LinearGradientBackground';
import PieChartWallet from '@/components/PieChart';
import CryptoWalletTabel from '@/components/CryptoWalletTabel';
import TotalBalanceCard from '@/components/TotalBalanceCard';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const cryptoIndex = () => {
  return (
    <View style={styles.container}>
      <LinearGradientBackground />
      <TotalBalanceCard/>
      <PieChartWallet/>
      <CryptoWalletTabel/>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#121212",
  },
  card: {
    margin: 20,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#121212',
    width: screenWidth - 45
  },
});

export default cryptoIndex;