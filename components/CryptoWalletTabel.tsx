import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Button, ScrollView, Animated, Image, Modal, Alert, FlatList, ViewComponent } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import { CryptoData, CryptoDataWallet } from '@/types';
import { DataContext } from './DataProvider';

const CryptoWalletTabel = () => {
    const { cryptos } = useContext(DataContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = React.useState("");
    const { walletData, setWalletData } = useContext(DataContext);
    const [_newCoin, setNewCoin] = useState<CryptoDataWallet | null>(null);
    const [choiseAddCoin, setChoiseAddCoin] = React.useState<CryptoData | null>(null);
    const [choiseEditCoin, setChoiseEditCoin] = React.useState<CryptoDataWallet | undefined>();
    const [modalVisibleAmount, setModalVisibleAmount] = React.useState<boolean>(false);
    const [modalVisibleEdit, setModalVisibleEdit] = React.useState<boolean>(false);


    const addAmountNewCoin = (setModalVisibleAmountState: boolean, coin: CryptoData) => {
        const existingCoin = walletData.find((x) => x.coin.id === coin.id);
        if (existingCoin) {
            // Als het al bestaat, open een bewerkingsmodaal
            openModalVisibleEdit(parseInt(coin.id));
            return;
        }
        setModalVisibleAmount(setModalVisibleAmountState)
        setChoiseAddCoin(coin)
    }
    const handleAddCoinToWallet = (coin: CryptoData | null) => {
        if (!coin) return;
        // Controleer of de coin al bestaat in de wallet
        const existingCoin = walletData.find((x) => x.coin.id === coin.id);
        if (existingCoin) {
            openModalVisibleEdit(parseInt(coin.id));
            return;
        }
        // Genereer nieuwe gegevens voor de wallet
        const newData: CryptoDataWallet = {
            name: coin.name,
            coin: coin,
            amount: parseFloat(amount),
            balance: parseFloat(amount) * coin.price_usd,
            color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        };
        // Voeg de nieuwe coin toe aan de wallet
        setNewCoin(null);
        setAmount("")
        setModalVisibleAmount(false)
        setModalVisible(false)
        setChoiseAddCoin(null)
        setWalletData([...walletData, newData]);
    };
    const openModalVisibleEdit = (index: number) => {
        setModalVisibleEdit(true)
        setChoiseEditCoin(walletData.find(x => parseInt(x.coin.id) === index))
    };
    const handleEdit = (index: number) => {
        const updatedData = [...walletData];
        const coinToEdit = updatedData.find(x => parseInt(x.coin.id) === index);

        if (coinToEdit && amount != "") {
            // Update de eigenschappen van de gevonden munt
            coinToEdit.amount = parseFloat(amount);
            coinToEdit.balance = parseFloat(amount) * coinToEdit.coin.price_usd
        }
        setAmount("")
        setWalletData(updatedData);
        setModalVisibleEdit(false)
        setModalVisible(false)
    };
    const handleDelete = (index: number) => {
        const updatedData = walletData.filter(x => parseInt(x.coin.id) !== index);
        setWalletData(updatedData);
        setModalVisibleEdit(false)
    };
    const renderAddCoinItem = ({ item }: { item: CryptoData }) => (
        <Card onPress={() => addAmountNewCoin(true, item)} style={styles.cryptoItem}>
            <View style={styles.cryptoInfo}>
                <Image source={{ uri: item.logo }} style={styles.cryptoLogoList} />
                <Text style={styles.cryptoName}>
                    {item.symbol}
                </Text>
            </View>
        </Card>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                    setModalVisible(!modalVisible);
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={{ color: '#fff', fontSize: 20, paddingBottom: 15 }} >Choise a Coin</Text>
                                        <FlatList
                                            data={cryptos}
                                            keyExtractor={(item) => item.id.toString()}
                                            renderItem={renderAddCoinItem}
                                            numColumns={3} // Sets a grid layout
                                            contentContainerStyle={styles.listContainer}
                                        />
                                        <Button
                                            onPress={() => setModalVisible(!modalVisible)}
                                            title={"Close"}
                                        />
                                    </View>
                                </View>
                            </Modal>
                            <Button
                                title={"Add Coin +"}
                                onPress={() => setModalVisible(true)}
                            />
                        </Card.Content>
                    </Card>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisibleAmount}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisibleAmount(!modalVisibleAmount);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={{ color: '#fff', fontSize: 20, paddingBottom: 15 }} >Set An Amount</Text>

                                {choiseAddCoin && (
                                    <Image source={{ uri: choiseAddCoin.logo }} style={styles.cryptoLogoChoiseCoin} />
                                )}

                                <TextInput
                                    label="Amount"
                                    value={amount}
                                    onChangeText={amount => setAmount(amount)}
                                    style={{ width: "100%", margin: 25 }}
                                    keyboardType="numeric"
                                />
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: "100%" }}>
                                    <Button
                                        onPress={() => setModalVisibleAmount(!modalVisibleAmount)}
                                        title={"Go Back"}
                                    />
                                    <Button
                                        onPress={() => handleAddCoinToWallet(choiseAddCoin)}
                                        title={"Add Coin"}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisibleEdit}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisibleEdit(!modalVisibleEdit);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={{ color: '#fff', fontSize: 20, paddingBottom: 15 }} >Edit Coin Amount</Text>

                                {choiseEditCoin && (
                                    <>
                                        <Image source={{ uri: choiseEditCoin.coin.logo }} style={styles.cryptoLogoChoiseCoin} />
                                        <Text style={{ color: '#fff', fontSize: 20 }}>Coin Amount : {choiseEditCoin.amount} </Text>
                                    </>
                                )}
                                <TextInput
                                    label="Amount"
                                    value={amount}
                                    onChangeText={amount => setAmount(amount)}
                                    style={{ width: "100%", margin: 15 }}
                                    keyboardType="numeric"
                                />
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: "100%", alignItems: 'center' }}>
                                    <Button
                                        onPress={() => setModalVisibleEdit(!modalVisibleEdit)}
                                        title={"Cancel"}
                                    />
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        {choiseEditCoin &&
                                            <>
                                                <Button
                                                    title={"Edit Coin"}
                                                    onPress={() => handleEdit(parseInt(choiseEditCoin.coin.id))}
                                                />
                                                <Text style={{ color: '#fff', fontSize: 25, marginLeft: 10, fontWeight: 'bold', }}>|</Text><IconButton
                                                    icon="delete"
                                                    onPress={() => handleDelete(parseInt(choiseEditCoin.coin.id))}
                                                    iconColor="red"
                                                    size={25}
                                                    animated={true} />
                                            </>
                                        }
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Card style={{
                        margin: 20,
                        marginBottom: 0,
                        borderRadius: 10,
                        elevation: 3,
                        backgroundColor: '#121212',
                        width: screenWidth - 45,
                        height: 300
                    }}>
                        <Card.Content>
                            {/* Table Header */}
                            <View style={[styles.tableRow, styles.headerRow]}>
                                <Text style={[styles.cell, styles.headerCell]}>Coin</Text>
                                <Text style={[styles.cell, styles.headerCell]}>Balance</Text>
                                <Text style={[styles.cell, styles.headerCell]}>Value($)</Text>
                                <Text style={[styles.cell, styles.headerCell]}>Edit</Text>
                            </View>
                            <FlatList
                                data={walletData}
                                style={{height:250}}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item: coin, index }) => (
                                    <View key={index} style={styles.tableRow}>
                                        {/* Coin Logo and Name */}
                                        {coin && (
                                            <View style={styles.coinCell}>
                                                <Image
                                                    source={{ uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.coin.id}.png` }}
                                                    style={styles.cryptoLogo}
                                                />
                                                <Text style={styles.text}>{coin.coin.name}</Text>
                                            </View>
                                        )}
                                        <Text style={[styles.cell, styles.text]}>{coin.amount}</Text>
                                        <Text style={[styles.cell, styles.text]}>{coin.balance.toFixed(2)}$</Text>
                                        <View style={[styles.cell, styles.actionsCell]}>
                                            <IconButton
                                                icon="pencil"
                                                onPress={() => openModalVisibleEdit(parseInt(coin.coin.id))}
                                                iconColor="#007AFF"
                                                size={20}
                                            />
                                        </View>
                                    </View>
                                )}
                            />
                        </Card.Content>
                    </Card>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>

    );
};


const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    card: {
        margin: 20,
        marginBottom: 0,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#121212',
        width: screenWidth - 45
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        textAlign: 'center',
        alignItems: "center"
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    headerRow: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    headerCell: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff'
    },
    coinCell: {
        flex: 1.1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cryptoLogo: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 8,
    },
    cryptoLogoList: {
        width: 24,
        height: 24,
        borderRadius: 12,
        // marginRight: 8,
    },
    cryptoLogoChoiseCoin: {
        width: 100,
        height: 100,
        margin: 25
    },
    actionsCell: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        height: 400,
        width: 375,
        margin: 20,
        backgroundColor: '#121212',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    cryptoItem: {
        width: 75, // Adjust width for grid layout
        margin: 10,
        alignItems: 'center',
        display: 'flex',
        backgroundColor: 'rgba(245,245,245,0.5)',
        borderRadius: 10,
        padding: 15,
    },
    cryptoInfo: {
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: "column",
        alignItems: 'center',
        margin: 'auto'
    },
    cryptoName: {
        fontSize: 16,
        fontWeight: '600',
    },
    listContainer: {
        justifyContent: 'space-around',
        padding: 10,
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    totalBalance: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#4CAF50",
        marginLeft: 'auto'
    },
});

export default CryptoWalletTabel;