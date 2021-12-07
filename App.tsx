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

import theme from './src/global/styles/theme'
import {AuthProvider} from './src/hooks/auth'

import { Dashboard } from './src/screens/Dashboard'; 
import { CategorySelect } from './src/screens/CategorySelect';
import { Routes } from './src/routes'

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
       <StatusBar barStyle="light-content"  backgroundColor={theme.colors.primary} />
        <AuthProvider>
          <Routes />
        </AuthProvider>
    </ThemeProvider>
  )
}

