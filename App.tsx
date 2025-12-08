import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import SettingsScreen from './screens/SettingsScreen';

const Drawer = createDrawerNavigator();

import HomeScreen from './screens/HomeScreen';

function AppContent() {
  const { colors, isDark } = useTheme();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          drawerStyle: {
            backgroundColor: colors.background,
          },
          drawerActiveTintColor: colors.primary,
          drawerInactiveTintColor: colors.text,
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
