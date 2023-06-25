import 'react-native-gesture-handler';
import AppNavigation from './navigation/appNavigation';
import AsyncStorage from "@react-native-async-storage/async-storage";
AsyncStorage.removeItem("favorite");
export default function App() {
  return (
    <AppNavigation />
  );
}
