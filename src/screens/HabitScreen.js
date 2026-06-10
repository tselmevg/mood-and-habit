import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { addHabit, getHabits } from '../database/db';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const Tab = createMaterialTopTabNavigator();

function AddHabitModal({ modalVisible, habitName, setHabitName, habitType, setHabitType, maxCount, setMaxCount, handleSave }) {
  return (<Modal visible={modalVisible} transparent>
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={{ color: '#2a2a5e', fontWeight: "bold" }}>Habit name</Text>
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
  );
}

function HabitDetailModal({ selectedHabit, modalVisible, setSelectedHabit }) {
  if (!selectedHabit) return null;
  return (
    <Modal visible={modalVisible}>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>
          {selectedHabit.habit_name}
        </Text>
        <Text style={styles.detailText}>
          {selectedHabit.habit_type == 'boolean' ? <Text> "Yes" </Text> : <Text> Target amount: {selectedHabit.max_habit_num} </Text>}
        </Text>

        <TouchableOpacity
          onPress={() => setSelectedHabit(null)}
          onPress={() => setModalVisible(false)}
          style={styles.closeButton}
        >
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>

      </View>
    </Modal>
  );
}

export default function HabitScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [habitType, setHabitType] = useState('boolean');
  const [maxCount, setMaxCount] = useState('');
  const [habitName, setHabitName] = useState('');
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);

  useEffect(() => {
    loadHabits();
  }, []);

  function loadHabits() {
    setHabits(getHabits());
  }

  function handleSave() {
    try {
      addHabit(habitName, habitType, maxCount);
      loadHabits();
      alert(JSON.stringify(getHabits()));
      console.log('saved:', getHabits());
      setModalVisible(false);
    } catch (e) {
      alert('Error: ' + e.message);
    }
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
        <Tab.Screen
          name="Today"
          children={() => <TodayScreen habits={habits} setSelectedHabit={setSelectedHabit} />}
        />
        <Tab.Screen name="Week" component={WeekScreen} />
        <Tab.Screen name="Month" component={MonthScreen} />
        <Tab.Screen name="Year" component={YearScreen} />
      </Tab.Navigator>
      <AddHabitModal
        modalVisible={modalVisible}
        habitName={habitName}
        setHabitName={setHabitName}
        habitType={habitType}
        setHabitType={setHabitType}
        maxCount={maxCount}
        setMaxCount={setMaxCount}
        handleSave={handleSave}
      />
      <HabitDetailModal
        selectedHabit={selectedHabit}
        modalVisible={selectedHabit !== null}
      />
    </View>
  );
}

function TodayScreen({ habits, setSelectedHabit }) {
  return <View><Text>Today</Text><FlatList
    data={habits}
    keyExtractor={item => item.habit_id.toString()}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => setSelectedHabit(item)}>
        <Text style={{ color: 'white' }}>{item.habit_name}</Text>
      </TouchableOpacity>
    )}
  />
  </View>;
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
    color: '#0b0b30',
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
  detailContainer: {
    flex: 1,
    backgroundColor: '#0b0b30',
    padding: 20,
  },
  detailTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  detailText: {
    color: '#ffffff',
    marginTop: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 18,
  },
  deleteButton: {
    marginTop: 8,
    backgroundColor: '#b03030',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});