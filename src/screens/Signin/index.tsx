import React ,{useContext} from 'react';

import  { Container, Header, TitleWrapper ,Title ,SignInTitle ,Footer,FooterWrapper} from './styles';

import AplleSvg from '../../assets/apple.svg';
import LogoSvg from '../../assets/logo.svg'
import GoogleSvg from '../../assets/google.svg'
import { RFValue } from 'react-native-responsive-fontsize'
import {SigninSocialButton} from '../../components/SigninSocialButton'
import {AuthContex} from '../../AuthContex'



export function Signin() {
    const data = useContext(AuthContex)
    console.log(data)
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
                    <SigninSocialButton title="Entrar com Google" svg={GoogleSvg} />
                    <SigninSocialButton title="Entrar com Apple" svg={AplleSvg} />
                </FooterWrapper>
            </Footer>
        </Container>
    )
}