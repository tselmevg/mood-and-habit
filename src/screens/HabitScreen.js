import { Text, View, StyleSheet, Button } from 'react-native';
import { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function HabitScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Today" component={TodayScreen} />
        <Tab.Screen name="Week" component={WeekScreen} />
        <Tab.Screen name="Month" component={MonthScreen} />
        <Tab.Screen name="Year" component={YearScreen} />
      </Tab.Navigator>
      {/* <Button
        onPress={() => console.log('pressed')}
        title="Learn More"
        color="#841584"
      /> */}
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
    backgroundColor: '#0b0b30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
  },
});