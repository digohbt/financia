import React from "react";

import {NavigationContainer} from "@react-navigation/native"
import {AppRoutes} from './app_routes' 
import {AuthRotes} from './auth.routes' 

export function Routes() {
    return(
        <NavigationContainer>
            <AppRoutes/>
            
        </NavigationContainer>
    )
}