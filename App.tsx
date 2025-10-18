import 'react-native-gesture-handler';
//import { useFonts } from 'expo-font';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@store/index';
// import {  } from 'expo-status-bar';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from '@presentation/navigation/StackNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <SafeAreaProvider>
          <NavigationContainer>
            <SafeAreaView
              style={{
                flex: 1,
                paddingTop: Platform.OS === 'android' ? 30 : 0,
              }}
            >
              <StackNavigator />
            </SafeAreaView>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
