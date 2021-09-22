import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import {Feather} from '@expo/vector-icons'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

interface CategoryProsp {
    isActive:boolean
}

export const Container = styled(GestureHandlerRootView)`
    flex:1;
    background-color: ${({theme} ) => theme.colors.backgronund};
`;
export const Header = styled.View`

    width: 100%;
    height: ${RFValue(113)}px;
    background-color: ${({theme} ) => theme.colors.primary};
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;

`;

export const Title = styled.Text`
    font-family: ${({theme} ) => theme.fonts.regular};
    color: ${({theme} ) => theme.colors.shape};
    font-size: ${RFValue(15)}px;

`;
export const Category  = styled.TouchableOpacity<CategoryProsp>`
width: 100%;
background-color: ${({isActive, theme} ) => isActive ? theme.colors.attention_linght: theme.colors.backgronund};

padding:${RFValue(14)}px;
flex-direction: row;
align-items: center;
`
export const Icon  = styled(Feather)`
font-size: ${RFValue(20)}px;
margin-right:16px;

`
export const Name = styled.Text`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(14)}px;

`
export const Separetor = styled.View`
height: 1px;
width: 100%;
background-color: ${({theme} ) => theme.colors.text};


`
export const Footer = styled.View`
    width: 100%;
    padding:24px;

`
