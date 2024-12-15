import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useContext, useState } from 'react';
import { Avatar, Card, FAB, PaperProvider, Portal, Button } from 'react-native-paper';
import { View, StyleSheet, Text, Dimensions, Pressable, } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { PhotoContext } from './_layout';
import LinearGradientBackground from '@/components/LinearGradientBackground';


interface UserProfile {
    name: string;
    email: string;
    avatar: string;
}

const cryptoIndex = () => {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [editProfile, setEditProfile] = React.useState<boolean>(false);
    const { photoUri } = useContext(PhotoContext);
    const [open, setOpen] = React.useState<boolean>(false);
    const [state, setState] = useState({ open: false });
    type FABState = {
        open: boolean;
    };
    const onStateChange = useCallback(
        ({ open }: FABState) => setState({ open }),
        []
    );

    const user: UserProfile = {
        name: 'Yazan',
        email: 'yazan@example.com',
        avatar: 'https://via.placeholder.com/150', // Voeg hier een echte URL toe of gebruik een lokale afbeelding
    };

    return (
        <PaperProvider>
            <Portal>
                <View style={styles.container}>
                    <LinearGradientBackground />
                    {photoUri ?
                        (
                            <Link href="/profile" asChild>
                                <Pressable>
                                    <Avatar.Image
                                        size={150}
                                        source={{ uri: photoUri }}
                                        style={{ marginTop: 66 }}
                                    />
                                    <Text style={{ color: 'gray', fontSize: 20, backgroundColor: "rgba(128,0,128,0.3)", padding: 5, borderRadius: 10, borderColor: '#0000', borderWidth: 2, marginTop: 10, textAlign: 'center' }}>user462138</Text>
                                </Pressable>
                            </Link>
                        )
                        :
                        (
                            <>
                                <Avatar.Text size={150} label="XD" style={{ marginTop: 66 }} />
                                <Text style={{ color: 'gray', fontSize: 20, backgroundColor: "rgba(128,0,128,0.3)", padding: 5, borderRadius: 10, borderColor: '#0000', borderWidth: 2, marginTop: 10 }}>user462138</Text>
                            </>
                        )
                    }
                    {editProfile ?
                        (
                            <>
                                <View style={{ width: 375, borderRadius: 20, alignItems: 'center', }}>
                                    <TextInput
                                        label="First Name"
                                        value={firstName}
                                        onChangeText={firstName => setFirstName(firstName)}
                                        style={{ width: "100%", margin: 15 }}
                                    />
                                </View>
                                <View style={{ width: 375, borderRadius: 20, alignItems: 'center', }}>
                                    <TextInput
                                        label="Last Name"
                                        value={lastName}
                                        onChangeText={lastName => setLastName(lastName)}
                                        style={{ width: "100%", margin: 15 }}
                                    />
                                </View>
                                <View style={{ width: 375, borderRadius: 20, alignItems: 'center', }}>
                                    <TextInput
                                        label="Username"
                                        value={username}
                                        onChangeText={username => setUsername(username)}
                                        style={{ width: "100%", margin: 15 }}
                                    />
                                </View>
                                <View style={{ width: 375, borderRadius: 20, alignItems: 'center', }}>
                                    <TextInput
                                        label="E-mail"
                                        value={email}
                                        onChangeText={email => setEmail(email)}
                                        style={{ width: "100%", margin: 15 }}
                                    />
                                </View>
                                <View style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', marginTop: 50 }}>
                                    <Button onPress={() => setEditProfile(!editProfile)} >SAVE</Button>
                                    <Text style={{ color: 'white' }}>or</Text>
                                    <Button onPress={() => setEditProfile(!editProfile)} textColor='red'>CANCEL</Button>

                                </View>
                            </>
                        )
                        :
                        (
                            <>
                                <Card style={styles.card}>
                                    <View style={styles.modalView}>
                                        <Text style={{ color: '#fff', fontSize: 15, marginRight: "auto", backgroundColor: "gray", padding: 2, borderRadius: 10, borderColor: 'rgba(128,0,128,0.5)', borderWidth: 2, width: 80, textAlign: 'center' }}>First Name</Text>
                                        <Text style={{ color: '#fff', fontSize: 25, fontWeight: 600 }}>Yazan</Text>
                                    </View>
                                </Card><Card style={styles.card}>
                                    <View style={styles.modalView}>
                                        <Text style={{ color: '#fff', fontSize: 15, marginRight: "auto", backgroundColor: "gray", padding: 2, borderRadius: 10, borderColor: 'rgba(128,0,128,0.5)', borderWidth: 2, width: 80, textAlign: 'center' }}>Last Name</Text>
                                        <Text style={{ color: '#fff', fontSize: 25, fontWeight: 600 }}>Dukhan</Text>
                                    </View>
                                </Card><Card style={styles.card}>
                                    <View style={styles.modalView}>
                                        <Text style={{ color: '#fff', fontSize: 15, marginRight: "auto", backgroundColor: "gray", padding: 2, borderRadius: 10, borderColor: 'rgba(128,0,128,0.5)', borderWidth: 2, width: 80, textAlign: 'center' }}>Username</Text>
                                        <Text style={{ color: '#fff', fontSize: 25, fontWeight: 600 }}>user462138</Text>
                                    </View>
                                </Card><Card style={styles.card}>
                                    <View style={styles.modalView}>
                                        <Text style={{ color: '#fff', fontSize: 15, marginRight: "auto", backgroundColor: "gray", padding: 2, borderRadius: 10, borderColor: 'rgba(128,0,128,0.5)', borderWidth: 2, width: 80, textAlign: 'center' }}>E-mail</Text>
                                        <Text style={{ color: '#fff', fontSize: 25, fontWeight: 600 }}>yazandukhan@hotmail.com</Text>
                                    </View>
                                </Card>
                            </>
                        )
                    }
                    <FAB.Group
                        open={open}
                        visible
                        icon={open ? 'pencil' : 'plus'}
                        actions={[
                            { icon: 'text-account', label: 'Edit Profile', onPress: () => (setEditProfile(!editProfile), setOpen(!open)), color: '#6200ee' },
                            // { icon: 'plus', onPress: () => console.log('Pressed add'), label: 'Add', color: '#6200ee' },
                            { icon: 'camera', label: 'Change Avatar', onPress: () => (setEditProfile(!editProfile), router.push({ pathname: "/camera" })), color: '#ff0266' },
                            // { icon: 'bell', label: 'Remind', onPress: () => console.log('Pressed notifications'), color: '#ff8c00' },
                            { icon: 'onepassword', label: 'Change Password', onPress: () => console.log('Pressed star'), color: '#03dac4' },
                        ]}
                        onStateChange={onStateChange}
                        onPress={() => {
                            setOpen(!open)
                            if (open) {
                                console.log('FAB is open');
                            } else {
                                console.log('FAB is closed');
                            }
                        }}
                    />
                </View>
            </Portal>
        </PaperProvider>
    );
};

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#121212",
    },
    image: {
        width: 250,
        height: 250,
    },
    mask: {
        ...StyleSheet.absoluteFillObject,
        width: "100%",
        height: "100%",
    },
    card: {
        margin: 20,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#121212',
        width: screenWidth - 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    email: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    editButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: 375,
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
    },
    cryptoLogoChoiseCoin: {
        width: 100,
        height: 100,
        margin: 25
    }
});

export default cryptoIndex;