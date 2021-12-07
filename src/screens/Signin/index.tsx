import React ,{useContext} from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';

import  { Container, Header, TitleWrapper ,Title ,SignInTitle ,Footer,FooterWrapper} from './styles';

import AplleSvg from '../../assets/apple.svg';
import LogoSvg from '../../assets/logo.svg'
import GoogleSvg from '../../assets/google.svg'
import { RFValue } from 'react-native-responsive-fontsize'
import {SigninSocialButton} from '../../components/SigninSocialButton'
// import {AuthContex} from '../../AuthContex'
import {useAuth} from '../../hooks/auth'
import { Alert } from 'react-native';



export function Signin() {
    // const data = useContext(AuthContex)
    const {user, signInWithGoogle } = useAuth()

  async  function HandlesSignInWithGoogle () {

        try {
            
            await signInWithGoogle()
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi posssivel conectar com conta  ')
        }
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg width={RFValue(120)} height={RFValue(70)} />
                    <Title> gofinance  </Title >
                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>
                <SignInTitle>
                    Faça seu login com {'\n'}
                    uma das contas abaixo
                </SignInTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SigninSocialButton title="Entrar com Google" svg={GoogleSvg} onPress={() => HandlesSignInWithGoogle() } />
                    <SigninSocialButton title="Entrar com Apple" svg={AplleSvg} />
                </FooterWrapper>
            </Footer>
        </Container>
    )
}