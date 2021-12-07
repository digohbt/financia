import React,  { createContext, ReactNode, useContext, useState } from 'react'
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage'


interface AuthProviderProps {
    children: ReactNode
}
interface User {
    id:string;
    name:string;
    email:string;
    photo?:string
}

interface AuthContexData {
    user:User;
    signInWithGoogle() : Promise<void>

}

 const AuthContex = createContext( {} as AuthContexData)


function AuthProvider({children } :AuthProviderProps ) {
    const [user, setUser] = useState<User>({} as User)

    async function signInWithGoogle() {
        console.log("==========")
        try {
            const result = await Google.logInAsync({
                iosClientId:'672801801102-bot4l2mjgujdp4rcumbgr4vn3snboesf.apps.googleusercontent.com',
                androidClientId:'672801801102-aqsup6jlbhcp4p56epe2kgs6fsrrddgh.apps.googleusercontent.com',
                scopes:['profile', 'email'],
            })
            if(result.type === 'success') {
                const userLogged = {
                    id:String(result.user.id) ,
                    email: result.user.email! ,
                    name:result.user.name!,
                    photo:result.user.photoUrl!
                };
                setUser(userLogged)
                await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged))
            }
            
        } catch (error) {
            // throw new Error(error);
        }
    }


    return(
        <AuthContex.Provider value={ {
            user,
            signInWithGoogle
        }} >
            {children}
        </AuthContex.Provider>
    )
}
function useAuth () {
    const  contex = useContext(AuthContex)
    return contex
}

export {AuthProvider, useAuth }