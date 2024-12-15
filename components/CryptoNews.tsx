import { NewsItem } from '@/types';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Text, Card, ActivityIndicator, PaperProvider } from 'react-native-paper';
import LinearGradientBackground from './LinearGradientBackground';

const CryptoNews: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchNews = async () => {
        try {
            const response = await fetch(
                'https://min-api.cryptocompare.com/data/v2/news/?lang=EN'
            );
            const data = await response.json();
            setNews(data.Data); // Ensure `Data` is an array of NewsItem objects
            setLoading(false);
        } catch (error) {
            console.error('Error fetching news:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const refreshNews = async () => {
        setRefreshing(true);
        await new Promise((resolve, reject) => setTimeout(resolve, 2000));
        fetchNews()
        setRefreshing(false);
    }

    const router = useRouter();
    const openWebView = (link: string | undefined) => {
        if (link) {
            router.push({
                pathname: "/[link]",
                params: { link: `${link}` },
            });
        } else {
            console.warn('No URL provided for this article.');
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator animating={true} size="large" />
                <Text>Loading news...</Text>
            </View>
        );
    }

    return (
        <PaperProvider>
            <View style={styles.container}>
                <LinearGradientBackground />
                <SafeAreaView>
                    <FlatList
                        data={news}
                        keyExtractor={(item) => item.id}
                        onRefresh={() => refreshNews()}
                        refreshing={refreshing}
                        renderItem={({ item }) => (
                            <Card onPress={() => openWebView(item.url)} style={styles.card}>
                                {item.imageurl && <Card.Cover style={styles.imag} source={{ uri: item.imageurl }} />}
                                <Card.Content>
                                    <Text variant="titleLarge" style={styles.title}>
                                        {item.title}
                                    </Text>
                                    <Text variant="bodyMedium" numberOfLines={2} ellipsizeMode="tail">
                                        {item.body}
                                    </Text>
                                </Card.Content>
                            </Card>
                        )}
                    />
                </SafeAreaView>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    html: {
        backgroundColor: "#121212"
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "stretch",
        backgroundColor: 'rgba(18,18,18,1)',
    },
    card: {
        margin: 25,
        backgroundColor: 'rgba(18,18,18,1)',
    },
    title: {
        fontWeight: 'bold',
        marginVertical: 5,
    },
    link: {
        color: 'blue',
    },
    mask: {
        ...StyleSheet.absoluteFillObject,
        width: "100%", // Full-width mask
        height: "100%",
    },
    imag: {
        backgroundColor: 'rgba(18,18,18,1)',
    },
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: "#121212", // Fallback dark background color
    },
});

export default CryptoNews;
