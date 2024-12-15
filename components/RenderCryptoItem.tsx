import { CryptoData } from "@/types";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import Icon from "@expo/vector-icons/FontAwesome";

const RenderCryptoItem = ({ item }: { item: CryptoData }) => (
  <View style={styles.tableRow}>
    {/* Logo and Name */}
    <View style={[styles.tableCell, styles.logoColumn]}>
      <Image
        source={{ uri: item.logo || "placeholder-image-url" }}
        style={styles.cryptoLogo}
        accessibilityLabel={`${item.name} logo`}
      />
    </View>
    <View style={[styles.tableCell, styles.nameColumn]}>
      <Text style={styles.cryptoName}>
        {item.name} ({item.symbol})
      </Text>
    </View>

    {/* Price */}
    <Text style={[styles.tableCell, styles.priceColumn]}>
      ${item.price_usd.toFixed(2)}
    </Text>

    {/* Change */}
    <View style={[styles.tableCell, styles.changeColumn]}>
      <Text
        style={[
          styles.cryptoChange,
          { color: item.percent_change_24h > 0 ? "green" : "red" },
        ]}
      >
        {item.percent_change_24h.toFixed(2)}%
      </Text>
      <Icon
        name={item.percent_change_24h > 0 ? "arrow-up" : "arrow-down"}
        size={12}
        color={item.percent_change_24h > 0 ? "green" : "red"}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoColumn:{
    flex: 1,
    flexDirection: "row",
    alignItems: "center", // Ensures logo and text align vertically
  },
  nameColumn: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center", // Ensures logo and text align vertically
  },
  priceColumn: {
    flex: 1,
    alignItems: "flex-end",
  },
  changeColumn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  cryptoLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: "contain", // Ensures the image fits within the bounds
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 30, // Matches the logo height for alignment
  },
  cryptoChange: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 5,
  },
});

export default RenderCryptoItem;
