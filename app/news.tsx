import { View, StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import CryptoNews from "@/components/CryptoNews";
import LinearGradientBackground from "@/components/LinearGradientBackground";

const Index = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      <CryptoNews></CryptoNews>
    </View>
  );
}

export default Index;