import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Dimensions, Image, StyleSheet, View } from "react-native";

// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import ObscuraButton from "@/components/ObscuraButton";
import React, { useContext } from "react";
import { Button, Text } from "react-native";
import { Card, PaperProvider } from "react-native-paper";
import { LinearGradient } from 'expo-linear-gradient';
import { PhotoContext } from "./_layout";

export default function MediaScreen() {
    const { media, type } = useLocalSearchParams();
    const router = useRouter();
    const { photoUri, setPhotoUri } = useContext(PhotoContext);
    console.log(media, type);

    //   return (
    //     <View style={styles.container}>
    //   {
    //     type === "photo" ? (
    //       <Image
    //         source={{ uri: `file://${media}` }}
    //         style={{ width: "100%", height: "80%", resizeMode: "contain" }}
    //       />
    //     ) : null
    //     // <Video source={{ uri: media }} style={{ width: "100%", height: "100%" }} />
    //   }
    //   <Button
    //     title="Save to gallery"
    //     // containerStyle={{ alignSelf: "center" }}
    //     onPress={async () => {
    //       saveToLibraryAsync(media as string);
    //       Alert.alert("Saved to gallery!");
    //       router.back();
    //     }}
    //   />
    //   <Link href="/camera" style={styles.link}>
    //     <Text >Delete and go back</Text>
    //   </Link>
    //     </View>
    //   );
    // }

    // const styles = StyleSheet.create({
    //   container: {
    //     flex: 1,
    //     padding: 20,
    //   },
    //   link: {
    //     marginTop: 15,
    //     paddingVertical: 15,
    //     alignSelf: "center",
    //   },
    // });


    return (
        <PaperProvider>
            <View style={styles.container}>
                {/* Dark Background Gradient Layers */}
                <LinearGradient
                    colors={["rgba(25,25,112,0.5)", "transparent"]} // Dark Blue
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFillObject}
                />
                <LinearGradient
                    colors={["rgba(128,0,128,0.5)", "transparent"]} // Dark Purple
                    start={{ x: 0.3, y: 0.7 }}
                    end={{ x: 0.7, y: 0.3 }}
                    style={StyleSheet.absoluteFillObject}
                />
                <LinearGradient
                    colors={["rgba(25,25,112,0.5)", "transparent"]} // Dark Blue
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={StyleSheet.absoluteFillObject}
                />
                <LinearGradient
                    colors={["rgba(128,0,128,0.5)", "transparent"]} // Dark Purple
                    start={{ x: 0.7, y: 0.3 }}
                    end={{ x: 0.3, y: 0.7 }}
                    style={StyleSheet.absoluteFillObject}
                />

                {/* Dark Slider Wrapper Mask */}
                <LinearGradient
                    colors={[
                        "transparent",
                        "rgba(0,0,0,0.8)", // Dark mask
                        "rgba(0,0,0,0.8)", // Dark mask
                        "transparent",
                    ]}
                    locations={[0, 0.1, 0.9, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.mask}
                />
                <Card style={styles.card}>
                    <View style={styles.modalView}>
                        {
                            type === "photo" ? (
                                <Image
                                    source={{ uri: `file://${media}` }}
                                    style={{
                                        width: 300, // Use a fixed width and height for a circle
                                        height: 300,
                                        borderRadius: 150, // Make it half of the width/height for a perfect circle
                                        resizeMode: "cover", // Ensures the image fits well
                                    }} />
                            ) : null
                        }
                    </View>
                </Card>
                <Card style={styles.card}>
                    <Button
                        title="Save and go profile"
                        onPress={async () => {
                            // saveToLibraryAsync(media as string);
                            setPhotoUri(media as string)
                            router.push({ pathname: "/profile" })
                            router.back();
                        }}
                    />
                </Card>
                <Card style={styles.card}>
                    <Button
                        title="Delete and go back"
                        onPress={async () => {
                            router.push({ pathname: "/camera" })
                        }}
                        color={'red'}
                    />
                </Card>

            </View>
        </PaperProvider >
    );
};


const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 150,
        resizeMode: "cover",
    },
    mask: {
        ...StyleSheet.absoluteFillObject,
        width: "100%", // Full-width mask
        height: "100%",
    },
    card: {
        margin: 11,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#121212",
        width: screenWidth - 45,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: 375,
        padding: 10,
        alignItems: "center",
    },
    linkText: {
        color: "blue",
        textDecorationLine: "underline",
    },
});