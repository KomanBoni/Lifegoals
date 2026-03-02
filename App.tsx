import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { GoalsProvider } from './context/GoalsContext';
import { HomeScreen } from './screens/HomeScreen';

export default function App() {
  return (
    <GoalsProvider>
      <View style={{ flex: 1 }}>
        <HomeScreen />
        <StatusBar style="dark" />
      </View>
    </GoalsProvider>
  );
}
