import React, { useEffect, useState,useCallback }  from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard ,TransactionCardProps } from "../../components/TransactionCard";
import { useFocusEffect} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {ActivityIndicator} from 'react-native'
import {useTheme} from 'styled-components'
 


import {  
    Container,
     Header ,
     UserInfo ,
     Photo ,
     User ,
     UserGreting,
     UserName ,
     UserWrapper,
     Icon,
     HighlightCards,
     Transactions,
     Title,
     TransactionList,
     LogoutButton,
     Loading
} from './styles'

export  interface DataListProps extends TransactionCardProps {
  id:string
}
interface HighlightProps {
  amount :string
}
interface HighlightData {
  entries :HighlightProps;
  expensive:HighlightProps;
  total:HighlightProps
}
 
export function Dashboard (){

    const [data, setData] = useState<DataListProps[]>([])
    const [inLoading, setIsLoading] = useState(true)
    const [highlightData , setHighlightData] = useState<HighlightData>({} as HighlightData)
    const dataKey = '@gofinances:transactions'
    let entriesTotal = 0 ;
    let expensiveTotal = 0; 
    let total = 0
    let theme = useTheme()

    async function loadTransactions() {
    
      const response =   await AsyncStorage.getItem(dataKey)
      const transactions = response ? JSON.parse(response) : []

      const transactionsFormatted : DataListProps[] = transactions
      .map( (item : DataListProps) => {
          if(item.type == 'positive') {
            entriesTotal += Number(item.amount)
          }else {
            expensiveTotal += Number(item.amount)
          }
          const amount = Number(item.amount ).toLocaleString('pt-BR', {
            style:'currency',
            currency:'BRL'
          })
          const date = new Date(item.date) 
          const dateFormatted = Intl.DateTimeFormat('pt-BR', {
            day:'2-digit',
            month:'2-digit',
            year:'2-digit'
          }).format(date)

          return {
            id :item.id,
            name:item.name,
            title:item.name,
            amount : amount,
            type: item.type,
            category: item.category,
            date:dateFormatted 

          }
      })
      total = entriesTotal - expensiveTotal
      setHighlightData({ 
        entries : {
          amount : entriesTotal.toLocaleString('pt-BR', {
            style:'currency',
            currency:'BRL'
          })
        },
        expensive : {
          amount : expensiveTotal.toLocaleString('pt-BR', {
            style:'currency',
            currency:'BRL'
          })
        },
        total : {
          amount : total.toLocaleString('pt-BR', {
            style:'currency',
            currency:'BRL'
          })
        },

      }) 
      setIsLoading(false)
      setData(transactionsFormatted)
    }
    useEffect( () => {
      loadTransactions()
    },[])
    useFocusEffect( useCallback( () => {
      loadTransactions()
    } ,[]))
    return(
        <Container>
          {
          inLoading ? 
          <Loading>  
             <ActivityIndicator  color={theme.colors.primary} size='large'/> 
          </Loading> : 
            <>
            <Header>
              <UserWrapper>
                <UserInfo>
                  <Photo source={{uri: 'https://avatars.githubusercontent.com/u/46270019?v=4' }} />
                  <User>
                    <UserGreting> Óla </UserGreting>
                    <UserName> Diego Teodoro </UserName>
                  </User>
                </UserInfo>
                <LogoutButton>
                  <Icon name="power" />
                </ LogoutButton>

              </UserWrapper>
            </Header>
            <HighlightCards
              // horizontal
              // showsHorizontalScrollIndicator
              // contentContainerStyle={{paddingHorizontal:24}}
            >
              <HighlightCard type="up" title="Entrada " amount={highlightData.entries?.amount}lastTransaction="Ultima entrada dia 13 de abril " />
              <HighlightCard type="down" title="Saidas " amount={highlightData.expensive?.amount} lastTransaction="Ultima entrada dia 13 de abril"/>
              <HighlightCard type="total" title="Total" amount={highlightData.total?.amount} lastTransaction="Ultima entrada dia 13 de abril"/>
            </HighlightCards>

            <Transactions>
              <Title>
                    Listagem
              </Title>
              
              <TransactionList 
                data={data} // Tipado como DataListProps []
                keyExtractor={ item => item.id }
                renderItem={( {item}) =>   <TransactionCard data={item}   /> 
              } 
              />
            
            </Transactions>
            </>
           }
         
            
        </Container>
    )
}
