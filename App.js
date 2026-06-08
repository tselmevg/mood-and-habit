import { useEffect } from 'react';
import { initDB } from './src/database/db';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity } from 'react-native';
import HabitScreen from './src/screens/HabitScreen';
import MoodScreen from './src/screens/MoodScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Habits"
          component={HabitScreen}
          options={{
            headerRight: () => <TouchableOpacity
              onPress={() => console.log('pressed')}
              style={{ padding: 10 }}
            >
              <Text style={{ fontSize: 36, color: 'blue' }}>+</Text>
            </TouchableOpacity>,
            tabBarIcon: ({ color, size }) => (
              <Text>🥇</Text>
            )
          }}
        />
        <Tab.Screen
          name="Mood"
          component={MoodScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Text>🔆</Text>
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}