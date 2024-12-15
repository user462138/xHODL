import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { router } from 'expo-router';


export default function App() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [capturedPhotos, setCapturedPhotos] = useState<Array<{ uri: string }>>(
        []
    );
    const camera = useRef<CameraView>(null);

    useEffect(() => {
        loadSavedPhotos();
    }, []);

    const loadSavedPhotos = useCallback(async () => {
        try {
            const savedPhotos = await AsyncStorage.getItem("capturedPhotos");
            if (savedPhotos) {
                setCapturedPhotos(JSON.parse(savedPhotos));
            }
        } catch (error) {
            console.error("Failed to load photos", error);
        }
    }, []);

    const savePhoto = useCallback(
        async (newPhoto: { uri: string }) => {
            try {
                const updatedPhotos = [newPhoto, ...capturedPhotos];
                await AsyncStorage.setItem(
                    "capturedPhotos",
                    JSON.stringify(updatedPhotos)
                );
                setCapturedPhotos(updatedPhotos);
            } catch (error) {
                console.error("Failed to save photo", error);
            }
        },
        [capturedPhotos]
    );

    const takePicture = async () => {
        try {
            if (camera.current == null) throw new Error("Camera ref is null!");

            console.log("Taking photo...");
            const photo = await camera.current.takePictureAsync({
            });
            await camera.current.stopRecording();
            router.push({
                pathname: "/media",
                params: { media: photo?.uri, type: "photo" },
            });
            // onMediaCaptured(photo, 'photo')
        } catch (e) {
            console.error("Failed to take photo!", e);
        }
    };



    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    // const takePicture = useCallback(async () => {
    //     if (cameraRef.current) {
    //         const photo: any = await cameraRef.current.takePictureAsync({
    //             quality: 1,
    //             base64: false,
    //             exif: false,
    //         });
    //         await savePhoto({ uri: photo.uri });
    //     }
    // }, [savePhoto]);

    // const takePicture = async () => {
    //     if (camera.current) {
    //         let photo = await camera.current.takePictureAsync();
    //         console.log(photo);
    //         console.log("photo");
    //     }
    // };

    // useEffect(() => {
    // const takePicture = async () => {
    //     try {
    //         if (cameraRef.current) {
    //             const photo: any = await cameraRef.current.takePictureAsync({
    //                 quality: 1,
    //                 base64: false,
    //                 exif: false,
    //             });
    //             await savePhoto({ uri: photo.uri });
    //         }
    //     } catch (error) {
    //         console.error("Error taking picture:", error);
    //     }}
    //     takePicture()
    // },[savePhoto]);

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={camera} flash='on'>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={takePicture} >
                        <Icon
                            source="circle-slice-8"
                            color={'rgba(128,0,128,0.5)'}
                            size={75}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#000",
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        margin: 44,
    },
    button: {
        backgroundColor: "rgba(255,255,255,0.3)",
        padding: 12,
        borderRadius: 50,
        margin: 8,
        alignItems: "center",
    },
    text: {
        color: "#000",
        fontSize: 24,
        fontWeight: 'bold',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
});