import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";


const LinearGradientBackground: React.FC = () => {
    return (
        <>
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
        </>
    )
}

const styles = StyleSheet.create({
    mask: {
        ...StyleSheet.absoluteFillObject,
        width: "100%", // Full-width mask
        height: "100%",
    },
});

export default LinearGradientBackground;