import 'react-native-gesture-handler';
//import { useFonts } from 'expo-font';
import React from 'react';
// import {  } from 'expo-status-bar';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './app/Navigations/Routes';

const App = () =>{
  /*
	const [loaded] = useFonts({
            PoppinsRegular : require('./app/assets/fonts/Poppins-Regular.ttf'),
            PoppinsSemiBold: require('./app/assets/fonts/Poppins-SemiBold.ttf'),
            PoppinsBold : require('./app/assets/fonts/Poppins-Bold.ttf'),
            PoppinsMedium : require('./app/assets/fonts/Poppins-Medium.ttf'),
	});  

	if(!loaded){
		  return null;
	}*/
  
	return (
      <SafeAreaProvider>
          <SafeAreaView
              style={{
                  flex: 1,
                  paddingTop:Platform.OS === 'android' ? 30 :  0
                }}
          >
                  <StatusBar  />
                  <Routes/>
          </SafeAreaView>
      </SafeAreaProvider>
	);
};

export default App;
