import React, { useState } from 'react';
import { StyleSheet, View, Button, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';

const App = () => {
    const { link } = useLocalSearchParams<{ link: string }>();
    console.log(link)

    const renderLoading = () => (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        </View>
    );

    return (
        <WebView
            style={styles.webview}
            source={{ uri: link }}
            // onLoadStart={renderLoading}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    webview: {
        flex: 1,
        width: '100%',
    },
    loader: {
        position: 'absolute',
        top: '50%',
    },
});

export default App;
