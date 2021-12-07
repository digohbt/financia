import React from "react";

import { createStackNavigator } from '@react-navigation/stack'


import {Signin} from '../screens/Signin'
import {Resume} from '../screens/Resume'

const  { Navigator,  Screen} = createStackNavigator()


export function AuthRotes() {
    return(
        <Navigator >
            <Screen 
            name="Signin"
            component={Resume}
             />
        </Navigator>
    )
}