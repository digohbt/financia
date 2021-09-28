import 'react-native-gesture-handler';
import 'intl'
import {StatusBar} from 'react-native'
import 'intl/locale-data/jsonp/pt-BR'
// import React from 'react';
import * as React from 'react';

import {AuthContex} from './src/AuthContex'


// import { NavigationContainer } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading';
import {ThemeProvider} from 'styled-components'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
}from '@expo-google-fonts/poppins'

import { Dashboard } from './src/screens/Dashboard'; 
import { Signin } from './src/screens/Signin';
import { CategorySelect } from './src/screens/CategorySelect';
import theme from './src/global/styles/theme'
import { AppRoutes } from './src/routes/app_routes'

export default function App() {
const [fontsLoaded] = useFonts({
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
})
if(!fontsLoaded) {
  return <AppLoading />
}
 

  return (
    <ThemeProvider theme={theme}>
     <NavigationContainer>
      
       <StatusBar barStyle="light-content"  backgroundColor={theme.colors.primary} />
      <AuthContex.Provider value={["Rodrigo"]} >
       <Signin />
      </AuthContex.Provider>

     </NavigationContainer>
    </ThemeProvider>
  )
}

