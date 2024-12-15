import React, { useContext, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text, Modal, Alert, Button, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {  IconButton, TextInput } from 'react-native-paper';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { BitcoinPrice } from '@/types';
import { DataContext } from './DataProvider';


const BitcoinChart = () => {
  const screenWidth = Dimensions.get('window').width;
  const [newPrice, setNewPrice] = useState<string>('');
  const [newOpen, setNewOpen] = useState<string>('');
  const [newHigh, setNewHigh] = useState<string>('');
  const [newChangePercent, setNewChangePercent] = useState<string>('');
  const [newVolume, setNewVolume] = useState<string>('');
  const [newDate, setNewDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {
    dataChart: data,
    labelsChart: labels,
    fetchBitcoinData,
    loading,
    postData
  } = useContext(DataContext);

  const formatDateIOS = (dateString: Date): string => {
    const date = dateString;
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setNewDate(selectedDate);
    }
  };

  const postDataRequest = async () => {
    // Validate input fields
    if (!newDate || !newPrice || !newOpen || !newHigh || !newVolume) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const newEntry: BitcoinPrice = {
      Date: formatDateIOS(newDate) as string,
      Price: parseFloat(newPrice),
      Open: parseFloat(newOpen),
      High: parseFloat(newHigh),
      ChangePercentFromLastMonth: -20,
      Volume: newVolume,
    };

    console.log('New Entry:', newEntry);

    try {
      const response = await postData(newEntry); // Await the postData function
      if (response != undefined) {
        Alert.alert('Success', 'Bitcoin historical_prices added successfully!');
        // Reset form fields
        setNewDate(new Date());
        setNewPrice('');
        setNewOpen('');
        setNewHigh('');
        setNewVolume('');
        // Refresh data
        await new Promise((resolve, reject) => setTimeout(resolve, 2000));
        fetchBitcoinData()
      } else {
        console.error('Failed to add data:', 'Unknown error');
        Alert.alert('Error', 'Failed to add Bitcoin historical_prices.');
      }
    } catch (error) {
      console.error('Error posting data:', error);
      Alert.alert('Error', 'An error occurred while adding data.');
    } finally {
      setModalVisible(false); // Ensure modal closes regardless of outcome
    }
  };

  // Function to dismiss the keyboard
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const chartConfig = {
    backgroundGradientFrom: '#121212',
    backgroundGradientTo: '#121212',
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <View style={styles.container}>
      {loading ?
        (
          <ActivityIndicator size="large" color="rgba(134, 65, 244, 1)" />
        )
        : data.length > 0 ?
          (
            <>
              <LineChart
                data={{
                  labels,
                  datasets: [{ data }],
                }}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
                bezier
                yLabelsOffset={4}
                style={{
                  borderRadius: 16,
                }}
              />
              <IconButton
                icon="plus-thick"
                iconColor="#000"
                size={20}
                style={{ position: 'absolute', top: 25, right: 25, backgroundColor: 'rgba(134, 65, 244,0.5)', padding: 0, height: 30, width: 30 }}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </>
          )
          :
          (
            <Text>Geen data beschikbaar</Text>
          )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ color: '#fff', fontSize: 20, paddingBottom: 15 }} >Add New Historical Prices</Text>
              <DateTimePicker
                display="spinner"
                value={newDate}
                mode="date"
                onChange={onChange}
              />
              <TextInput
                label="Price"
                value={newPrice}
                onChangeText={newPrice => setNewPrice(newPrice)}
                style={{ width: "100%", margin: 5 }}
                keyboardType="numeric"
              />
              <TextInput
                label="Open"
                value={newOpen}
                onChangeText={newOpen => setNewOpen(newOpen)}
                style={{ width: "100%", margin: 5 }}
                keyboardType="numeric"
              />
              <TextInput
                label="High"
                value={newHigh}
                onChangeText={newHigh => setNewHigh(newHigh)}
                style={{ width: "100%", margin: 5 }}
                keyboardType="numeric"
              />
              <TextInput
                label="Volume"
                value={newVolume}
                onChangeText={newVolume => setNewVolume(newVolume)}
                style={{ width: "100%", margin: 5 }}
                keyboardType="numeric"
              />
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: "100%" }}>
                <Button
                  onPress={() => setModalVisible(!modalVisible)}
                  title={"Close"}
                  color={'red'}
                />
                <Button
                  onPress={() => postDataRequest()}
                  title={"Add Historical Prices"}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparant',
  },
  card: {
    margin: 20,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#121212',
    width: screenWidth - 45
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    height: 600,
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
    }
  },
});

export default BitcoinChart;