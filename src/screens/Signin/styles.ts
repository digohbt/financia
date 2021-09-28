import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";



export const Container = styled.View`
    flex: 1;
`

export const  Header = styled.View`
    width: 100%;
    height: 70%;
    background-color: ${({theme}) => theme.colors.primary};
    justify-content: flex-end;
    align-items: center;
`;

export const  TitleWrapper = styled.View`
    align-items: center;
`;



export const  Title  = styled.Text`
    font-size:${RFValue(30)}px;
    font-family:  ${({theme}) => theme.fonts.medium};
    color:  ${({theme}) => theme.colors.shape};
    text-align: center;
    margin-top:20px;
    margin-bottom: 25px;

`;

export const  SignInTitle  = styled.Text`
    font-size:${RFValue(16)}px;
    font-family:  ${({theme}) => theme.fonts.regular};
    color:  ${({theme}) => theme.colors.shape};
    text-align: center;
    margin-bottom: 60px;

`;

export const  Footer = styled.View`
    background-color: ${({theme}) => theme.colors.secondary};
    width: 100%;
    height: 30%;
`;


export const FooterWrapper = styled.View`
    margin-top: ${RFValue(-25)}px;
    padding: 0 32px;
    justify-content: space-between;
`;