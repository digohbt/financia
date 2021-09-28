import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect , useState} from "react";
import { categories } from "../../utils/categories";
import {Container, Title, Amount } from './styles'

interface Props {
    title:string;
    amount:string;
    color:string
}

export function HistoryCard({
    title,
    amount,
    color 
} : Props ) {

    return (

        <Container color={color} >
            <Title> {title}</Title>
            <Amount>{amount}  </ Amount>
        </Container>
    )
}