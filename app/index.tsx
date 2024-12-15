import React, { useContext } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { FlatList, SafeAreaView } from "react-native";
import BitcoinTicker from "@/components/BitcoinTicker";
import { View, StyleSheet } from "react-native";
import LineChartExample from "@/components/LineChart";
import LinearGradientBackground from "@/components/LinearGradientBackground";
import RenderCryptoItem from "@/components/RenderCryptoItem";
import { DataContext } from "@/components/DataProvider";



const App: React.FC = () => {
  const { cryptos } = useContext(DataContext);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <LinearGradientBackground />
        <SafeAreaView style={styles.content}>
          <BitcoinTicker />
          <FlatList
            nestedScrollEnabled
            initialNumToRender={10}
            data={cryptos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={RenderCryptoItem}
            style={styles.flatListStyle}
          />
          <LineChartExample/>
        </SafeAreaView>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  html: {
    backgroundColor: "#121212"
  },
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#121212", // Fallback dark background color
  },
  content: {
    // flex: 1,
    justifyContent: "center",
  },
  flatListStyle: {
    height: 300,
    backgroundColor: '#121212',
    margin: 20,
    padding: 10,
    borderRadius: 10,
  }
});

export default App;