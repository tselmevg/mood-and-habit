import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { addHabit } from '../database/db';

const Tab = createMaterialTopTabNavigator();

export default function HabitScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [habitType, setHabitType] = useState('boolean');
  const [maxCount, setMaxCount] = useState('');
  const [habitName, setHabitName] = useState('');

  function handleSave() {
    addHabit(habitName, habitType, maxCount);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#b0b8cd' },
          sceneStyle: { backgroundColor: '#0b0b30' },
        }}>
        <Tab.Screen name="Today" component={TodayScreen} />
        <Tab.Screen name="Week" component={WeekScreen} />
        <Tab.Screen name="Month" component={MonthScreen} />
        <Tab.Screen name="Year" component={YearScreen} />
      </Tab.Navigator>
      <Modal visible={modalVisible} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ color: '#2a2a5e', fontWeight: "bold"}}>Habit name</Text>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#888"
              value={habitName}
              onChangeText={(text) => setHabitName(text)}
              style={{
                backgroundColor: '#2a2a5e',
                color: 'white',
                padding: 10,
                borderRadius: 8,
                marginTop: 8
              }}
            />
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => setHabitType('boolean')}
                style={{
                  backgroundColor: habitType === 'boolean' ? '#5050b3' : '#2a2a5e',
                  padding: 10,
                  borderRadius: 8
                }}
              >
                <Text style={{ color: 'white' }}>Yes/No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setHabitType('count')}
                style={{
                  backgroundColor: habitType === 'count' ? '#5050b3' : '#2a2a5e',
                  padding: 10,
                  borderRadius: 8
                }}
              >
                <Text style={{ color: 'white' }}>Count</Text>
              </TouchableOpacity>
            </View>
            {habitType === 'count' && (
              <TextInput
                placeholder="Target Number"
                placeholderTextColor="#888"
                value={maxCount}
                onChangeText={(text) => setMaxCount(text)}
                keyboardType="numeric"
                style={{
                  backgroundColor: '#2a2a5e',
                  color: 'white',
                  padding: 10,
                  borderRadius: 8,
                  marginTop: 8
                }}
              />
            )}
            <TouchableOpacity
              onPress={handleSave}
              style={{ marginTop: 16, backgroundColor: '#505db3', padding: 10, borderRadius: 8 }}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function TodayScreen() {
  return <View><Text>Today</Text></View>;
}
function WeekScreen() {
  return <View><Text>Week</Text></View>;
}
function MonthScreen() {
  return <View><Text>Month</Text></View>;
}
function YearScreen() {
  return <View><Text>Year</Text></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: '#b0b8cd',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 36,
    color: '0b0b30',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#b0b8cd',
    padding: 20,
    borderRadius: 10,
    width: '80%',

  },
});